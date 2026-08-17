import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { stegaClean } from "next-sanity";
import { client } from "@/sanity/lib/client";

const builder = createImageUrlBuilder(client);

export type BodyBlock = {
  _type: string;
  _key: string;
  style?: string;
  listItem?: string;
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  children?: Array<{ _key?: string; text: string; marks?: string[] }>;
  alt?: string;
  asset?: { _ref: string };
};

// spans → JSX honoring link/strong/em marks (e.g. award lists linking to portfolio pages)
function renderSpans(block: BodyBlock) {
  return (block.children ?? []).map((c, j) => {
    let node: React.ReactNode = c.text;
    if (c.marks?.includes("strong")) node = <strong>{node}</strong>;
    if (c.marks?.includes("em")) node = <em>{node}</em>;
    const def = c.marks?.map((m) => block.markDefs?.find((d) => d._key === m)).find((d) => d?._type === "link");
    if (def?.href) {
      const external = def.href.startsWith("http") && !def.href.includes("momsdesignbuild.com");
      node = (
        <a
          href={def.href}
          className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {node}
        </a>
      );
    }
    return <span key={c._key ?? j}>{node}</span>;
  });
}

type ListGroup = { _type: "list"; _key: string; ordered: boolean; items: BodyBlock[] };

/** Renders the portable-text body arrays produced by the WP migration (blocks, lists, links, inline images).
 * `editorial` (blog posts): matted images, brand list markers, double-rule
 * kickers above H2s — the "beautiful, not a word blob" treatment (Josh 7/14). */
