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

// Corrected 8/17 (Josh): use the SAME OverlayTile treatment as portfolio —
// title overlaid centered on the darkened photo, fades on hover to reveal
// it at 100%, 4:5 ratio. Replaces the earlier bordered-box/title-above-photo
// version (Marketing 8/7), which didn't actually match portfolio's tiles.
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
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {tiles.map((t) => (
          <OverlayTile
            key={t.slug.current}
            href={`/careers/${t.slug.current}/`}
            img={t.photo ? builder.image(t.photo).width(800).height(1000).auto("format").url() : null}
            title={t.title}
            alt={t.photo?.alt || `${t.title} careers at Mom's Design Build`}
            aspect="aspect-[4/5]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ))}
      </div>
    </section>
  );
}
