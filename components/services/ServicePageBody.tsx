import Image from "next/image";
import Link from "next/link";
import { CARD_SETS } from "./serviceCards";

/* Renders a servicePage doc's portable-text body with one of the FOUR
 * pre-migration renderer designs, byte-matched classNames (July 9 migration —
 * content moved to Sanity, design stayed here):
 *   hub       — LA + interior hubs (big first heading, brand taglines)
 *   standard  — the 36 sub-service/city pages
 *   interior  — bathroom/kitchen/living remodeling (narrow 820px column)
 *   division  — garden management + commercial maintenance (division logo top)
 * Text verbatim from THEIR site — do not reword. */

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
const plainText = (b: BodyBlock) => (b.children ?? []).map((c) => c.text).join("");

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

function Cards({ cardsSet, layout }: { cardsSet?: string; layout: "flex" | "grid" }) {
  const cards = cardsSet ? CARD_SETS[cardsSet] : null;
  if (!cards) return null;
  const wrap =
    layout === "grid"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-12"
      : "flex flex-wrap justify-center gap-3 my-12";
  const cell =
    layout === "grid"
      ? "group relative block h-[152px] overflow-hidden"
      : "group relative block h-[152px] overflow-hidden w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]";
  return (
    <div className={wrap}>
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className={cell}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.bg + "?w=600&auto=format"}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-3 text-left text-white text-[13px] font-[400] tracking-[0.16em] uppercase">
            {c.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ── hub + division: flat walk, first-item big heading, brand taglines ── */
function HubBody({
  blocks,
  cardsSet,
  divisionLogoUrl,
  cardsLayout,
}: {
  blocks: BodyBlock[];
  cardsSet?: string;
  divisionLogoUrl?: string;
  cardsLayout: "flex" | "grid";
}) {
  return (
    <section className="pt-16 md:pt-24 pb-20 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        {divisionLogoUrl && (
          <div className="flex justify-center mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={divisionLogoUrl + "?w=800&auto=format"} alt="" style={{ maxWidth: 420, width: "100%" }} />
          </div>
        )}
        {blocks.map((b, i) => {
          if (isHeading(b)) {
            const Tag = b.style as "h1" | "h2" | "h3";
            const first = i === 0;
            return (
              <Tag
                key={b._key}
                className={
                  first
                    ? "text-[22px] md:text-[28px] font-[300] tracking-[0.22em] uppercase text-ink text-center mb-3"
                    : "text-[16px] font-[400] tracking-[0.22em] uppercase text-ink text-center mt-16 mb-6 pt-4"
                }
              >
                {plainText(b)}
              </Tag>
            );
          }
          if (b._type === "block") {
            const tagline =
              (b.children ?? []).length === 1 && (b.children![0].text ?? "").length < 45;
            return (
              <p
                key={b._key}
                className={
                  tagline
                    ? "text-[12px] font-[400] tracking-[0.28em] uppercase text-brand text-center mb-8"
                    : "text-[14px] font-[300] leading-[1.9] text-muted max-w-[760px] mx-auto mb-4"
                }
              >
                <Rich block={b} />
              </p>
            );
          }
          if (b._type === "ctaButton") {
            return (
              <div key={b._key} className="text-center my-10">
                <Link
                  href={b.href!}
                  className="inline-block bg-brand text-white text-[11px] font-[600] tracking-[0.2em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
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
                  <li key={li._key} className="text-[14px] font-[300] leading-[1.8] text-muted">
                    <Rich block={li} />
                  </li>
                ))}
              </ul>
            );
          }
          const b = g as BodyBlock;
          if (isHeading(b)) {
            const Tag = b.style as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            heads += 1;
            if (heads === 1)
              return (
                <Tag
                  key={b._key}
                  className={
                    narrow
                      ? "text-[22px] md:text-[26px] font-[300] tracking-[0.18em] uppercase text-ink text-center mb-8"
                      : "text-[21px] md:text-[25px] font-[300] tracking-[0.16em] uppercase text-ink text-center mb-8 max-w-[860px] mx-auto"
                  }
                >
                  {plainText(b)}
                </Tag>
              );
            if (narrow) {
              if (b.style === "h3" || b.style === "h4")
                return (
                  <Tag key={b._key} className="text-[13px] font-[500] tracking-[0.16em] uppercase text-ink mt-10 mb-3">
                    {plainText(b)}
                  </Tag>
                );
              return (
                <Tag key={b._key} className="text-[16px] font-[400] tracking-[0.2em] uppercase text-ink text-center mt-16 mb-6">
                  {plainText(b)}
                </Tag>
              );
            }
            if (b.style === "h2")
              return (
                <Tag key={b._key} className="text-[16px] font-[400] tracking-[0.2em] uppercase text-ink text-center mt-16 mb-6 max-w-[820px] mx-auto">
                  {plainText(b)}
                </Tag>
              );
            return (
              <Tag key={b._key} className="text-[13px] font-[500] tracking-[0.16em] uppercase text-ink mt-10 mb-3 max-w-[820px] mx-auto">
                {plainText(b)}
              </Tag>
            );
          }
          if (b._type === "block" && b.style === "blockquote") {
            return (
              <blockquote
                key={b._key}
                className={`text-[16px] md:text-[18px] font-[300] italic leading-[1.9] text-ink text-center max-w-[640px] mx-auto ${narrow ? "my-8" : "my-10"}`}
              >
                <Rich block={b} />
              </blockquote>
            );
          }
          if (b._type === "block" && b.style === "attrib") {
            return (
              <p key={b._key} className="text-[11px] font-[500] tracking-[0.22em] uppercase text-brand text-center mb-10">
                — {plainText(b)}
              </p>
            );
          }
          if (b._type === "block") {
            return (
              <p key={b._key} className={mw("text-[14px] font-[300] leading-[1.9] text-muted mb-4")}>
                <Rich block={b} />
              </p>
            );
          }
          if (b._type === "ctaButton") {
            return (
              <div key={b._key} className="text-center my-10">
                <Link
                  href={b.href!}
                  className="inline-block bg-brand text-white text-[11px] font-[600] tracking-[0.2em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
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
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group relative block h-[152px] overflow-hidden w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.bg + "?w=600&auto=format"}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-3 text-left text-white text-[13px] font-[400] tracking-[0.16em] uppercase">
                      {c.title}
                    </span>
                  </Link>
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
 * stripped), external links open in a new tab, screenshots get a border. ── */
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
      <div className="max-w-[760px] mx-auto">
        {blocks.map((b, i) => {
          if (b._type === "block" && b.style === "h1")
            return (
              <h1 key={b._key} className="text-[22px] md:text-[28px] font-[300] tracking-[0.22em] uppercase text-ink text-center mb-10">
                {plainText(b)}
              </h1>
            );
          if (b._type === "block" && b.style === "h2") {
            stepN = 0;
            return (
              <h2 key={b._key} className="text-[15px] font-[500] tracking-[0.2em] uppercase text-ink mt-14 mb-5 pt-10 border-t border-gray-100">
                {plainText(b)}
              </h2>
            );
          }
          if (b._type === "block" && b.style === "h3") {
            stepN += 1;
            return (
              <h3 key={b._key} className="flex items-baseline gap-3 mt-10 mb-3">
                <span className="text-[22px] font-[200] text-brand/40 leading-none">
                  {String(stepN).padStart(2, "0")}
                </span>
                <span className="text-[13px] font-[500] tracking-[0.14em] uppercase text-ink">
                  {plainText(b).replace(/^\d+\.\s*/, "")}
                </span>
              </h3>
            );
          }
          if (b._type === "block" && b.listItem === "bullet")
            return (
              <ul key={b._key} className="list-disc pl-6 mb-3">
                <li className="text-[14px] font-[300] leading-[1.9] text-muted">
                  <RichA block={b} />
                </li>
              </ul>
            );
          if (b._type === "block")
            return (
              <p key={b._key} className="text-[14px] font-[300] leading-[1.9] text-muted mb-4">
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
                  style={{ maxWidth: Math.min(b.dim.width, 640), width: "100%" }}
                  sizes="(max-width: 768px) 100vw, 640px"
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
  template,
  body,
  cardsSet,
  divisionLogoUrl,
}: {
  template: ServiceTemplate;
  body: BodyBlock[];
  cardsSet?: string;
  divisionLogoUrl?: string;
}) {
  if (template === "portal") return <PortalBody blocks={body} />;
  if (template === "hub")
    return <HubBody blocks={body} cardsSet={cardsSet} cardsLayout="flex" />;
  if (template === "division")
    return <HubBody blocks={body} cardsSet={cardsSet} divisionLogoUrl={divisionLogoUrl} cardsLayout="grid" />;
  return <GroupedBody blocks={body} cardsSet={cardsSet} narrow={template === "interior"} />;
}
