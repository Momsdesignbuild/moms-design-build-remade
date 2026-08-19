import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { stegaClean } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { JsonLd } from "@/components/PortableBody";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import LightboxGallery from "@/components/portfolio/LightboxGallery";
import Reveal from "@/components/Reveal";

// designer credit links (marketing 8/7). Former staff aren't listed on /team —
// their projects fall back to the firm credit automatically.
const DESIGNER_TEAM_SLUGS: Record<string, string> = {
  "Becca Bastyr": "becca-bastyr",
  "Heather Sweeney": "heather-sweeney",
  "Melissa Mlejnek": "melissa-mlejnek",
  "Kelley Woodhead": "kelley-woodhead",
  "Owen Sweeney": "owen-sweeney",
};
import DesignNotes from "@/components/portfolio/DesignNotes";
import OverlayTile from "@/components/OverlayTile";
import { PROJECT_NOTES } from "@/content/project-notes";
import LIVE_SEO from "@/content/live-seo-map.json";

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

type Dim = { width: number; height: number };

type Block = {
  _type: string;
  _key: string;
  children?: Array<{ text: string; marks?: string[] }>;
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  alt?: string;
  galleryGroup?: number;
  dim?: Dim;
} & SanityImageSource;

// spans → JSX, honoring link annotations (Martha Stewart blog, service links…)
function rich(block: Block | undefined, fallback: string) {
  if (!block?.children?.length) return fallback;
  return block.children.map((c, j) => {
    const def = c.marks?.map((m) => block.markDefs?.find((d) => d._key === m)).find((d) => d?._type === "link");
    return def?.href ? (
      <a
        key={j}
        href={def.href}
        className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
        {...(def.href.startsWith("http") && !def.href.includes("momsdesignbuild.com")
          ? { target: "_blank", rel: "noopener" }
          : {})}
      >
        {c.text}
      </a>
    ) : (
      <span key={j}>{c.text}</span>
    );
  });
}

// real rendered dimensions at a target width — the browser reserves the TRUE
// aspect ratio from first paint, so nothing jumps or reflows as photos load
const sized = (dim: Dim | undefined, w: number) => ({
  width: w,
  height: dim ? Math.round((w * dim.height) / dim.width) : Math.round(w * 0.66),
});

type PortfolioProject = {
  _id: string;
  title: string;
  slug: { current: string };
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: SanityImageSource;
  leadImage?: SanityImageSource & { alt?: string };
  gallery?: Array<SanityImageSource & { alt?: string; caption?: string; dim?: Dim }>;
  galleryBadges?: Array<SanityImageSource & { alt?: string }>;
  categories?: string[];
  description?: Block[];
  videoUrl?: string;
  designerName?: string;
  designerSlug?: string;
  location?: string;
  jsonLd?: string;
  sourceUrl?: string;
};

