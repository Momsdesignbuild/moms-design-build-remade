import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import OverlayTile from "@/components/OverlayTile";

const builder = createImageUrlBuilder(client);

export type CareerTile = {
  title: string;
  slug: { current: string };
  order: number;
  photo?: SanityImageSource & { alt?: string };
};

// Careers tiles = the SAME overlay treatment as portfolio/services (Summer,
// 7/14: "the gray overlay… makes everything feel more cohesive — same across
// portfolio, services, and careers; same size, job title, no box"). This
// supersedes the earlier undimmed-photo note. Photos were CSS backgrounds on
// WP (no alt there); ours are real <img> with descriptive alts.
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
        <h2 className="text-center text-[20px] md:text-[26px] font-[300] tracking-[0.25em] uppercase text-brand mb-8">
          {heading}
        </h2>
      )}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {tiles.map((t) => (
          <OverlayTile
            key={t.slug.current}
            href={`/careers/${t.slug.current}/`}
            img={t.photo ? builder.image(t.photo).width(800).height(600).auto("format").url() : null}
            title={t.title}
            alt={t.photo?.alt || `${t.title} — Mom's Design Build careers`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ))}
      </div>
    </section>
  );
}