export default function PortableBody({ body, editorial = false }: { body?: BodyBlock[]; editorial?: boolean }) {
  if (!body?.length) return null;
  let h2Seen = 0;
  // group consecutive list items into a single <ul>/<ol>
  const groups: Array<BodyBlock | ListGroup> = [];
  for (const block of body) {
    if (block._type === "block" && block.listItem) {
      const last = groups[groups.length - 1];
      if (last && last._type === "list" && (last as ListGroup).ordered === (block.listItem === "number")) {
        (last as ListGroup).items.push(block);
      } else {
        groups.push({ _type: "list", _key: block._key, ordered: block.listItem === "number", items: [block] });
      }
    } else groups.push(block);
  }

  // A short unpunctuated line directly after an image is that image's CAPTION
  // on their WP pages ("Cedar & Stone" under the Cedar & Stone photo). Bind it
  // to the photo's mat so it can't read as a heading for the NEXT photo
  // (Josh 7/14: award-winning-designs cross-reference).
  // stegaClean strips draft-mode invisible chars — without it caption/label
  // detection breaks for anyone logged into Studio (7/15)
  const plain = (b: BodyBlock) => stegaClean((b.children ?? []).map((c) => c.text).join("")).trim();
  const isCaption = (g: BodyBlock | ListGroup | undefined): g is BodyBlock => {
    if (!g || g._type !== "block") return false;
    const b = g as BodyBlock;
    if (b.listItem || /^h[1-6]$/.test(b.style ?? "")) return false;
    const t = plain(b);
    return t.length > 0 && t.length < 60 && !/[.!?:]$/.test(t);
  };
  const captionFor = new Map<string, BodyBlock>();
  const consumed = new Set<string>();
  if (editorial) {
    for (let i = 0; i < groups.length - 1; i++) {
      const g = groups[i];
      if ((g as BodyBlock)._type === "image" && isCaption(groups[i + 1])) {
        captionFor.set((g as BodyBlock)._key, groups[i + 1] as BodyBlock);
        consumed.add((groups[i + 1] as BodyBlock)._key);
      }
    }
  }

  return (
    // live-WP body copy: 18px / 1.8 Proxima 300, Astra gray #53565A (Summer: fonts ~1.5×)
    <div className="max-w-none text-[20px] md:text-[20px] leading-[1.8] text-brand-mid font-[300] space-y-5">
      {groups.map((g) => {
        if ((g as BodyBlock)._key && consumed.has((g as BodyBlock)._key)) return null;
        if (g._type === "list") {
          const list = g as ListGroup;
          const items = list.items.map((b) => <li key={b._key}>{renderSpans(b)}</li>);
          // explicit list styling — Tailwind preflight strips list-style and the
          // typography plugin isn't installed, so bare ul/ol render without markers
          return list.ordered ? (
            <ol key={list._key} className={editorial ? "list-none pl-1 my-6 space-y-3 [counter-reset:ed] [&>li]:relative [&>li]:pl-9 [&>li]:[counter-increment:ed] [&>li:before]:content-[counter(ed,decimal-leading-zero)] [&>li:before]:absolute [&>li:before]:left-0 [&>li:before]:top-[3px] [&>li:before]:text-[20px] [&>li:before]:font-semibold [&>li:before]:tracking-wide [&>li:before]:text-brand" : "list-decimal pl-6 my-5 space-y-2.5"}>{items}</ol>
          ) : (
            <ul key={list._key} className={editorial ? "list-none pl-1 my-6 space-y-3 [&>li]:relative [&>li]:pl-7 [&>li:before]:content-['—'] [&>li:before]:absolute [&>li:before]:left-0 [&>li:before]:text-brand" : "list-disc pl-6 my-5 space-y-2.5"}>{items}</ul>
          );
        }
        const block = g as BodyBlock;
        if (block._type === "block" && block.children) {
          if (!block.children.some((c) => c.text.trim())) return null;
          if (/^h[2-6]$/.test(block.style ?? "")) {
            const H = block.style as "h2" | "h3" | "h4" | "h5" | "h6";
            // live-WP heading scale, Mom's blue per Summer (H2 1.7em / H3 1.3em, Futura 300)
            const cls = H === "h2"
              ? "text-[1.55em] md:text-[1.7em] font-[300] tracking-[1.8px] leading-[1.2] text-brand mt-10 mb-4"
              : "text-[1.2em] md:text-[1.3em] font-[300] tracking-[1.5px] leading-[1.2] text-brand mt-8 mb-3";
            if (editorial && H === "h2") {
              h2Seen += 1;
              // headings that number THEMSELVES ("2. GOODBYE BORING…") keep
              // the double-rule but drop our running number — the "2 / 2."
              // double numbering read as a bug (Josh 7/15, lighting-trends)
              const selfNumbered = /^\s*\d+\s*[.):]/.test(plain(block));
              return (
                <div key={block._key} className="mt-14 mb-5">
                  {/* section kicker: the site's double-rule + a running number.
                      Self-numbered headings get NEITHER (the lone rule read
                      as weird orphaned formatting — Josh 7/15) */}
                  {!selfNumbered && (
                    <div className="flex items-center gap-4 mb-5">
                      <span className="double-rule-brand w-10 shrink-0" />
                      <span className="text-[20px] font-semibold tracking-[0.3em] text-brand/60">
                        {String(h2Seen).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <H className="text-[1.55em] md:text-[1.7em] font-[300] tracking-[1.8px] leading-[1.2] text-brand">
                    {renderSpans(block)}
                  </H>
                </div>
              );
            }
            return <H key={block._key} className={cls}>{renderSpans(block)}</H>;
          }
          return <p key={block._key}>{renderSpans(block)}</p>;
        }
        if (block._type === "image" && block.asset) {
          const img = (
            <Image
              key={editorial ? undefined : block._key}
              src={builder.image(block as SanityImageSource).width(1200).auto("format").url()}
              alt={block.alt || ""}
              width={1200}
              height={800}
              loading="lazy"
              className={editorial ? "w-full h-auto object-cover" : "w-full h-auto object-cover my-6"}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          );
          // editorial: photos ride a white mat with a soft shadow, like prints;
          // a caption line binds INSIDE the mat, under its photo — like theirs
          const cap = editorial ? captionFor.get(block._key) : undefined;
          return editorial ? (
            <figure key={block._key} className="my-10 bg-white p-2.5 shadow-[0_26px_55px_-30px_rgba(28,28,26,0.35)]">
              {img}
              {cap && (
                <figcaption className="pt-3 pb-1 text-center text-[20px] font-[400] tracking-[0.22em] uppercase text-brand-mid">
                  {renderSpans(cap)}
                </figcaption>
              )}
            </figure>
          ) : (
            img
          );
        }
        return null;
      })}
    </div>
  );
}

/** Emits the verbatim Yoast JSON-LD blocks captured from the WordPress site. */
export function JsonLd({ raw }: { raw?: string }) {
  if (!raw) return null;
  return (
    <>
      {raw.split("\n").filter(Boolean).map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: block }} />
      ))}
    </>
  );
}