async function getProject(slug: string): Promise<PortfolioProject | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "portfolioProject" && slug.current == $slug][0] {
      _id, title, slug, metaTitle, metaDescription,
      heroImage, leadImage,
      gallery[]{ ..., asset, "dim": asset->metadata.dimensions{ width, height } },
      galleryBadges[]{ ..., asset },
      categories,
      description[]{ ..., _type == "image" => { "dim": asset->metadata.dimensions{ width, height } } },
      videoUrl, designerName, designerSlug, location, completedYear, jsonLd, sourceUrl
    }`,
    params: { slug },
  });
  return data as PortfolioProject | null;
}

// following projects in THEIR grid order (wrapping) fill the More Projects grid
// (their site ends every project page with a grid of other projects — ours shows
// the next 8 + View All)
async function getFollowingProjects(slug: string, count: number) {
  const { data: all } = (await sanityFetch({
    query: `*[_type == "portfolioProject"] | order(orderRank, _createdAt asc) { title, slug, heroImage }`,
  })) as { data: Array<{ title: string; slug: { current: string }; heroImage?: SanityImageSource }> };
  const idx = all.findIndex((p) => p.slug.current === slug);
  if (idx === -1 || all.length < 2) return [];
  return Array.from({ length: Math.min(count, all.length - 1) }, (_, k) => all[(idx + 1 + k) % all.length]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.metaTitle ? { absolute: project.metaTitle } : `${project.title} | Mom's Design Build`,
    description:
      project.metaDescription ||
      `View the ${project.title} project by Mom's Design Build — landscape architecture and outdoor living design in Minnesota.`,
    // canonical copied from WP verbatim (absolute, trailing slash)
    alternates: project.sourceUrl
      ? { canonical: `https://momsdesignbuild.com${project.sourceUrl}` }
      : undefined,
    openGraph: project.heroImage
      ? {
          images: [
            {
              url: urlFor(project.heroImage).width(1200).height(630).auto("format").url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "portfolioProject"] { slug }`
  );
  return slugs.map((p) => ({ slug: p.slug.current }));
}

/* ── description analysis ────────────────────────────────────────────────────
 * The blocks are THEIR page content in THEIR order (SEO layer — untouched).
 * This only decides how each block is STAGED: dossier facts, award badges,
 * pull-quote, before/after slider, section labels, story prose, inline photos.
 */
type Staged =
  | { kind: "story" | "label" | "tada"; text: string; block?: Block }
  | { kind: "quote"; text: string; block?: Block }
  | { kind: "image"; block: Block }
  | { kind: "imageRow"; label?: string; images: Block[] }
  | { kind: "galleryGrid"; images: Block[] }
  | { kind: "slider"; label: string; before: Block; after: Block; afterLabel: string };

function analyze(blocks: Block[]) {
  // stegaClean: draft-mode stega chars made every label read as a 1000-char
  // story for logged-in users — labels lost their galleries, keyword matching
  // failed, boxes swallowed everything (Josh's "Studio is fucking em up", 7/15)
  const textOf = (b: Block) => stegaClean((b.children ?? []).map((c) => c.text).join("")).trim();
  const isBadge = (b: Block) => /nari|award|winner|best.?of|remodeler|midwest design|houzz/i.test(b.alt ?? "");

  let subtitle: string | undefined;
  let completed: string | undefined;
  const badges: Block[] = [];
  const staged: Staged[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b._type === "image") {
      if (isBadge(b)) { badges.push(b); continue; }
      // inline gallery (multi-gallery pages): same group → one lightbox grid in flow
      if (b.galleryGroup) {
        const run: Block[] = [b];
        let j = i + 1;
        while (j < blocks.length && blocks[j].galleryGroup === b.galleryGroup) { run.push(blocks[j]); j++; }
        staged.push({ kind: "galleryGrid", images: run });
        i = j - 1;
        continue;
      }
      // 3+ consecutive body photos → one desktop row instead of a tall stack
      const run: Block[] = [b];
      let j = i + 1;
      while (j < blocks.length && blocks[j]._type === "image" && !isBadge(blocks[j]) && !blocks[j].galleryGroup) { run.push(blocks[j]); j++; }
      if (run.length >= 3) { staged.push({ kind: "imageRow", images: run }); i = j - 1; }
      else staged.push({ kind: "image", block: b });
      continue;
    }
    const t = textOf(b);
    if (!t) continue;
    const completedMatch = t.match(/^Completed\s+(\d{4})$/i);
    if (completedMatch) { completed = completedMatch[1]; continue; }
    if (/^[“"]/.test(t)) { staged.push({ kind: "quote", text: t, block: b }); continue; }
    if (/^ta[\s-]?da/i.test(t)) { staged.push({ kind: "tada", text: t, block: b }); continue; }
    if (/before/i.test(t) && t.length < 60) {
      // label + exactly two images → drag slider; + three or more → desktop row
      const imgs: Block[] = [];
      let j = i + 1;
      while (j < blocks.length && blocks[j]._type === "image" && !isBadge(blocks[j])) { imgs.push(blocks[j]); j++; }
      // slider ONLY for a real before→after pair: the second image must not be
      // another "before" (some pages show two before shots under one label)
      const secondAlt = imgs[1]?.alt ?? "";
      const isRealPair =
        imgs.length === 2 &&
        !/before/i.test(secondAlt) &&
        (/after|rendering|ta-?da|final|complete/i.test(secondAlt) || /before/i.test(imgs[0]?.alt ?? ""));
      if (isRealPair) {
        const afterLabel = /rendering/i.test(secondAlt) || /rendering/i.test(t) ? "3D Rendering" : "After";
        staged.push({ kind: "slider", label: t, before: imgs[0], after: imgs[1], afterLabel });
        i = j - 1;
        continue;
      }
      if (imgs.length >= 2) {
        // same-era photos (e.g. two befores) → labeled row/stack, never a slider
        staged.push({ kind: "imageRow", label: t, images: imgs });
        i = j - 1;
        continue;
      }
    }
    // subtitle = the page's short descriptor — never a linked/promo line,
    // a quote attribution ("-David Wessner"), or the FG division credit
    if (t.length < 80 && !subtitle && !staged.some((s) => s.kind === "story")
        && !b.markDefs?.length && !/read about|check out/i.test(t)
        && !/^\s*[-–—]/.test(t) && !/property serviced by/i.test(t)) { subtitle = t; continue; }
    if (t.length < 60) { staged.push({ kind: "label", text: t, block: b }); continue; }
    staged.push({ kind: "story", text: t, block: b });
  }
  return { subtitle, completed, badges, staged };
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, related] = await Promise.all([getProject(slug), getFollowingProjects(slug, 8)]);
  if (!project) notFound();

  const { subtitle, completed, badges, staged } = analyze(project.description ?? []);

  // lightbox counters span the page's full photo count, across inline gallery groups
  const grids = staged.filter((s) => s.kind === "galleryGrid") as Array<{ kind: "galleryGrid"; images: Block[] }>;
  const gridOffsets = new Map<object, number>();
  let photoAcc = 0;
  for (const g of grids) { gridOffsets.set(g, photoAcc); photoAcc += g.images.length; }

  const isMp4 = stegaClean(project.videoUrl ?? "").endsWith(".mp4");
  const heroSource = project.leadImage ?? project.heroImage;
  const heroAlt = project.leadImage?.alt || project.title;
  // hero ships through ONE encoder, not two: next/image gets the untouched
  // original (Sanity would pre-compress at q75, then Vercel re-encodes — two
  // lossy generations made every hero soft). Poster keeps the baked CDN URL
  // since <video poster> bypasses next/image.
  const heroImgUrl = heroSource ? urlFor(heroSource).width(2000).auto("format").url() : null;
  const heroRawUrl = heroSource ? urlFor(heroSource).url() : null;

  // award graphics found inside the WP gallery (pixel-detected at enrich time)
  // render with the dossier badges, not among project photos
  const galleryImages = (project.gallery ?? [])
    .map((img, i) => ({
      thumbUrl: urlFor(img).width(900).auto("format").url(),
      fullUrl: urlFor(img).width(2000).auto("format").url(),
      alt: img.alt || `${project.title} — photo ${i + 1}`,
      caption: img.caption,
      ...sized(img.dim, 900),
    }));

  // Founders' rule: designers are never mentioned on the public site
  // (clients would start requesting specific designers). designerName stays
  // in Sanity as internal data only.
  // Summer (7/14): the hero already shows the city under the title — the bar
  // below carries just "Completed <year>", no "Location" label, no duplicate.
  const completedYear =
    completed || (project as PortfolioProject & { completedYear?: string }).completedYear;
  const allBadges = [...badges, ...(project.galleryBadges ?? [])];

  // Live-WP parity: their portfolio pages carry the keyword line as a WHITE
  // 18px span on the white page ("Pool house and pool design in MN" — verified
  // computed rgb(255,255,255) on live 7/14) — crawlable, invisible. Summer
  // wants the same here instead of rendering it as a visible tagline. Service
  // pages' "...IN MINNESOTA" H2s are VISIBLE gray on live — never hide those.
  // Ground truth per slug lives in content/live-seo-map.json (built by
  // scripts/build-live-seo-map.mjs from live computed styles — heuristics
  // kept missing variants like "…– Mom's Design Build"). Heuristic kept as
  // fallback: short keyword line ending in MN/Minnesota, never location
  // lines ("Carver, MN") or anything with digits (addresses).
  const liveSeo = (LIVE_SEO as Record<string, { hidden: string[]; h2: string[]; hasBox?: boolean; boxText?: string }>)[slug];
  const isHiddenSeoLine = (t: string) => {
    const s = t.trim();
    if (liveSeo?.hidden.some((h) => h.trim() === s)) return true;
    if (s.length >= 80 || /\d/.test(s)) return false;
    if (/,\s*(minnesota|mn)\.?$/i.test(s)) return false;
    return /\b(minnesota|mn)\.?$/i.test(s);
  };
  // labels that live marks up as real <h2>s (e.g. "Neighbor A") keep the tag
  const isLiveH2 = (t: string) => !!liveSeo?.h2.some((h) => h.trim().toLowerCase() === t.trim().toLowerCase());
  const hiddenSubtitle = !!subtitle && isHiddenSeoLine(subtitle);

  // ── Summer's reading order (7/14): body text BEFORE the photo download ──
  // Text blocks (story/quote) rise to the top in their own order. A label
  // stays glued to its IMAGE group only when images actually follow it —
  // labels inside prose (e.g. "Check out this article!" before a linked
  // paragraph) travel with the text, keeping their WP-contiguous order
  // (splitting them broke story-text parity on coastal-cottage/over-the-top).
  // Before+3D pairs STACK (never slide); the real slider opens the Ta-Da.
  // "Property Serviced by Mom's Fine Gardening" is a division credit — it
  // ALWAYS closes the page (Josh 7/14 pm: never up top) in Fine Gardening
  // coral, linking through like it does on their site.
  const isFgCredit = (s: Staged) => s.kind === "label" && /property serviced by/i.test(s.text);
  const isMedia = (s: Staged, next?: Staged): boolean => {
    if (s.kind === "story" || s.kind === "quote") return false;
    if (isFgCredit(s)) return true;
    if (s.kind === "label")
      return !next || ["image", "imageRow", "galleryGrid", "slider", "tada"].includes(next.kind);
    return true;
  };
  const textPhase = staged.filter((s, i) => !isMedia(s, staged[i + 1]));
  let media: Staged[] = staged
    .filter((s, i) => isMedia(s, staged[i + 1]))
    .map((s) =>
      s.kind === "slider" && s.afterLabel === "3D Rendering"
        ? ({ kind: "imageRow", label: s.label, images: [s.before, s.after] } as Staged)
        : s
    );
  // the FG credit leaves the body flow entirely — it renders BELOW the photo
  // gallery (visual sweep 7/14: on gallery-only pages "end of body" was still
  // the top of the page). Rendered after LightboxGallery, before Design Notes.
  const fgCredit = media.find(isFgCredit) as { kind: "label"; text: string; block?: Block } | undefined;
  media = media.filter((s) => !isFgCredit(s));
  const tadaAt = media.findIndex((s) => s.kind === "tada");
  const sliderAt = media.findIndex((s) => s.kind === "slider");
  if (tadaAt !== -1 && sliderAt !== -1 && sliderAt < tadaAt) {
    const [sl] = media.splice(sliderAt, 1);
    media.splice(media.findIndex((s) => s.kind === "tada") + 1, 0, sl);
  }
  const flow = [...textPhase, ...media];
  // Live-WP parity (Josh 7/15): body text sits in the classic double-line box
  // — computed on live cedar-and-stone: 4px double #53565A on #f9fafb, 20px
  // pad. Hidden keyword lines render OUTSIDE the box (they're separate
  // widgets on live); pages with no visible body text get no box.
  const isHiddenStaged = (s: Staged) =>
    (s.kind === "story" || s.kind === "label") && isHiddenSeoLine((s as { text: string }).text);
  // Josh 7/15 pm: EVERY page's body text gets the double-line box — live only
  // boxed 21/70 but ours boxes them all. Inside: story paragraphs, pull-
  // quotes, and their attributions. Outside: labels (picture titles like
  // "Before & 3D Rendering" sit above their photos; promo links stay in flow).
  const visibleText = textPhase.filter((s) => !isHiddenStaged(s));
  const inBox = (s: Staged) =>
    s.kind === "story" || s.kind === "quote" ||
    (s.kind === "label" && /^\s*[-–—]/.test((s as { text: string }).text));
  const boxedTextAll = visibleText.filter(inBox);
  // Marketing 8/7: quotes read ABOVE the write-up, OUTSIDE the box, in the
  // live site's italic-serif voice. Dash-attribution labels travel with them.
  const isQuoteish = (s: Staged) =>
    s.kind === "quote" || (s.kind === "label" && /^\s*[-\u2013\u2014]/.test((s as { text: string }).text));
  const quoteFlow = boxedTextAll.filter(isQuoteish);
  const boxedText = boxedTextAll.filter((s) => !isQuoteish(s));
  const boxSet = new Set<Staged>(boxedTextAll);
  const firstBoxIdx = visibleText.findIndex((s) => boxSet.has(s));
  const preBox = firstBoxIdx === -1 ? visibleText : visibleText.slice(0, firstBoxIdx);
  const postBox = firstBoxIdx === -1 ? [] : visibleText.slice(firstBoxIdx).filter((s) => !boxSet.has(s));

  return (
    <>
      <JsonLd raw={project.jsonLd} />

      {/* ── Cinematic hero: project video when it exists, else the WP lead photo ── */}
      <section className="relative w-full h-[62vh] md:h-[78vh] overflow-hidden bg-ink">
        {isMp4 ? (
          // poster = lead photo (no black flash on load); preload=auto fully buffers
          // the compressed clip so the loop restart is seamless
          <video
            src={project.videoUrl}
            poster={heroImgUrl ?? undefined}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controlsList="nodownload"
          />
        ) : (
          heroRawUrl && (
            <Image src={heroRawUrl!} alt={heroAlt} fill priority quality={90} className="object-cover" sizes="100vw" />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
        <div className="absolute inset-0 flex items-end justify-center pb-14 md:pb-20 px-6">
          <div className="text-center">
            {project.categories?.[0] && (
              <p className="text-white/60 text-[20px] font-[500] tracking-[0.3em] uppercase mb-3">
                {project.categories[0]}
              </p>
            )}
            <h1 className="text-white text-[28px] md:text-[52px] font-[300] tracking-[0.18em] uppercase leading-tight">
              {project.title}
            </h1>
            {/* City + Completed: bigger, solid white (was /75 and /60 —
                too small/faint to read against light photos), on a faded
                dark banner so it stays legible on any background (Josh, 8/17). */}
            {(project.location || completedYear) && (
              <div className="inline-block mt-4 px-6 py-3 bg-black/35 backdrop-blur-[2px]">
                {project.location && (
                  // live marks the city as an <h2> (their only own heading besides
                  // the keyword line) — keep the tag for SEO parity, same look
                  <h2 className="text-white text-[26px] md:text-[28px] font-[400] tracking-[0.3em] uppercase">
                    {project.location}
                  </h2>
                )}
                {completedYear &&
                  (isLiveH2(`Completed ${completedYear}`) ? (
                    <h2 className="text-white text-[22px] md:text-[24px] font-[300] tracking-[0.18em] uppercase mt-1">
                      Completed {completedYear}
                    </h2>
                  ) : (
                    <p className="text-white text-[22px] md:text-[24px] font-[300] tracking-[0.18em] uppercase mt-1">
                      Completed {completedYear}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Meta bar: keyword subtitle + award badges. City and completed year
             live in the hero — never repeated here (Summer, 7/14; Josh 8/17). ── */}
      {((subtitle && !hiddenSubtitle) || allBadges.length > 0) && (
        <section className="border-b border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col items-center gap-3">
            {/* hidden keyword subtitles render top-left of the BODY instead
                (live's awkward placement) — only visible ones belong here */}
            {subtitle && !hiddenSubtitle && (
              <h2 className="text-[20px] md:text-[20px] font-[300] tracking-[0.22em] uppercase text-brand text-center">
                {subtitle}
              </h2>
            )}
            {allBadges.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-6 pt-2">
                {allBadges.map((b, i) => (
                  <Image
                    key={i}
                    src={urlFor(b).width(300).auto("format").url()}
                    alt={b.alt || "Award"}
                    width={150}
                    height={130}
                    className="h-[218px] w-auto object-contain opacity-90"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Editorial body: story, pull-quote, before/after slider, inline photos ── */}
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-3xl lg:max-w-[1100px] mx-auto">
          {/* when the video takes the hero, the WP lead photo opens the body (same img, same alt) */}
          {isMp4 && heroImgUrl && (
            <Image
              src={heroImgUrl}
              alt={heroAlt}
              width={1400}
              height={930}
              priority
              className="w-full h-auto mb-12"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          )}

          {(() => {
            const renderStaged = (s: Staged, i: number) => {
            // keyword lines are dropped entirely (Josh 7/15 pm: no more
            // hidden white text — their plain-<p> spam carries no SEO weight)
            if ((s.kind === "story" || s.kind === "label") && isHiddenSeoLine(s.text)) {
              return null;
            }
            switch (s.kind) {
              case "story":
                return (
                  <p key={i} className="text-[20px] md:text-[20px] leading-[1.8] font-[300] text-brand-mid my-6">
                    {rich(s.block, s.text)}
                  </p>
                );
              case "quote":
                return (
                  <blockquote key={i} className="my-12 text-center">
                    <p
                      className="text-[22px] md:text-[28px] italic leading-relaxed tracking-[0.02em] text-brand max-w-[1050px] mx-auto"
                      style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
                    >
                      {rich(s.block, s.text)}
                    </p>
                  </blockquote>
                );
              case "slider":
                return (
                  <div key={i} className="my-14 -mx-6 md:mx-0">
                    <p className="text-center text-[20px] font-[400] tracking-[0.28em] uppercase text-ink mb-6">
                      {s.label}
                    </p>
                    <BeforeAfterSlider
                      beforeUrl={urlFor(s.before).width(1600).auto("format").url()}
                      afterUrl={urlFor(s.after).width(1600).auto("format").url()}
                      beforeAlt={s.before.alt || `${project.title} — before`}
                      afterAlt={s.after.alt || `${project.title} — after`}
                      afterLabel={s.afterLabel}
                    />
                    <p className="text-center text-[20px] font-[300] tracking-[0.2em] uppercase text-muted mt-4">
                      Drag to compare
                    </p>
                  </div>
                );
              case "tada":
                return (
                  <div key={i} className="my-14 flex items-center justify-center gap-6">
                    <div className="h-px flex-1 bg-ink/10" />
                    <p className="text-[24px] md:text-[30px] font-[300] tracking-[0.4em] uppercase text-ink">
                      {s.text}
                    </p>
                    <div className="h-px flex-1 bg-ink/10" />
                  </div>
                );
              case "label": {
                const Tag = isLiveH2(s.text) ? "h2" : "p";
                return (
                  <Tag key={i} className="text-center text-[20px] md:text-[20px] font-[300] tracking-[0.28em] uppercase text-brand my-10">
                    {rich(s.block, s.text)}
                  </Tag>
                );
              }
              case "galleryGrid":
                // inline gallery under its own label (e.g. Neighbor A / neighbor b)
                return (
                  <div key={i} className="my-10">
                    <LightboxGallery
                      compact
                      title={project.title}
                      offset={gridOffsets.get(s) ?? 0}
                      total={photoAcc}
                      images={s.images.map((img, k) => ({
                        thumbUrl: urlFor(img).width(900).auto("format").url(),
                        fullUrl: urlFor(img).width(2000).auto("format").url(),
                        alt: img.alt || `${project.title} — photo ${k + 1}`,
                        ...sized(img.dim, 900),
                      }))}
                    />
                  </div>
                );
              case "imageRow":
                // desktop: one row; phone: stacked
                return (
                  <div key={i} className="my-12 -mx-6 md:mx-0">
                    {s.label && (
                      <p className="text-center text-[20px] font-[400] tracking-[0.28em] uppercase text-ink mb-6">
                        {s.label}
                      </p>
                    )}
                    <div className={`grid grid-cols-1 gap-3 px-6 md:px-0 ${"md:grid-cols-2"}`}>
                      {s.images.map((img, k) => (
                        <Reveal key={k}>
                          <Image
                            src={urlFor(img).width(800).auto("format").url()}
                            alt={img.alt || project.title}
                            width={800}
                            height={533}
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                );
              case "image":
                return (
                  <Image
                    key={i}
                    src={urlFor(s.block).width(1400).auto("format").url()}
                    alt={s.block.alt || project.title}
                    {...sized(s.block.dim, 1400)}
                    className="w-full h-auto my-10"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                );
            }
            };
            return (
              <>
                {preBox.map((s) => renderStaged(s, flow.indexOf(s)))}
                {quoteFlow.map((s) => renderStaged(s, flow.indexOf(s)))}
                {boxedText.length > 0 && (
                  <div
                    className="my-8 px-5 py-4 md:px-8 md:py-5 text-center [&>p:first-child]:mt-0 [&>p:last-child]:mb-0"
                    style={{ border: "4px double #53565A", backgroundColor: "#f9fafb" }}
                  >
                    {boxedText.map((s) => renderStaged(s, flow.indexOf(s)))}
                  </div>
                )}
                {postBox.map((s) => renderStaged(s, flow.indexOf(s)))}
                {media.map((s) => renderStaged(s, flow.indexOf(s)))}
              </>
            );
          })()}
        </div>
      </section>

      {/* ── Non-mp4 video embeds (Vimeo/YouTube) keep their section ── */}
      {project.videoUrl && !isMp4 && (
        <section className="px-4 md:px-6 pb-10 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={`${project.title} — project video`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery: same photos, same order, same alts — now with lightbox ── */}
      {galleryImages.length > 0 && (
        <section className="px-4 md:px-6 pb-16 bg-white">
          <LightboxGallery images={galleryImages} title={project.title} />
          {/* Marketing 8/7 (marketing director's call, supersedes founders'
              no-designer rule): public designer credit under the photos,
              linked to the designer's team page. No designerName on file =
              credit the firm, linked home. */}
          <p className="mt-10 text-center text-[20px] font-[300] tracking-[0.22em] uppercase text-brand-mid">
            Designed by{" "}
            {(project.designerName
              ? project.designerName.split(/\s+and\s+/i)
              : []
            ).map((name, i, arr) => {
              const slug = DESIGNER_TEAM_SLUGS[name.trim()];
              return (
                <span key={name}>
                  {slug ? (
                    <Link
                      href={`/team/${slug}/`}
                      className="text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand transition-colors"
                    >
                      {name.trim()}
                    </Link>
                  ) : (
                    name.trim()
                  )}
                  {i < arr.length - 1 ? " and " : ""}
                </span>
              );
            })}
            {!project.designerName && (
              <Link
                href="/"
                className="text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand transition-colors"
              >
                Mom&apos;s Design Build
              </Link>
            )}
          </p>
        </section>
      )}

      {/* ── Division credit: Fine Gardening coral, links through — always the
             bottom of the photo story, never up top (Josh, 7/14 pm) ── */}
      {fgCredit && (
        <section className="bg-white px-6 pb-16">
          <p
            className="text-center text-[20px] md:text-[20px] font-[400] tracking-[0.24em] uppercase [&_a]:decoration-[#FF6D6A]/50 [&_a]:hover:decoration-[#FF6D6A]"
            style={{ color: "#FF6D6A" }}
          >
            {rich(fgCredit.block, fgCredit.text)}
          </p>
        </section>
      )}

      {/* ── Design Notes: the researched story, below the project (Summer, 7/14) ── */}
      {PROJECT_NOTES[slug] && <DesignNotes notes={PROJECT_NOTES[slug]} />}

      {/* ── More Projects — their site ends every project with a grid of others ── */}
      {related.length > 0 && (
        <section className="px-4 md:px-6 py-16 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-8 px-2">
              <h2 className="text-[20px] md:text-[22px] font-[300] tracking-[0.25em] uppercase text-brand">
                More Projects
              </h2>
              <Link
                href="/portfolio"
                className="text-[20px] font-[500] tracking-[0.2em] uppercase text-muted hover:text-ink transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map((p) => (
                <OverlayTile
                  key={p.slug.current}
                  href={`/portfolio/${p.slug.current}`}
                  img={p.heroImage ? urlFor(p.heroImage).width(600).height(750).auto("format").url() : null}
                  title={p.title}
                  aspect="aspect-[4/5]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#f7f4ef] py-16 px-6 text-center">
        <h2 className="text-[20px] md:text-[26px] font-[300] tracking-[0.2em] uppercase text-brand mb-4">
          Start Your Project
        </h2>
        <p className="text-[20px] font-[300] tracking-[0.04em] text-brand-mid mb-8 max-w-md mx-auto">
          Ready to transform your outdoor or interior space? Let&apos;s talk.
        </p>
        <Link
          href="/contact"
          className="inline-block border border-ink text-ink text-[20px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
        >
          Meet With Us
        </Link>
      </section>

    </>
  );
}
