import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { CARD_SETS } from "./serviceCards";

/* Renders a servicePage doc's portable-text body with one of the FOUR
 * renderer designs:
 *   hub       — LA + interior hubs (big first heading, brand taglines)
 *   standard  — the 36 sub-service/city pages
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
};

export type ServiceTemplate = "hub" | "standard" | "interior" | "division" | "portal";

function Rich({ block }: { block: BodyBlock }) {
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
            className="underline underline-offset-4 decoration-brand/40 hover:decoration-brand text-ink transition-colors"
          >
            {s.text}
          </Link>
        ) : (
          <span key={i}>{s.text}</span>
        );
      })}
    </>
  );
}

const isHeading = (b: BodyBlock) => b._type === "block" && /^h[1-6]$/.test(b.style ?? "");
// stegaClean: in Studio draft mode every string carries invisible stega chars
// — any logic that measures/matches text breaks for logged-in users (7/15:
// "Casual Luxury Since 1993" lost its treatment inside Presentation)
const plainText = (b: BodyBlock) => stegaClean((b.children ?? []).map((c) => c.text).join(""));

type ListGroup = { kind: "list"; key: string; items: BodyBlock[] };
type Grouped = BodyBlock | ListGroup;

function groupLists(blocks: BodyBlock[]): Grouped[] {
  const groups: Grouped[] = [];
  for (const b of blocks) {
    const last = groups[groups.length - 1];
    if (b._type === "block" && b.listItem === "bullet") {
      if (last && (last as ListGroup).kind === "list") (last as ListGroup).items.push(b);
      else groups.push({ kind: "list", key: "list-" + b._key, items: [b] });
    } else groups.push(b);
  }
  return groups;
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
        <span className="text-white text-[19px] md:text-[21px] font-[300] tracking-[0.18em] uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
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
      ? "group relative block h-[190px] md:h-[210px] overflow-hidden"
      : "group relative block h-[190px] md:h-[210px] overflow-hidden w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]";
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
          <Tag
            key={b._key}
            className="text-[20px] md:text-[24px] font-[300] tracking-[0.18em] uppercase mb-5"
            style={{ color: accent || "var(--color-brand)" }}
          >
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
          className="text-[20px] md:text-[24px] font-[300] tracking-[0.22em] uppercase text-center mt-16 mb-6 pt-4"
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
          className="text-center italic text-[19px] md:text-[21px] mb-10 [font-family:Georgia,'Times_New_Roman',serif]"
          style={{ color: accent }}
        >
          <Rich block={b} />
        </p>
      );
    }
    const tagline = (b.children ?? []).length === 1 && stegaClean(b.children![0].text ?? "").length < 45;
    return (
      <p
        key={b._key}
        className={
          tagline
            ? `text-[15px] font-[400] tracking-[0.28em] uppercase ${paired ? "" : "text-center"} mb-8`
            : paired
              ? "text-[17px] md:text-[18px] font-[300] leading-[1.8] text-brand-mid mb-5"
              : "text-[17px] md:text-[18px] font-[300] leading-[1.8] text-brand-mid max-w-[760px] mx-auto mb-5"
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
            className="inline-block text-white text-[14px] font-[600] tracking-[0.2em] uppercase px-9 py-4 transition-opacity duration-200 hover:opacity-85"
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
      <div className="max-w-[1200px] mx-auto">
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
                {pairN > 0 && <div className="h-px w-full my-2" style={{ backgroundColor: accent + "66" }} />}
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
            const rest = seg.blocks.filter(({ b }) => !/^A Division of Mom/i.test(plainText(b).trim()));
            return (
              <div key={"seg" + k}>
                {byline.map((tb) => renderText(tb))}
                <div
                  className="my-6 bg-[#F8F9FA] px-6 md:px-14 py-9 text-center [&_p]:max-w-none"
                  style={{ border: `3px double ${accent}` }}
                >
                  {rest.map((tb) => renderText(tb))}
                </div>
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
  const groups = groupLists(blocks);
  let heads = 0;
  const mw = (cls: string) => (narrow ? cls : `${cls} max-w-[820px] mx-auto`);
  return (
    <section className="pt-16 md:pt-24 pb-20 px-6 bg-white">
      <div className={narrow ? "max-w-[820px] mx-auto" : "max-w-[1100px] mx-auto"}>
        {groups.map((g, i) => {
          if ((g as ListGroup).kind === "list") {
            const list = g as ListGroup;
            return (
              <ul
                key={list.key}
                className={
                  narrow ? "list-disc pl-6 my-5 space-y-2" : "list-disc pl-6 my-5 space-y-2 max-w-[790px] mx-auto"
                }
              >
                {list.items.map((li) => (
                  <li key={li._key} className="text-[17px] font-[300] leading-[1.8] text-brand-mid">
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
                      : "text-[25px] md:text-[31px] font-[300] tracking-[0.16em] uppercase text-ink text-center mb-8 max-w-[860px] mx-auto"
                  }
                >
                  {plainText(b)}
                </Tag>
              );
            if (narrow) {
              if (b.style === "h3" || b.style === "h4")
                return (
                  <Tag key={b._key} className="text-[17px] font-[400] tracking-[0.16em] uppercase text-brand mt-10 mb-3">
                    {plainText(b)}
                  </Tag>
                );
              return (
                <Tag key={b._key} className="text-[20px] md:text-[22px] font-[300] tracking-[0.2em] uppercase text-brand text-center mt-16 mb-6">
                  {plainText(b)}
                </Tag>
              );
            }
            if (b.style === "h2")
              return (
                <Tag key={b._key} className="text-[20px] md:text-[22px] font-[300] tracking-[0.2em] uppercase text-brand text-center mt-16 mb-6 max-w-[820px] mx-auto">
                  {plainText(b)}
                </Tag>
              );
            return (
              <Tag key={b._key} className="text-[17px] font-[400] tracking-[0.16em] uppercase text-brand mt-10 mb-3 max-w-[820px] mx-auto">
                {plainText(b)}
              </Tag>
            );
          }
          if (b._type === "block" && b.style === "blockquote") {
            return (
              <blockquote
                key={b._key}
                className={`text-[19px] md:text-[22px] font-[300] italic leading-[1.8] text-ink text-center max-w-[640px] mx-auto ${narrow ? "my-8" : "my-10"}`}
              >
                <Rich block={b} />
              </blockquote>
            );
          }
          if (b._type === "block" && b.style === "attrib") {
            return (
              <p key={b._key} className="text-[13px] font-[500] tracking-[0.22em] uppercase text-brand text-center mb-10">
                — {plainText(b)}
              </p>
            );
          }
          if (b._type === "block") {
            return (
              <p key={b._key} className={mw("text-[17px] md:text-[18px] font-[300] leading-[1.8] text-brand-mid mb-5")}>
                <Rich block={b} />
              </p>
            );
          }
          if (b._type === "ctaButton") {
            return (
              <div key={b._key} className="text-center my-10">
                <Link
                  href={b.href!}
                  className="inline-block bg-brand text-white text-[14px] font-[600] tracking-[0.2em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
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
                    cell="group relative block h-[190px] md:h-[210px] overflow-hidden w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
                  />
                ))}
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

/* ── portal: homeowner-portal's numbered-step guide (760px column). h2 resets
 * the step counter, each h3 renders as an auto-numbered step (leading "N. "
 * stripped), external links open in a new tab, screenshots get a border.
 * Summer (7/14): the screenshots are supposed to be USEFUL — render them big. ── */
