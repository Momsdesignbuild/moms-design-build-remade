import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { CARD_SETS } from "./serviceCards";
import ServiceCarousel from "./ServiceCarousel";
import LiveQuotes from "./LiveQuotes";

/* Renders a servicePage doc's portable-text body with one of the FOUR
 * renderer designs:
 *   hub       — LA + interior hubs (big first heading, brand taglines)
 *   standard  — the 37 sub-service/city pages, laid out like their live Elementor pages (LiveBody)
 *   interior  — bathroom/kitchen/living remodeling (narrow 820px column)
 *   division  — garden management + commercial maintenance (division logo top)
 * Text verbatim from THEIR site — do not reword.
 *
 * Draft-2 restyle (Summer's audit, 7/14): live-WP type scale (17–18px body),
 * H2/H3 in Mom's blue, card tiles get the portfolio gray-overlay treatment
 * (title visible, hover reveals), divisions carry their own accent — Fine
 * Gardening #FF6D6A, Commercial #5EAD4F (hexes from the live pages) — and
 * their text runs sit in boxed sections between the double-rule detail. */

type Span = { _key: string; text: string; marks?: string[] };
type MarkDef = { _key: string; _type: string; href?: string };
export type BodyBlock = {
  _type: string;
  _key: string;
  style?: string;
  listItem?: string;
  children?: Span[];
  markDefs?: MarkDef[];
  // ctaButton
  text?: string;
  href?: string;
  // image (url + dim resolved in GROQ)
  url?: string;
  alt?: string;
  dim?: { width: number; height: number };
  // imageCarousel (urls + dims resolved in GROQ)
  images?: Array<{ url: string; alt?: string; dim?: { width: number; height: number } }>;
  // sectionVideo (urls resolved in GROQ)
  videoUrl?: string;
  posterUrl?: string;
};

export type ServiceTemplate = "hub" | "standard" | "interior" | "division" | "portal";
export type ServiceHero = { videoUrl?: string; posterUrl?: string; alt?: string; title?: string; height?: number; w?: number; h?: number };

function Rich({ block, teal = false }: { block: BodyBlock; teal?: boolean }) {
  return (
    <>
      {(block.children ?? []).map((s, i) => {
        const def = s.marks
          ?.map((m) => block.markDefs?.find((d) => d._key === m))
          .find((d) => d?._type === "link");
        return def?.href ? (
          <Link
            key={i}
            href={def.href}
            className={teal ? "text-brand hover:text-brand-dark transition-colors" : "underline underline-offset-4 decoration-brand/40 hover:decoration-brand text-ink transition-colors"}
          >
            {s.text}
          </Link>
        ) : s.marks?.includes("strong") || s.marks?.includes("em") ? (
          <span key={i} className={s.marks.includes("strong") ? "font-[600]" : undefined} style={s.marks.includes("em") ? ITALIC : undefined}>
            {s.text}
          </span>
        ) : (
          <span key={i}>{s.text}</span>
        );
      })}
    </>
  );
}

// html has font-synthesis:none and Proxima ships no italic file; their live WP fakes the italic, so do we
const ITALIC: React.CSSProperties = { fontStyle: "italic", fontSynthesis: "style" };
// the global h1–h6 rule forces Futura; their live h3/h4/quotes are Proxima
const PROXIMA: React.CSSProperties = { fontFamily: "var(--font-body), 'Proxima Nova', sans-serif" };

const isHeading = (b: BodyBlock) => b._type === "block" && /^h[1-6]$/.test(b.style ?? "");
// stegaClean: in Studio draft mode every string carries invisible stega chars
// — any logic that measures/matches text breaks for logged-in users (7/15:
// "Casual Luxury Since 1993" lost its treatment inside Presentation)
const plainText = (b: BodyBlock) => stegaClean((b.children ?? []).map((c) => c.text).join(""));

type ListGroup = { kind: "list"; key: string; items: BodyBlock[]; ordered?: boolean };
type Grouped = BodyBlock | ListGroup;

function groupLists(blocks: BodyBlock[]): Grouped[] {
  const groups: Grouped[] = [];
  for (const b of blocks) {
    const last = groups[groups.length - 1];
    if (b._type === "block" && (b.listItem === "bullet" || b.listItem === "number")) {
      const ordered = b.listItem === "number";
      if (last && (last as ListGroup).kind === "list" && !!(last as ListGroup).ordered === ordered) (last as ListGroup).items.push(b);
      else groups.push({ kind: "list", key: "list-" + b._key, items: [b], ordered });
    } else groups.push(b);
  }
  return groups;
}

/* Their live pages box a "FAQS" heading + its Q/A pairs in a bordered panel
 * (italic question, plain answer) — one of the "cool sections" that breaks
 * up the gray body-text wall (Josh 8/17, live pools page reference). The
 * migrated data has no markup for this, just an "FAQS" heading followed by
 * alternating h3 questions / paragraph answers, so detect it by heading text
 * and absorb everything up to the next h2-level heading or non-text block. */
type FaqGroup = { kind: "faq"; key: string; items: BodyBlock[] };
function groupFaqs(groups: Grouped[]): Array<Grouped | FaqGroup> {
  const out: Array<Grouped | FaqGroup> = [];
  let i = 0;
  while (i < groups.length) {
    const g = groups[i];
    const isFaqHeading =
      (g as BodyBlock)._type === "block" &&
      isHeading(g as BodyBlock) &&
      /^(faqs?|frequently asked questions)$/i.test(plainText(g as BodyBlock).trim());
    if (isFaqHeading) {
      const items: BodyBlock[] = [];
      let j = i + 1;
      while (j < groups.length) {
        const gg = groups[j];
        if ((gg as ListGroup).kind === "list") break;
        const bb = gg as BodyBlock;
        if (bb._type !== "block") break;
        if (isHeading(bb) && bb.style !== "h3" && bb.style !== "h4") break;
        items.push(bb);
        j++;
      }
      if (items.length) {
        out.push({ kind: "faq", key: (g as BodyBlock)._key, items });
        i = j;
        continue;
      }
    }
    out.push(g);
    i++;
  }
  return out;
}

/* The unified tile: grayed image + centered title, hover clears the text and
 * reveals the photo — identical to portfolio/careers (Summer, 7/14). */
function CardTile({ href, bg, title, cell }: { href: string; bg: string; title: string; cell: string }) {
  return (
    <Link href={href} className={`${cell} bg-brand-mid`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bg + "?w=600&auto=format"}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 flex items-center justify-center p-3 text-center transition-opacity duration-300 group-hover:opacity-0">
        <span className="text-white text-[20px] md:text-[21px] font-[300] tracking-[0.18em] uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
          {title}
        </span>
      </span>
    </Link>
  );
}

function Cards({ cardsSet, layout }: { cardsSet?: string; layout: "flex" | "grid" }) {
  const cards = cardsSet ? CARD_SETS[cardsSet] : null;
  if (!cards) return null;
  const wrap =
    layout === "grid"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-12"
      : "flex flex-wrap justify-center gap-3 my-12";
  // larger than draft-1's 152px — Summer: "it needs to be larger"
  const cell =
    layout === "grid"
      ? "group relative block aspect-[4/5] overflow-hidden"
      : "group relative block aspect-[4/5] overflow-hidden w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]";
  return (
    <div className={wrap}>
      {cards.map((c) => (
        <CardTile key={c.href} href={c.href} bg={c.bg} title={c.title} cell={cell} />
      ))}
    </div>
  );
}

/* ── hub + division: flat walk, first-item big heading, accent taglines.
 * Division pages (accent set) box each text run after the intro between
 * double-rule accents so the copy reads in sections, not one long scroll. ── */
