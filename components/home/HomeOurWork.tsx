import Image from "next/image";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

const builder = createImageUrlBuilder(client);

type Card = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: SanityImageSource;
};

// Homepage "Our Work" — a 3x3 preview of the portfolio grid (Josh, July 9).
// Same tiles as /portfolio: undimmed 4:3 photos, title on hover only
// (Owen/Jim: "you click the images because of what you're seeing, not the
// name"). First 9 in THEIR curated portfolio order. On mobile the first
// tile goes full-width as the lead, then 2-col.
export default async function HomeOurWork() {
  const { data } = await sanityFetch({
    query: `*[_type == "portfolioProject"] | order(orderRank) [0...9] { _id, title, slug, heroImage }`,
  });
  const cards = data as Card[];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-[#1C1C1A]">
            Our Work
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cards.map((card, i) => {
            const imgUrl = card.heroImage
              ? builder.image(card.heroImage).width(900).height(675).auto("format").url()
              : null;
            return (
              <Link
                key={card._id}
                href={`/portfolio/${card.slug.current}`}
                className={`group relative block aspect-[4/3] overflow-hidden bg-gray-100 ${
                  i === 0 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    alt={card.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-[13px] font-[400] tracking-[0.2em] uppercase text-center">
                    {card.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex px-8 py-4 bg-brand text-white text-xs font-bold tracking-widest uppercase hover:bg-brand-dark transition-all duration-200 active:scale-[0.98]"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
