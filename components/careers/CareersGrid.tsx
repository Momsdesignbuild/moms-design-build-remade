import Image from "next/image";
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

// Marketing 8/7 (supersedes Summer 7/14 overlay note): career tiles copy the
// LIVE site's treatment — perfect-square photo, job name across the top,
// blue double-line edging, lightest-gray tile, 4-across on desktop.
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
          <Link
            key={t.slug.current}
            href={`/careers/${t.slug.current}/`}
            className="group block border border-brand/70 p-[3px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_-20px_rgba(28,28,26,0.35)]"
          >
            <div className="border border-brand/70 bg-[#F6F6F4] p-4 h-full flex flex-col gap-4">
              <h3 className="text-center text-[20px] font-[400] tracking-[0.18em] uppercase text-ink">
                {t.title}
              </h3>
              <div className="relative aspect-square overflow-hidden bg-brand-mid/20 border-[4.3px] border-double border-brand">
                {t.photo && (
                  <Image
                    src={builder.image(t.photo).width(800).height(800).auto("format").url()}
                    alt={t.photo?.alt || `${t.title} careers at Mom's Design Build`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