function HubBody({
  blocks,
  cardsSet,
  divisionLogoUrl,
  cardsLayout,
  accent,
}: {
  blocks: BodyBlock[];
  cardsSet?: string;
  divisionLogoUrl?: string;
  cardsLayout: "flex" | "grid";
  accent?: string;
  /** standard template: the top video/photo, like their live pages */
  hero?: ServiceHero;
}) {
  // segment the flat walk: consecutive text blocks form a run; images/cards/CTAs break it
  type Seg = { kind: "text"; blocks: Array<{ b: BodyBlock; i: number }> } | { kind: "other"; b: BodyBlock; i: number };
  const segs: Seg[] = [];
  blocks.forEach((b, i) => {
    const isText = b._type === "block";
    const last = segs[segs.length - 1];
    if (isText && last?.kind === "text") (last as Extract<Seg, { kind: "text" }>).blocks.push({ b, i });
    else if (isText) segs.push({ kind: "text", blocks: [{ b, i }] });
    else segs.push({ kind: "other", b, i });
  });

  const headingColor = accent ? undefined : undefined; // accent applied via style below
  void headingColor;

  // Division-template pages open with a hero image + "A Division of Mom's…"
  // byline BEFORE their first real heading, so `i === 0` never matched it —
  // track the first heading actually rendered instead of its raw block index.
  let firstHeadingSeen = false;

  const renderText = ({ b, i: _i }: { b: BodyBlock; i: number }, paired = false) => {
    void _i;
    // commercial: "Serving the Greater Twin Cities Area" is a plain subhead on live
    if (accent && /^serving the greater/i.test(plainText(b).trim()))
      return (
        <h3 key={b._key} className="font-sans text-[18px] font-[600] tracking-[0.06em] text-left mt-10 mb-3" style={{ ...PROXIMA, color: accent }}>
          {plainText(b)}
        </h3>
      );
    if (isHeading(b)) {
      const first = !firstHeadingSeen;
      if (first) firstHeadingSeen = true;
      // their WP theme omits h1 on most of these pages (title only lived in
      // <title>) — promote the page's own first heading to a real h1
      // regardless of its authored style, same deliberate deviation already
      // applied on 225 portfolio/blog pages. A few pages (e.g. Service Areas
      // on the landscape-architecture hub) already authored a LATER section
      // heading as "h1" purely for its bigger visual style — downgrade any
      // non-first h1 to h2 so there's still only one real h1 per page.
      const Tag = first ? "h1" : b.style === "h1" ? "h2" : (b.style as "h1" | "h2" | "h3");
      if (paired)
        return (
          <Tag key={b._key} className={`${LV.h2} mb-1`}>
            {plainText(b)}
          </Tag>
        );
      return first ? (
        <Tag
          key={b._key}
          className="text-[26px] md:text-[34px] font-[300] tracking-[0.22em] uppercase text-ink text-center mb-3"
        >
          {plainText(b)}
        </Tag>
      ) : (
        <Tag
          key={b._key}
          className="text-[26px] md:text-[35px] font-[300] tracking-[0.22em] uppercase text-center mt-16 mb-6 pt-4"
          style={{ color: accent || "var(--color-brand)" }}
        >
          {plainText(b)}
        </Tag>
      );
    }
    // their division byline: accent italic serif, centered under the logo
    if (accent && /^A Division of Mom/i.test(plainText(b).trim())) {
      return (
        <p
          key={b._key}
          className="text-center italic text-[20px] md:text-[21px] mb-10 [font-family:Georgia,'Times_New_Roman',serif]"
          style={{ color: accent }}
        >
          <Rich block={b} />
        </p>
      );
    }
    if (accent && /look forward to serving/i.test(plainText(b)))
      return (
        <p key={b._key} className="font-sans text-[18px] font-bold text-brand-mid text-center mt-4 mb-2" style={ITALIC}>
          {plainText(b)}
        </p>
      );
    const tagline = (b.children ?? []).length === 1 && stegaClean(b.children![0].text ?? "").length < 45;
    return (
      <p
        key={b._key}
        className={
          tagline
            ? `text-[20px] font-[400] tracking-[0.28em] uppercase ${paired ? "" : "text-center"} mb-8`
            : paired
              ? "text-[18px] font-[300] leading-[1.8] text-brand-mid mb-5"
              : "text-[20px] md:text-[20px] font-[300] leading-[1.8] text-brand-mid max-w-[1050px] mx-auto mb-5"
        }
        style={tagline ? { color: accent || "var(--color-brand)" } : undefined}
      >
        <Rich block={b} />
      </p>
    );
  };

  const renderOther = (b: BodyBlock, i: number) => {
    if (b._type === "ctaButton") {
      return (
        <div key={b._key} className="text-center my-10">
          <Link
            href={b.href!}
            className="inline-block text-white text-[20px] font-[600] tracking-[0.2em] uppercase px-9 py-4 transition-opacity duration-200 hover:opacity-85"
            style={{ backgroundColor: accent || "var(--color-brand)" }}
          >
            {b.text}
          </Link>
        </div>
      );
    }
    if (b._type === "cardsGrid") {
      return <Cards key={b._key} cardsSet={cardsSet} layout={cardsLayout} />;
    }
    if (b._type === "imageCarousel" && b.images?.length) {
      return (
        <div key={b._key} className="my-8">
          <ServiceCarousel slides={b.images.filter((s) => s.url)} />
        </div>
      );
    }
    if (b._type === "image" && b.url && b.dim) {
      const display = Math.min(b.dim.width, 1100);
      return (
        <div key={b._key} className="my-8 flex justify-center">
          <Image
            src={b.url}
            alt={b.alt || ""}
            width={b.dim.width}
            height={b.dim.height}
            className="h-auto"
            style={{ maxWidth: display, width: "100%" }}
            sizes="(max-width: 768px) 100vw, 1100px"
            {...(i < 2 ? { priority: true } : { loading: "lazy" as const })}
          />
        </div>
      );
    }
    return null;
  };

  // ── division layout (Summer, audio 7/14): each HUGE photo sits PARALLEL to
  // its text section — photo one side, copy the other, alternating — "this
  // also is next to it, which is actually better… otherwise you're scrolling
  // for what feels like days." A photo pairs with the text run that follows
  // it; unpaired text runs keep the boxed double-rule treatment.
  type Row =
    | { kind: "pair"; img: BodyBlock; imgIdx: number; text: Extract<Seg, { kind: "text" }> }
    | { kind: "seg"; seg: Seg; k: number };
  const rows: Row[] = [];
  // their order: HERO PHOTO first, division logo BELOW it (Josh 7/15 vs live)
  let heroImg: BodyBlock | null = null;
  let segsForRows = segs;
  if (accent && segs[0]?.kind === "other" && (segs[0] as { b: BodyBlock }).b._type === "image") {
    heroImg = (segs[0] as { b: BodyBlock }).b;
    segsForRows = segs.slice(1);
  }
  if (accent) {
    for (let k = 0; k < segsForRows.length; k++) {
      const seg = segsForRows[k];
      const next = segsForRows[k + 1];
      if (
        seg.kind === "other" &&
        seg.b._type === "image" &&
        seg.i > 0 && // never the intro area
        next?.kind === "text"
      ) {
        rows.push({ kind: "pair", img: seg.b, imgIdx: seg.i, text: next as Extract<Seg, { kind: "text" }> });
        k++; // consume the text run
      } else rows.push({ kind: "seg", seg, k });
    }
  }

  let textSegN = -1;
  let pairN = -1;
  return (
    <section className="pt-16 md:pt-24 pb-20 px-6 bg-white">
      <div className={`${accent ? "max-w-[1080px]" : "max-w-[1200px]"} mx-auto`}>
        {/* their order: full-width hero photo, THEN the division logo below it */}
        {heroImg && heroImg.url && (
          <div className="mb-10">
            <Image
              src={heroImg.url}
              alt={heroImg.alt || ""}
              width={heroImg.dim?.width ?? 2000}
              height={heroImg.dim?.height ?? 1300}
              priority
              className="w-full h-auto object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}
        {divisionLogoUrl && (
          <div className="flex justify-center mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={divisionLogoUrl + "?w=800&auto=format"} alt="" style={{ maxWidth: 420, width: "100%" }} />
          </div>
        )}
        {(accent ? rows : segs.map((seg, k) => ({ kind: "seg", seg, k }) as Row)).map((row) => {
          if (row.kind === "pair") {
            pairN += 1;
            return (
              <div key={"pair" + row.imgIdx}>
                {/* thin accent rule between sections, like theirs */}
                {pairN > 0 && <div className="h-px w-full my-2 bg-brand-mid/70" />}
                <div className="my-10 md:my-14 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8 md:gap-12 items-start">
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={row.img.url!}
                      alt={row.img.alt || ""}
                      width={row.img.dim?.width ?? 1200}
                      height={row.img.dim?.height ?? 800}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 768px) 100vw, 420px"
                      loading="lazy"
                    />
                  </div>
                  <div>{row.text.blocks.map((tb) => renderText(tb, true))}</div>
                </div>
              </div>
            );
          }
          const { seg, k } = row;
          if (seg.kind === "other") return renderOther(seg.b, seg.i);
          textSegN += 1;
          // unpaired text run after the intro keeps the boxed double-rule
          // treatment (contrast, not endless text)
          if (accent && textSegN === 0) {
            // the intro sits in THEIR coral double-border box (byline stays outside)
            const byline = seg.blocks.filter(({ b }) => /^A Division of Mom/i.test(plainText(b).trim()));
            const all = seg.blocks.filter(({ b }) => !/^A Division of Mom/i.test(plainText(b).trim()));
            const cut = all.findIndex(({ b }) => /^serving the greater/i.test(plainText(b).trim()));
            const rest = cut >= 0 ? all.slice(0, cut) : all;
            const after = cut >= 0 ? all.slice(cut) : [];
            return (
              <div key={"seg" + k}>
                {byline.map((tb) => renderText(tb))}
                <div
                  className="my-6 bg-[#F8F9FA] px-6 md:px-14 py-9 text-center [&_p]:max-w-none"
                  style={{ border: `4px double ${accent}` }}
                >
                  {rest.map((tb) => renderText(tb))}
                </div>
                {after.length > 0 && <div className="text-left [&_p]:text-left [&_p]:max-w-none">{after.map((tb) => renderText(tb, true))}</div>}
              </div>
            );
          }
          if (accent && textSegN > 0) {
            return (
              <div key={"seg" + k} className="my-10 bg-[#FAFAF8] px-6 md:px-12 py-9">
                <div className="double-rule mb-8" style={{ borderColor: accent }} />
                {seg.blocks.map((tb) => renderText(tb))}
                <div className="double-rule mt-8" style={{ borderColor: accent }} />
              </div>
            );
          }
          return <div key={"seg" + k}>{seg.blocks.map((tb) => renderText(tb))}</div>;
        })}
      </div>
    </section>
  );
}

/* ── standard + interior: grouped lists, heading counter ── */
function GroupedBody({
  blocks,
  cardsSet,
  narrow,
}: {
  blocks: BodyBlock[];
  cardsSet?: string;
  narrow: boolean; // interior = 820px column, per-element max-w dropped
}) {
  const groups = groupFaqs(groupLists(blocks));
  let heads = 0;
  // Josh 8/19 (meeting doc): text must FILL the page — min ~95% of the nav
  // row (~1050px @1440) — "wide but not wider than the nav items"
  const mw = (cls: string) => (narrow ? cls : `${cls} max-w-[1050px] mx-auto`);
  return (
    <section className="pt-16 md:pt-24 pb-20 px-6 bg-white">
      {/* min ~1050 everywhere (Josh 8/19: text fills to ~95% of the nav row) */}
      <div className={narrow ? "max-w-[1050px] mx-auto" : "max-w-[1100px] mx-auto"}>
        {groups.map((g, i) => {
          if ((g as FaqGroup).kind === "faq") {
            const faq = g as FaqGroup;
            // pair each h3 question with the answer paragraphs that follow it
            const pairs: Array<{ q?: BodyBlock; a: BodyBlock[] }> = [];
            for (const b of faq.items) {
              if (isHeading(b)) pairs.push({ q: b, a: [] });
              else if (pairs.length) pairs[pairs.length - 1].a.push(b);
              else pairs.push({ a: [b] });
            }
            return (
              <div key={faq.key} className={mw("my-14 border border-ink/15 bg-[#FAFAF8] px-6 md:px-12 py-10")}>
                <h2 className="text-[26px] md:text-[35px] font-[300] tracking-[0.3em] uppercase text-ink mb-8">
                  FAQs
                </h2>
                <div className="space-y-8">
                  {pairs.map((p, pi) => (
                    <div key={p.q?._key ?? "a" + pi}>
                      {p.q && (
                        // subheads universally ~35px (Josh 8/19 — FAQ questions
                        // read the same size as body at 20/22)
                        <h3 className="text-[26px] md:text-[35px] font-[300] italic leading-[1.25] text-brand mb-3">
                          {plainText(p.q)}
                        </h3>
                      )}
                      {p.a.map((b) => (
                        <p key={b._key} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">
                          <Rich block={b} />
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          if ((g as ListGroup).kind === "list") {
            const list = g as ListGroup;
            return (
              <ul
                key={list.key}
                className={
                  // universal rule (Josh 8/19): lists always indent from body text
                  narrow ? "list-disc pl-6 ml-5 my-5 space-y-2" : "list-disc pl-12 my-5 space-y-2 max-w-[1050px] mx-auto"
                }
              >
                {list.items.map((li) => (
                  <li key={li._key} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">
                    <Rich block={li} />
                  </li>
                ))}
              </ul>
            );
          }
          const b = g as BodyBlock;
          if (isHeading(b)) {
            heads += 1;
            // same promote-first-heading-to-h1 deviation as HubBody/blog/portfolio —
            // their WP theme omits h1 on these pages, first heading only lived in <title>.
            // downgrade any OTHER block already authored as "h1" so there's still
            // only one real h1 per page (see HubBody's identical guard).
            const Tag =
              heads === 1 ? "h1" : b.style === "h1" ? "h2" : (b.style as "h1" | "h2" | "h3" | "h4" | "h5" | "h6");
            if (heads === 1)
              return (
                <Tag
                  key={b._key}
                  className={
                    narrow
                      ? "text-[26px] md:text-[32px] font-[300] tracking-[0.18em] uppercase text-ink text-center mb-8"
                      : "text-[26px] md:text-[35px] font-[300] tracking-[0.16em] uppercase text-ink text-center mb-8 max-w-[1050px] mx-auto"
                  }
                >
                  {plainText(b)}
                </Tag>
              );
            if (narrow) {
              if (b.style === "h3" || b.style === "h4")
                return (
                  <Tag key={b._key} className="text-[24px] md:text-[28px] font-[400] tracking-[0.16em] uppercase text-brand mt-10 mb-3">
                    {plainText(b)}
                  </Tag>
                );
              return (
                <Tag key={b._key} className="text-[26px] md:text-[35px] font-[300] tracking-[0.2em] uppercase text-brand text-center mt-16 mb-6">
                  {plainText(b)}
                </Tag>
              );
            }
            if (b.style === "h2")
              return (
                <Tag key={b._key} className="text-[26px] md:text-[35px] font-[300] tracking-[0.2em] uppercase text-brand text-center mt-16 mb-6 max-w-[1050px] mx-auto">
                  {plainText(b)}
                </Tag>
              );
            return (
              <Tag key={b._key} className="text-[24px] md:text-[28px] font-[400] tracking-[0.16em] uppercase text-brand mt-10 mb-3 max-w-[1050px] mx-auto">
                {plainText(b)}
              </Tag>
            );
          }
          if (b._type === "block" && b.style === "blockquote") {
            return (
              <blockquote
                key={b._key}
                className={`text-[20px] md:text-[22px] font-[300] italic leading-[1.8] text-ink text-center max-w-[1050px] mx-auto ${narrow ? "my-8" : "my-10"}`}
              >
                <Rich block={b} />
              </blockquote>
            );
          }
          if (b._type === "block" && b.style === "attrib") {
            return (
              <p key={b._key} className="text-[20px] font-[500] tracking-[0.22em] uppercase text-brand text-center mb-10">
                — {plainText(b)}
              </p>
            );
          }
          if (b._type === "block") {
            // paragraphs typed as "1." / "2." lists indent like real lists
            const numbered = /^\d+\s*[.)]\s/.test(plainText(b).trim());
            return (
              <p key={b._key} className={mw(`text-[20px] md:text-[20px] font-[300] leading-[1.8] text-brand-mid mb-5${numbered ? " ml-5 pl-6 -indent-6" : ""}`)}>
                <Rich block={b} />
              </p>
            );
          }
          if (b._type === "ctaButton") {
            return (
              <div key={b._key} className="text-center my-10">
                <Link
                  href={b.href!}
                  className="inline-block bg-brand text-white text-[20px] font-[600] tracking-[0.2em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
                >
                  {b.text}
                </Link>
              </div>
            );
          }
          if (b._type === "cardsGrid") {
            return (
              <div key={b._key} className="flex flex-wrap justify-center gap-3 my-14">
                {(cardsSet ? CARD_SETS[cardsSet] : [])?.map((c) => (
                  <CardTile
                    key={c.href}
                    href={c.href}
                    bg={c.bg}
                    title={c.title}
                    cell="group relative block aspect-[4/5] overflow-hidden w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
                  />
                ))}
              </div>
            );
          }
          if (b._type === "imageCarousel" && b.images?.length) {
            return (
              <div key={b._key} className={narrow ? "my-8" : "my-8 max-w-[1050px] mx-auto"}>
                <ServiceCarousel slides={b.images.filter((s) => s.url)} />
              </div>
            );
          }
          if (b._type === "image" && b.url && b.dim) {
            const cap = narrow ? 820 : 900;
            return (
              <div key={b._key} className="my-10 flex justify-center">
                <Image
                  src={b.url}
                  alt={b.alt || ""}
                  width={b.dim.width}
                  height={b.dim.height}
                  className="h-auto"
                  style={{ maxWidth: Math.min(b.dim.width, cap), width: "100%" }}
                  sizes={`(max-width: 768px) 100vw, ${cap}px`}
                  {...(i < 3 ? { priority: true } : { loading: "lazy" as const })}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

/* ── standard + interior: mirrors their live Elementor service pages (Summer 8/17
 * + 10/1, "the changes we talked about"; Josh 10/1: "mirror her pages in their
 * look", then "EVERY SINGLE SERVICE PAGE"). Framed top video/photo, intro in the
 * double-rule gray box, double hairline dividers, every section's photo beside
 * its text, FAQs boxed, "Why choose" beside the reviews, 3-up photo strip.
 * Sizes/colours measured off live pages 2026-10-01 (custom-decks, water-features,
 * chanhassen, bathroom-remodeling). ── */
const LV = {
  box: "bg-[#F9FAFB] border-4 border-double border-brand-mid",
  // live loads only Futura PT *light* but asks for 700, so the browser fakes the bold; html turns that off here
  h2: "font-bold [font-synthesis:weight] text-[24px] md:text-[30.6px] leading-[1.2] tracking-[0.06em] uppercase text-brand-mid",
  p: "font-sans text-[18px] font-[300] leading-[1.8] text-brand-mid",
  h3: "text-[21px] md:text-[23.4px] font-[300] leading-[1.2] tracking-[0.067em]",
  q: "text-[20px] md:text-[24px] font-[600] leading-[1.2] tracking-[0.04em] text-brand-mid",
  divider: "border-t-4 border-double border-[#CBD5E1] my-8",
};
const WHY = /^(why (should i |)choose|we bring luxury)/i;
const FAQ = /(^|\s)(faqs?|frequently asked questions)$/i;
const isMedia = (b?: BodyBlock) => !!b && ((b._type === "image" && !!b.url) || (b._type === "sectionVideo" && !!b.videoUrl));
type Quote = { text: string; name?: string };
type LiveItem =
  | { k: "intro"; blocks: BodyBlock[] }
  // layout: "sub" = h3 subhead in the text column · "above" = h2 full width over a 50/50 row · "inside" = h2 heads the text column
  | { k: "row"; head: BodyBlock; pre?: BodyBlock[]; text: BodyBlock[]; media: BodyBlock[]; left: boolean; layout: "sub" | "above" | "inside" }
  | { k: "faq"; head: BodyBlock; items: BodyBlock[] }
  | { k: "why"; head: BodyBlock; list: BodyBlock[]; quotes: Quote[] }
  | { k: "quotes"; quotes: Quote[]; top: boolean }
  | { k: "lead"; p: BodyBlock; cta: BodyBlock }
  | { k: "list"; items: BodyBlock[] }
  | { k: "b"; b: BodyBlock };

function parseLive(blocks: BodyBlock[]): LiveItem[] {
  const out: LiveItem[] = [];
  const text = (b?: BodyBlock) => b?._type === "block" && b.style !== "blockquote" && b.style !== "attrib";
  const isH2 = (b?: BodyBlock) => !!b && isHeading(b) && /^h[12]$/.test(b.style!);
  // a "why choose" heading: by wording, or any heading whose bullets run straight into the reviews
  const isWhy = (j: number) => {
    if (!isHeading(blocks[j])) return false;
    if (WHY.test(plainText(blocks[j]).trim())) return true;
    let k = j + 1;
    if (!blocks[k]?.listItem) return false;
    while (blocks[k]?.listItem) k++;
    return blocks[k]?.style === "blockquote";
  };
  const quotesAt = (j: number): [Quote[], number] => {
    const qs: Quote[] = [];
    while (blocks[j]?.style === "blockquote") {
      const q: Quote = { text: plainText(blocks[j]) };
      j++;
      if (blocks[j]?.style === "attrib") q.name = plainText(blocks[j++]);
      qs.push(q);
    }
    return [qs, j];
  };
  let i = 0;
  // intro = the page's first heading + the paragraphs under it (their boxed opener)
  if (blocks[0] && isHeading(blocks[0])) {
    let j = 1;
    while (text(blocks[j]) && !isHeading(blocks[j]) && !blocks[j].listItem) j++;
    out.push({ k: "intro", blocks: blocks.slice(0, j) });
    i = j;
  }
  while (i < blocks.length) {
    const b = blocks[i];
    const t = isHeading(b) ? plainText(b).trim() : "";
    if (FAQ.test(t)) {
      let j = i + 1;
      while (text(blocks[j]) && !isH2(blocks[j]) && !isWhy(j)) j++;
      out.push({ k: "faq", head: b, items: blocks.slice(i + 1, j) });
      i = j;
      continue;
    }
    if (isWhy(i)) {
      let j = i + 1;
      while (text(blocks[j]) && !isHeading(blocks[j])) j++;
      const [quotes, k] = quotesAt(j);
      out.push({ k: "why", head: b, list: blocks.slice(i + 1, j), quotes });
      i = k;
      continue;
    }
    if (b.style === "blockquote") {
      const [quotes, k] = quotesAt(i);
      // a review straight under the page title (interior pages) is their small italic one-liner, not a bubble
      out.push({ k: "quotes", quotes, top: out.length <= 1 });
      i = k;
      continue;
    }
    // media straight before a heading section → photo/video on the LEFT, the whole section on the right (automated screens)
    if (isMedia(b) && i > 0 && isH2(blocks[i + 1]) && (blocks[i - 1]._type === "ctaButton" || (text(blocks[i - 1]) && !isHeading(blocks[i - 1])))) {
      let j = i + 2;
      while (j < blocks.length && (text(blocks[j]) || blocks[j]._type === "ctaButton") && !isH2(blocks[j]) && !FAQ.test(plainText(blocks[j]).trim()) && !isWhy(j)) j++;
      out.push({ k: "row", head: blocks[i + 1], text: blocks.slice(i + 2, j), media: [b], left: true, layout: "inside" });
      i = j;
      continue;
    }
    // an h2 with subheads and ONE photo at the very end: the whole section beside that photo (kitchen "The Details")
    if (isH2(b) && isHeading(blocks[i + 1]) && !FAQ.test(t) && !isWhy(i + 1)) {
      let j = i + 1;
      while (j < blocks.length && (text(blocks[j]) || blocks[j]._type === "ctaButton") && !isH2(blocks[j]) && !FAQ.test(plainText(blocks[j]).trim()) && !isWhy(j)) j++;
      if (isMedia(blocks[j]) && !isMedia(blocks[j + 1]) && (j + 1 >= blocks.length || isH2(blocks[j + 1]) || !text(blocks[j + 1]))) {
        out.push({ k: "row", head: b, text: blocks.slice(i + 1, j), media: [blocks[j]], left: false, layout: "inside" });
        i = j + 1;
        continue;
      }
    }
    if (isHeading(b) && !isH2(b) || (isH2(b) && !isHeading(blocks[i + 1]))) {
      // a section (h3 subhead, or an h2 with no subheads) whose text/list/button run meets its photo(s)
      let j = i + 1;
      let mid = -1;
      const content: BodyBlock[] = [];
      while (j < blocks.length && (text(blocks[j]) || blocks[j]._type === "ctaButton" || isMedia(blocks[j])) && !isHeading(blocks[j])) {
        if (isMedia(blocks[j])) {
          // a photo mid-section (text on both sides) sits on the LEFT, like live's process steps
          if (content.length && text(blocks[j + 1]) && !isHeading(blocks[j + 1]) && mid < 0) { mid = j; j++; continue; }
          break;
        }
        content.push(blocks[j]);
        j++;
      }
      if (mid >= 0 && content.length) {
        // live: the section's intro runs full width, then the photo sits left of what follows it (process steps)
        const pre = content.filter((x) => blocks.indexOf(x) < mid);
        const post = content.filter((x) => blocks.indexOf(x) > mid);
        out.push({ k: "row", head: b, pre, text: post, media: [blocks[mid]], left: true, layout: isH2(b) ? "above" : "sub" });
        i = j;
        continue;
      }
      const media: BodyBlock[] = [];
      while (isMedia(blocks[j])) media.push(blocks[j++]);
      if (media.length && content.length) {
        out.push({ k: "row", head: b, text: content, media, left: false, layout: isH2(b) ? "above" : "sub" });
        i = j;
        continue;
      }
    }
    if (text(b) && !isHeading(b) && !b.listItem && blocks[i + 1]?._type === "ctaButton" && plainText(b).length < 160) {
      out.push({ k: "lead", p: b, cta: blocks[i + 1] });
      i += 2;
      continue;
    }
    if (b.listItem) {
      const items: BodyBlock[] = [];
      while (blocks[i]?.listItem) items.push(blocks[i++]);
      out.push({ k: "list", items });
      continue;
    }
    out.push({ k: "b", b });
    i++;
  }
  return out;
}

function LiveText({ blocks, center = false }: { blocks: BodyBlock[]; center?: boolean }) {
  return (
    <>
      {groupLists(blocks).map((g) => {
        if ((g as ListGroup).kind === "list") {
          const l = g as ListGroup;
          const Tag = l.ordered ? "ol" : "ul";
          return (
            <Tag key={l.key} className={`${l.ordered ? "list-decimal" : "list-disc"} pl-10 mb-5`}>
              {l.items.map((li) => (
                <li key={li._key} className={LV.p}>
                  <Rich block={li} teal />
                </li>
              ))}
            </Tag>
          );
        }
        const b = g as BodyBlock;
        return (
          <p key={b._key} className={center ? `${LV.p} mb-[22px] text-center` : `${LV.p} mb-[22px]`}>
            <Rich block={b} teal />
          </p>
        );
      })}
    </>
  );
}

function LiveButton({ b, left = false }: { b: BodyBlock; left?: boolean }) {
  // their last button ("Back to Landscape Architecture") is a plain teal text link
  if (/^back to /i.test(stegaClean(b.text ?? "")))
    return (
      <div className="mt-14 mb-6 md:px-2.5">
        <Link href={b.href!} className="font-sans text-[18px] font-[600] tracking-[0.06em] text-[#33BED1] hover:text-brand-dark transition-colors">
          {b.text}
        </Link>
      </div>
    );
  return (
    <div className={left ? "my-6" : "text-center my-10"}>
      <Link
        href={b.href!}
        className="inline-block bg-brand text-white font-sans text-[15px] font-[600] tracking-[0.07em] uppercase leading-none px-[34px] py-[21px] rounded-[3px] hover:bg-brand-dark transition-colors duration-200"
      >
        {b.text}
      </Link>
    </div>
  );
}

function LiveMedia({ media, narrow, maxH }: { media: BodyBlock[]; narrow: number; maxH?: number }) {
  if (media.length > 1)
    return <ServiceCarousel slides={media.filter((m) => m.url).map((m) => ({ url: m.url!, alt: m.alt, dim: m.dim }))} />;
  const m = media[0];
  if (m._type === "sectionVideo")
    return (
      <video
        src={stegaClean(m.videoUrl)}
        poster={stegaClean(m.posterUrl)}
        autoPlay
        muted
        loop
        playsInline
        aria-label={m.alt || undefined}
        className="w-full h-auto"
      />
    );
  // a photo smaller than the column shows at its own size, centred (live's Water Tables), never blown up
  const small = (m.dim?.width ?? 9999) < narrow;
  if (maxH && m.dim && m.dim.height > m.dim.width)
    return (
      <Image src={m.url!} alt={m.alt || ""} width={m.dim.width} height={m.dim.height} className="h-auto w-auto mx-auto" style={{ maxHeight: maxH }} sizes="(max-width: 768px) 100vw, 540px" loading="lazy" />
    );
  return (
    <Image
      src={m.url!}
      alt={m.alt || ""}
      width={m.dim?.width ?? 1200}
      height={m.dim?.height ?? 800}
      className={small ? "h-auto mx-auto" : "w-full h-auto"}
      style={small ? { width: m.dim!.width } : undefined}
      sizes={`(max-width: 768px) 100vw, ${narrow}px`}
      loading="lazy"
    />
  );
}

/* their card grid: 250×275 flip-box tiles, photo under a 38% black overlay, big
 * two-line white label (31px/500), rows fill from the left */
function LiveTile({ href, bg, title, wide = false }: { href: string; bg: string; title: string; wide?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden bg-brand-mid ${wide ? "aspect-[340/275] w-full md:w-[340px]" : "aspect-[250/275] w-[calc(50%-10px)] md:w-[250px]"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bg + "?w=600&auto=format"} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <span className="absolute inset-0 bg-black/[0.376] transition-opacity duration-300 group-hover:opacity-0" />
      <span
        className="absolute inset-0 flex items-center justify-center px-[35px] text-center text-white text-[20px] md:text-[31px] font-[500] leading-[1.2] tracking-[1.56px] uppercase transition-opacity duration-300 group-hover:opacity-0"
        style={PROXIMA}
      >
        {title}
      </span>
    </Link>
  );
}

function LiveBody({ blocks, cardsSet, hero }: { blocks: BodyBlock[]; cardsSet?: string; hero?: ServiceHero }) {
  const videoUrl = stegaClean(hero?.videoUrl);
  const posterUrl = stegaClean(hero?.posterUrl);
  const hasHero = !!(videoUrl || posterUrl);
  let body = blocks;
  // with a top photo set, a leading image block is the migrated copy of their old top photo
  if (hasHero && body[0]?._type === "image") body = body.slice(1);
  // a short heading straight before another heading sits ON their banner photo (Front Entries, Gardens, PATIOS)
  let bannerTitle: BodyBlock | null = null;
  if (posterUrl && !videoUrl && isHeading(body[0]) && isHeading(body[1]) && plainText(body[0]).trim().split(/\s+/).length <= 4) {
    bannerTitle = body[0];
    body = body.slice(1);
  }
  const caption = stegaClean(hero?.title);
  const heroHeight = hero?.height || (bannerTitle ? 547 : 500);
  const items = parseLive(body);
  // city pages ("Landscape Architecture In Edina"): live shows the title unboxed, gray subheads, a wider page
  const city = items[0]?.k === "intro" && /^landscape architecture in /i.test(plainText(items[0].blocks[0]).trim());
  // interior pages open with a bare title + a review (no paragraphs): title unboxed too
  const bareTitle = items[0]?.k === "intro" && items[0].blocks.length === 1;
  const h3Cls = `${LV.h3} ${city ? "text-brand-mid" : "text-[#00B4D1]"}`;
  const h3Style = city ? PROXIMA : { ...PROXIMA, ...ITALIC };
  const textish = (it?: LiveItem) => !!it && (it.k === "row" || it.k === "list" || it.k === "lead" || (it.k === "b" && it.b._type === "block"));
  const mediaW = city ? 559 : 412;
  return (
    <section className="pt-6 md:pt-8 pb-20 px-5 bg-white">
      <div className={`${city ? "max-w-[1238px]" : "max-w-[1080px]"} mx-auto`}>
        {/* automated screens: their title sits on white ABOVE the video */}
        {videoUrl && caption && <h1 className={`${LV.h2} md:text-[43.2px] text-center mt-4 mb-8`}>{caption}</h1>}
        {hasHero && (
          <div className="md:px-2.5 mb-8">
            {videoUrl ? (
              <video
                src={videoUrl}
                poster={posterUrl}
                autoPlay
                muted
                loop
                playsInline
                aria-label={hero?.alt || undefined}
                className="w-full aspect-[1060/596] object-cover bg-brand-light"
              />
            ) : (
              <div className="relative group">
                <Image
                  src={posterUrl!}
                  alt={hero?.alt || ""}
                  width={hero?.w ?? 2120}
                  height={hero?.h ?? 1192}
                  priority
                  className={
                    bannerTitle
                      ? "w-full object-cover"
                      : caption
                        ? "w-full object-cover opacity-[0.78] brightness-90 transition-opacity duration-500 group-hover:opacity-100" // hazed so the words read; clears on hover, like live
                        : "w-full h-auto"
                  }
                  sizes="(max-width: 1080px) 100vw, 1060px"
                  // live sets each banner's height (decks 500px, patios 344px); keep that shape at every width
                  style={bannerTitle || caption ? { aspectRatio: `1080 / ${heroHeight}` } : undefined}
                />
                {caption && (
                  <p
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-white font-[500] leading-[1.1] [text-shadow:0_0_10px_rgba(0,0,0,0.3)] ${
                      caption.length > 20 ? "text-[26px] md:text-[53px]" : "text-[30px] md:text-[60px] tracking-[5px]"
                    }`}
                    style={PROXIMA}
                  >
                    {caption}
                  </p>
                )}
                {bannerTitle && (
                  <h1
                    className="absolute inset-0 flex items-center justify-center px-4 text-center text-white text-[34px] md:text-[60px] font-[500] tracking-[5px] uppercase leading-[1.1] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]"
                    style={PROXIMA}
                  >
                    {plainText(bannerTitle)}
                  </h1>
                )}
              </div>
            )}
          </div>
        )}
        {items.map((it, n) => {
          const prev = items[n - 1];
          if (it.k === "intro")
            return (
              <div key="intro" className={city || bareTitle ? "pt-8 pb-6" : `${LV.box} px-5 md:px-6 pt-6 pb-4 mb-2`}>
                {it.blocks.map((b, i) => {
                  if (i > 0)
                    return (
                      <p key={b._key} className={`${LV.p} text-center mb-2.5`}>
                        <Rich block={b} teal />
                      </p>
                    );
                  // their WP theme put this in an h2; it is the page's one real h1 here, unless a banner title took it
                  const Tag = bannerTitle || (videoUrl && caption) ? "h2" : "h1";
                  return (
                    <Tag
                      key={b._key}
                      className={`${LV.h2} text-center mb-5 ${city || bareTitle ? "md:text-[43.2px] max-w-[788px] mx-auto leading-[1.4]" : ""}`}
                    >
                      {plainText(b)}
                    </Tag>
                  );
                })}
              </div>
            );
          if (it.k === "row") {
            const sub = it.layout === "sub";
            const head = sub ? (
              <h3 className={`${h3Cls} mb-5`} style={h3Style}>
                {plainText(it.head)}
              </h3>
            ) : (
              <h2 className={`${LV.h2} mb-3`}>{plainText(it.head)}</h2>
            );
            // keep the section's own order: runs of text/lists, subheads, its button
            const runsOf = (blocks: BodyBlock[]) => {
              const runs: BodyBlock[][] = [];
              for (const b of blocks) {
                const last = runs[runs.length - 1];
                const plain = b._type === "block" && !isHeading(b);
                if (plain && last && last[0]._type === "block" && !isHeading(last[0])) last.push(b);
                else runs.push([b]);
              }
              return runs.map((r) =>
                r[0]._type === "ctaButton" ? (
                  <LiveButton key={r[0]._key} b={r[0]} left />
                ) : isHeading(r[0]) ? (
                  <h3 key={r[0]._key} className={`${h3Cls} mt-6 mb-0`} style={h3Style}>
                    {plainText(r[0])}
                  </h3>
                ) : (
                  <LiveText key={r[0]._key} blocks={r} />
                )
              );
            };
            const above = it.layout === "above";
            const words = (
              <div>
                {!above && head}
                {runsOf(it.text)}
              </div>
            );
            const mid = !!it.pre?.length;
            const cols = city
              ? "md:grid-cols-[minmax(0,630px)_559px] md:justify-between"
              : mid
                ? "md:grid-cols-[250px_minmax(0,1fr)]"
                : above || (it.left && it.layout === "inside")
                  ? "md:grid-cols-2"
                  : it.left
                    ? "md:grid-cols-[412px_minmax(0,1fr)]"
                    : "md:grid-cols-[minmax(0,1fr)_412px]";
            const media = <LiveMedia media={it.media} narrow={above ? 540 : mediaW} maxH={above ? 490 : undefined} />;
            return (
              <div key={it.head._key}>
                {!sub && textish(prev) && <div className={LV.divider} />}
                {above && <div className={`${sub ? "" : "mt-8"} md:px-2.5`}>{head}</div>}
                {mid && <div className="md:px-2.5">{runsOf(it.pre!)}</div>}
                <div className={`grid ${cols} gap-5 md:gap-[35px] items-start ${city ? "" : "md:px-2.5"} mb-12 md:mb-5 ${sub || above || mid ? "" : "mt-8"}`}>
                  {it.left ? (
                    <>
                      {media}
                      {words}
                    </>
                  ) : (
                    <>
                      {words}
                      {media}
                    </>
                  )}
                </div>
              </div>
            );
          }
          if (it.k === "faq")
            return (
              <div key={"faq" + n} className={`${LV.box} px-5 md:px-6 py-6 my-10`}>
                <h2 className={`${LV.h2} mb-1`}>{plainText(it.head)}</h2>
                {it.items.map((b) =>
                  isHeading(b) ? (
                    <h3 key={b._key} className={`${LV.q} mt-16 first:mt-0 mb-1`} style={{ ...PROXIMA, ...ITALIC }}>
                      {plainText(b)}
                    </h3>
                  ) : (
                    <LiveText key={b._key} blocks={[b]} />
                  )
                )}
              </div>
            );
          if (it.k === "quotes" && it.top)
            return (
              <div key={"tq" + n} className="text-center max-w-[900px] mx-auto mb-8">
                {it.quotes.map((q, qi) => (
                  <figure key={qi} className="m-0">
                    <blockquote className={`${LV.p} text-brand-stone`} style={ITALIC}>
                      {q.text}
                    </blockquote>
                    {q.name && <figcaption className="mt-2 font-sans text-[16px] font-[600] text-brand-mid">{q.name}</figcaption>}
                  </figure>
                ))}
              </div>
            );
          if (it.k === "why" || it.k === "quotes") {
            const quotes = it.quotes;
            if (it.k === "why" && !quotes.length)
              return (
                <div key={"why" + n}>
                  {textish(prev) && <div className={LV.divider} />}
                  <h2 className={`${LV.h2} mt-8 mb-3`}>{plainText(it.head)}</h2>
                  <LiveText blocks={it.list} />
                </div>
              );
            const why = it.k === "why" && (
              <div className="md:px-2.5">
                <h2 className="text-[22px] md:text-[24px] font-[300] leading-[1.2] tracking-[0.04em] text-[#00B4D1] text-center mb-5" style={PROXIMA}>
                  {plainText(it.head)}
                </h2>
                <LiveText blocks={it.list} />
              </div>
            );
            return (
              <div key={"why" + n}>
                <div className={`my-14 grid gap-10 items-center ${why && quotes.length ? "md:grid-cols-2" : ""}`}>
                  {why}
                  {quotes.length > 0 && <LiveQuotes quotes={quotes} />}
                </div>
              </div>
            );
          }
          if (it.k === "lead")
            return (
              <div key={it.p._key}>
                {(prev?.k === "why" || prev?.k === "quotes") && <div className={LV.divider} />}
                <div className="text-center my-8">
                  <p className={`${LV.p} text-center mb-6`}>
                    <Rich block={it.p} teal />
                  </p>
                  <LiveButton b={it.cta} />
                </div>
              </div>
            );
          if (it.k === "list") return <LiveText key={it.items[0]._key} blocks={it.items} />;
          const b = it.b;
          if (isHeading(b)) {
            if (/^h[12]$/.test(b.style!))
              return (
                <div key={b._key}>
                  {textish(prev) && <div className={LV.divider} />}
                  <h2 className={`${LV.h2} mt-8 mb-3`}>{plainText(b)}</h2>
                </div>
              );
            if (b.style === "h3" || b.style === "h4")
              // live: ~31px under its section heading, and the paragraph sits right under it
              return (
                <h3 key={b._key} className={`${h3Cls} mt-5 mb-0`} style={h3Style}>
                  {plainText(b)}
                </h3>
              );
            return (
              <h4 key={b._key} className={`${LV.q} mt-8 mb-5`} style={{ ...PROXIMA, ...ITALIC }}>
                {plainText(b)}
              </h4>
            );
          }
          if (b._type === "block") return <LiveText key={b._key} blocks={[b]} />;
          if (b._type === "ctaButton") return <LiveButton key={b._key} b={b} />;
          if (b._type === "imageCarousel" && b.images?.length)
            return (
              <div key={b._key} className="my-8">
                <ServiceCarousel slides={b.images.filter((s) => s.url)} strip />
              </div>
            );
          if (isMedia(b))
            return (
              <div key={b._key} className="my-8 flex justify-center">
                <div style={{ width: "100%", maxWidth: Math.min(b.dim?.width ?? 1060, 1060) }}>
                  <LiveMedia media={[b]} narrow={1060} />
                </div>
              </div>
            );
          if (b._type === "cardsGrid")
            return (
              <div key={b._key} className="flex flex-wrap justify-start gap-5 my-6 md:px-2.5 max-w-[1080px] mx-auto">
                {(cardsSet ? CARD_SETS[cardsSet] : [])?.map((c) => (
                  <LiveTile key={c.href} href={c.href} bg={c.bg} title={c.title} />
                ))}
              </div>
            );
          return null;
        })}
      </div>
    </section>
  );
}

/* ── hub: LA + interior hubs, mirroring live (2026-10-01 measurements): big
 * Futura title, "Casual Luxury Since 1993" in gray Georgia italic between two
 * double hairlines, centred intro with teal links, consultation button, 250×275
 * (LA) / 340×275 (interior) flip-box tiles under a 38% black overlay with big
 * white labels, then "Service Areas" with teal city links. ── */
function LiveHub({ blocks, cardsSet }: { blocks: BodyBlock[]; cardsSet?: string }) {
  const cards = (cardsSet ? CARD_SETS[cardsSet] : []) ?? [];
  const wide = cards.length <= 4;
  let firstHeading = true;
  return (
    <section className="pt-10 md:pt-14 pb-20 px-5 bg-white">
      <div className="max-w-[1080px] mx-auto">
        {blocks.map((b, i) => {
          if (isHeading(b)) {
            const Tag = firstHeading ? "h1" : "h2";
            const big = firstHeading;
            firstHeading = false;
            return (
              <Tag
                key={b._key}
                className={`font-bold [font-synthesis:weight] uppercase text-brand-mid text-center leading-[1.2] tracking-[1.836px] ${
                  big
                    ? `text-[32px] ${plainText(b).length > 28 ? "md:text-[43px]" : "md:text-[50px]"} mb-3`
                    : `mt-16 mb-4 ${b.style === "h1" ? "text-[26px] md:text-[43px]" : "text-[24px] md:text-[30.6px]"}`
                }`}
              >
                {plainText(b)}
              </Tag>
            );
          }
          if (b._type === "block" && /^casual luxury/i.test(plainText(b).trim()))
            return (
              <div key={b._key} className="flex items-center gap-6 md:gap-12 mb-8">
                <span className="flex-1 border-t-4 border-double border-[#CBD5E1]" />
                <p className="m-0 text-[22px] md:text-[27px] italic text-[#94A3B8] whitespace-nowrap" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {plainText(b)}
                </p>
                <span className="flex-1 border-t-4 border-double border-[#CBD5E1]" />
              </div>
            );
          if (b._type === "block")
            return (
              <p key={b._key} className={`${LV.p} text-center mb-[22px]`}>
                <Rich block={b} teal />
              </p>
            );
          if (b._type === "ctaButton") return <LiveButton key={b._key} b={b} />;
          if (b._type === "cardsGrid")
            return (
              <div key={b._key} className="flex flex-wrap justify-start gap-5 my-10 md:px-2.5">
                {cards.map((c) => (
                  <LiveTile key={c.href} href={c.href} bg={c.bg} title={c.title} wide={wide} />
                ))}
              </div>
            );
          if (b._type === "image" && b.url && b.dim)
            return (
              <div key={b._key} className="my-8">
                <LiveMedia media={[b]} narrow={1060} />
              </div>
            );
          return null;
        })}
      </div>
    </section>
  );
}

/* ── portal: homeowner-portal's numbered-step guide (760px column). h2 resets
 * the step counter, each h3 renders as an auto-numbered step (leading "N. "
 * stripped), external links open in a new tab, screenshots get a border.
 * Summer (7/14): the screenshots are supposed to be USEFUL — render them big. ── */
function PortalBody({ blocks }: { blocks: BodyBlock[] }) {
  /* mirrors live /homeowner-portal/ (2026-10-01): centred title + Buildertrend logo, then
   * two 378px columns (Online Access · Overview · Helpful Hints | Portal Set-Up steps),
   * then Online Payment Set-Up with each step's screenshots to the right of its text */
  const at = (re: RegExp) => blocks.findIndex((b) => isHeading(b) && re.test(plainText(b).trim()));
  const iLeft = at(/^online access/i), iRight = at(/^portal set-?up/i), iPay = at(/^online payment/i);
  const ok = iLeft > 0 && iRight > iLeft && iPay > iRight;
  const RichA = ({ block }: { block: BodyBlock }) => (
    <>
      {(block.children ?? []).map((s, i) => {
        const def = s.marks?.map((m) => block.markDefs?.find((d) => d._key === m)).find((d) => d?._type === "link");
        return def?.href ? (
          <a key={i} href={def.href} className="text-brand hover:text-brand-dark transition-colors" {...(def.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
            {s.text}
          </a>
        ) : (
          <span key={i} className={s.marks?.includes("strong") ? "font-[600]" : undefined} style={s.marks?.includes("em") ? ITALIC : undefined}>
            {s.text}
          </span>
        );
      })}
    </>
  );
  const P = "font-sans text-[18px] font-[300] leading-[1.8] text-brand-mid mb-[22px]";
  const render = (list: BodyBlock[]) =>
    groupLists(list).map((g) => {
      if ((g as ListGroup).kind === "list") {
        const l = g as ListGroup;
        const Tag = l.ordered ? "ol" : "ul";
        return (
          <Tag key={l.key} className={`${l.ordered ? "list-decimal" : "list-disc"} pl-10 mb-6`}>
            {l.items.map((li) => (
              <li key={li._key} className="font-sans text-[18px] font-[300] leading-[1.8] text-brand-mid">
                <RichA block={li} />
              </li>
            ))}
          </Tag>
        );
      }
      const b = g as BodyBlock;
      if (b._type === "block" && b.style === "h1")
        return (
          <h1 key={b._key} className="font-[200] text-[26px] md:text-[31px] tracking-[0.06em] uppercase text-brand-mid text-center mb-8">
            {plainText(b)}
          </h1>
        );
      if (isHeading(b) && /^online access/i.test(plainText(b).trim()))
        return (
          <div key={b._key}>
            <h2 className="font-[300] text-[34px] md:text-[43px] leading-[1.4] uppercase text-brand-mid mb-1">{plainText(b)}</h2>
          </div>
        );
      if (b._type === "block" && b.style === "h2" && /^helpful hints/i.test(plainText(b).trim()))
        return (
          <h2 key={b._key} className="font-sans text-[16px] font-[600] uppercase tracking-[0.04em] text-brand-mid mt-12 mb-2" style={{ ...PROXIMA, ...ITALIC }}>
            {plainText(b)}
          </h2>
        );
      if (b._type === "block" && b.style === "h2")
        return (
          <h2 key={b._key} className="font-sans text-[23px] font-bold leading-[1.2] text-brand-mid mt-10 mb-2" style={PROXIMA}>
            {plainText(b)}
          </h2>
        );
      if (isHeading(b))
        return (
          <h3 key={b._key} className="font-sans text-[18px] font-bold leading-[1.8] text-brand-mid mt-8 mb-1" style={PROXIMA}>
            {plainText(b)}
          </h3>
        );
      if (b._type === "block")
        return (
          <p key={b._key} className={P}>
            <RichA block={b} />
          </p>
        );
      if (b._type === "image" && b.url && b.dim)
        return (
          <Image key={b._key} src={b.url} alt={b.alt || ""} width={b.dim.width} height={b.dim.height} className="w-full h-auto mb-6" sizes="(max-width: 768px) 100vw, 380px" loading="lazy" />
        );
      return null;
    });
  if (!ok)
    return (
      <section className="pt-16 pb-20 px-5 bg-white">
        <div className="max-w-[900px] mx-auto">{render(blocks)}</div>
      </section>
    );
  const head = blocks.slice(0, iLeft);
  const left = blocks.slice(iLeft, iRight);
  const loginAfter = left[1]?._key; // the Online Access paragraph
  const right = blocks.slice(iRight, iPay);
  const pay = blocks.slice(iPay);
  // payment: each step (h3 + its text) beside the screenshots that follow it
  const steps: Array<{ text: BodyBlock[]; imgs: BodyBlock[] }> = [];
  for (const b of pay.slice(1)) {
    const last = steps[steps.length - 1];
    if (isHeading(b) || !last) steps.push({ text: [b], imgs: [] });
    else if (b._type === "image") last.imgs.push(b);
    else last.text.push(b);
  }
  return (
    <section className="pt-14 md:pt-16 pb-20 px-5 bg-white">
      <div className="max-w-[1080px] mx-auto">
        {head.map((b) =>
          b._type === "image" && b.url && b.dim ? (
            <div key={b._key} className="flex justify-center mb-16">
              <Image src={b.url} alt={b.alt || ""} width={b.dim.width} height={b.dim.height} className="h-auto w-full max-w-[512px]" sizes="512px" priority />
            </div>
          ) : (
            render([b])
          )
        )}
        <div className="max-w-[816px] mx-auto grid md:grid-cols-2 gap-x-[60px] items-start">
          <div>
            {left.map((b) => (
              <div key={b._key}>
                {render([b])}
                {b._key === loginAfter && (
                  <iframe
                    title="Sign in to Buildertrend"
                    src="https://buildertrend.net/NewLoginFrame.aspx?color=Navy"
                    loading="lazy"
                    className="w-full h-[60px] border-0 mb-6"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="md:pt-3">{render(right)}</div>
        </div>
        <div className="max-w-[816px] mx-auto mt-10">
          {render([pay[0]])}
          {steps.map((st, i) => (
            <div key={i} className="grid md:grid-cols-[345px_345px] md:justify-between gap-6 items-start">
              <div>{render(st.text)}</div>
              <div className="md:pt-6">{render(st.imgs)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicePageBody({
  template: templateRaw,
  body,
  cardsSet: cardsSetRaw,
  divisionLogoUrl: divisionLogoUrlRaw,
  accent,
  hero,
}: {
  template: ServiceTemplate;
  body: BodyBlock[];
  cardsSet?: string;
  divisionLogoUrl?: string;
  /** division brand accent — Fine Gardening #FF6D6A, Commercial #5EAD4F */
  accent?: string;
  /** standard template: the top video/photo, like their live pages */
  hero?: ServiceHero;
}) {
  // In draft mode (Studio Presentation), stega watermarks string values with
  // invisible characters — clean anything used as a comparison/lookup key or
  // a URL, or the card grids vanish for logged-in editors.
  const template = stegaClean(templateRaw) as ServiceTemplate;
  const cardsSet = stegaClean(cardsSetRaw);
  const divisionLogoUrl = stegaClean(divisionLogoUrlRaw);
  if (template === "portal") return <PortalBody blocks={body} />;
  if (template === "hub") return <LiveHub blocks={body} cardsSet={cardsSet} />;
  if (template === "division")
    return (
      <HubBody blocks={body} cardsSet={cardsSet} divisionLogoUrl={divisionLogoUrl} cardsLayout="grid" accent={accent} />
    );
  if (template === "standard" || template === "interior") return <LiveBody blocks={body} cardsSet={cardsSet} hero={hero} />;
  return <GroupedBody blocks={body} cardsSet={cardsSet} narrow />;
}
