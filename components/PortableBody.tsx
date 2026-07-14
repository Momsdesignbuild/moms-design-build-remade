import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
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

/** Renders the portable-text body arrays produced by the WP migration (blocks, lists, links, inline images). */
export default function PortableBody({ body }: { body?: BodyBlock[] }) {
  if (!body?.length) return null;
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
  return (
    // live-WP body copy: 18px / 1.8 Proxima 300, Astra gray #53565A (Summer: fonts ~1.5×)
    <div className="max-w-none text-[17px] md:text-[18px] leading-[1.8] text-brand-mid font-[300] space-y-5">
      {groups.map((g) => {
        if (g._type === "list") {
          const list = g as ListGroup;
          const items = list.items.map((b) => <li key={b._key}>{renderSpans(b)}</li>);
          // explicit list styling — Tailwind preflight strips list-style and the
          // typography plugin isn't installed, so bare ul/ol render without markers
          return list.ordered ? (
            <ol key={list._key} className="list-decimal pl-6 my-5 space-y-2.5">{items}</ol>
          ) : (
            <ul key={list._key} className="list-disc pl-6 my-5 space-y-2.5">{items}</ul>
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
            return <H key={block._key} className={cls}>{renderSpans(block)}</H>;
          }
          return <p key={block._key}>{renderSpans(block)}</p>;
        }
        if (block._type === "image" && block.asset) {
          return (
            <Image
              key={block._key}
              src={builder.image(block as SanityImageSource).width(1200).auto("format").url()}
              alt={block.alt || ""}
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-auto object-cover my-6"
              sizes="(max-width: 768px) 100vw, 768px"
            />
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