function PortalBody({ blocks }: { blocks: BodyBlock[] }) {
  let stepN = 0;
  const RichA = ({ block }: { block: BodyBlock }) => (
    <>
      {(block.children ?? []).map((s, i) => {
        const def = s.marks
          ?.map((m) => block.markDefs?.find((d) => d._key === m))
          .find((d) => d?._type === "link");
        return def?.href ? (
          <a
            key={i}
            href={def.href}
            className="underline underline-offset-4 decoration-brand/40 hover:decoration-brand text-ink transition-colors"
            {...(def.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
          >
            {s.text}
          </a>
        ) : (
          <span key={i}>{s.text}</span>
        );
      })}
    </>
  );
  return (
    <section className="pt-16 md:pt-24 pb-20 px-6 bg-white">
      <div className="max-w-[900px] mx-auto">
        {blocks.map((b, i) => {
          if (b._type === "block" && b.style === "h1")
            return (
              <h1 key={b._key} className="text-[26px] md:text-[34px] font-[300] tracking-[0.22em] uppercase text-ink text-center mb-10">
                {plainText(b)}
              </h1>
            );
          if (b._type === "block" && b.style === "h2") {
            stepN = 0;
            return (
              <h2 key={b._key} className="text-[19px] md:text-[21px] font-[400] tracking-[0.2em] uppercase text-brand mt-14 mb-5 pt-10 border-t border-gray-100">
                {plainText(b)}
              </h2>
            );
          }
          if (b._type === "block" && b.style === "h3") {
            stepN += 1;
            return (
              <h3 key={b._key} className="flex items-baseline gap-3 mt-10 mb-3">
                <span className="text-[26px] font-[200] text-brand/40 leading-none">
                  {String(stepN).padStart(2, "0")}
                </span>
                <span className="text-[16px] font-[500] tracking-[0.14em] uppercase text-brand">
                  {plainText(b).replace(/^\d+\.\s*/, "")}
                </span>
              </h3>
            );
          }
          if (b._type === "block" && b.listItem === "bullet")
            return (
              <ul key={b._key} className="list-disc pl-6 mb-3">
                <li className="text-[17px] font-[300] leading-[1.8] text-brand-mid">
                  <RichA block={b} />
                </li>
              </ul>
            );
          if (b._type === "block")
            return (
              <p key={b._key} className="text-[17px] md:text-[18px] font-[300] leading-[1.8] text-brand-mid mb-4">
                <RichA block={b} />
              </p>
            );
          if (b._type === "image" && b.url && b.dim)
            return (
              <div key={b._key} className="my-8 flex justify-center">
                <Image
                  src={b.url}
                  alt={b.alt || ""}
                  width={b.dim.width}
                  height={b.dim.height}
                  className="h-auto border border-gray-100"
                  style={{ maxWidth: Math.min(b.dim.width, 900), width: "100%" }}
                  sizes="(max-width: 768px) 100vw, 900px"
                  {...(i < 2 ? { priority: true } : { loading: "lazy" as const })}
                />
              </div>
            );
          return null;
        })}
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
}: {
  template: ServiceTemplate;
  body: BodyBlock[];
  cardsSet?: string;
  divisionLogoUrl?: string;
  /** division brand accent — Fine Gardening #FF6D6A, Commercial #5EAD4F */
  accent?: string;
}) {
  // In draft mode (Studio Presentation), stega watermarks string values with
  // invisible characters — clean anything used as a comparison/lookup key or
  // a URL, or the card grids vanish for logged-in editors.
  const template = stegaClean(templateRaw) as ServiceTemplate;
  const cardsSet = stegaClean(cardsSetRaw);
  const divisionLogoUrl = stegaClean(divisionLogoUrlRaw);
  if (template === "portal") return <PortalBody blocks={body} />;
  if (template === "hub")
    return <HubBody blocks={body} cardsSet={cardsSet} cardsLayout="flex" />;
  if (template === "division")
    return (
      <HubBody blocks={body} cardsSet={cardsSet} divisionLogoUrl={divisionLogoUrl} cardsLayout="grid" accent={accent} />
    );
  return <GroupedBody blocks={body} cardsSet={cardsSet} narrow={template === "interior"} />;
}
