import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = createImageUrlBuilder(client);

export type CareerTile = {
  title: string;
  slug: { current: string };
  order: number;
  photo?: SanityImageSource & { alt?: string };
};

// The photo-tile careers grid — their loop-grid pattern (career-page bottoms),
// now used on the hub too per Josh: culture photo tile, title overlay,
// whole tile clickable. Photos were CSS backgrounds on WP (no alt there);
// ours are real <img> with descriptive alts.
export default function CareersGrid({
  tiles,
  heading,
}: {
  tiles: CareerTile[];
  heading?: string;
}) {
  return (
    <section className="px-4 md:px-6 pb-20 bg-white">
      {heading && (
        <h2 className="text-center text-[16px] md:text-[20px] font-[300] tracking-[0.25em] uppercase text-ink mb-8">
          {heading}
        </h2>
      )}
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {tiles.map((t) => (
          <Link
            key={t.slug.current}
            href={`/careers/${t.slug.current}/`}
            className="group relative block aspect-square overflow-hidden bg-ink/5"
          >
            {t.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={builder.image(t.photo).width(600).height(600).auto("format").url()}
                alt={t.photo.alt || `${t.title} — Mom's Design Build careers`}
                width={600}
                height={600}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {/* photo undimmed — bottom scrim only (Owen/Jim: "dimming the
                photos takes away from the attraction") */}
            <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-3 text-left">
              <span className="text-white text-[11px] md:text-[12px] font-[400] tracking-[0.22em] uppercase leading-relaxed">
                {t.title}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
