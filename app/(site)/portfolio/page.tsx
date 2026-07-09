import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { JsonLd } from "@/components/PortableBody";
import { PORTFOLIO_JSONLD } from "./jsonld";

// Head matches THEIR /portfolio/ exactly (Yoast values from the WP mirror).
// robots is inherited from the root layout (noindex until SITE_LIVE=true).
export const metadata: Metadata = {
  title: { absolute: "Landscape & Interior Design Build Portfolio - Mom's Design Build" },
  description:
    "Mom's Design Build has completed a variety of custom luxury interior and landscape projects for our clients in Minnesota. Explore our design-build portfolio today!",
  alternates: { canonical: "https://momsdesignbuild.com/portfolio/" },
  openGraph: {
    title: "Landscape & Interior Design Build Portfolio - Mom's Design Build",
    description:
      "Mom's Design Build has completed a variety of custom luxury interior and landscape projects for our clients in Minnesota. Explore our design-build portfolio today!",
    url: "https://momsdesignbuild.com/portfolio/",
    type: "article",
    images: [
      {
        url: "https://momsdesignbuild.com/wp-content/uploads/2024/08/Moms-Design-Build_Garden-Grandeur-Project-029-1024x683.jpg",
        width: 1024,
        height: 683,
      },
    ],
  },
};

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

type Card = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: SanityImageSource;
};

async function getCards(): Promise<Card[]> {
  // orderRank = the Studio's drag-to-reorder position (seeded from THEIR
  // curated grid order captured from momsdesignbuild.com/portfolio/)
  const { data } = await sanityFetch({
    query: `*[_type == "portfolioProject"] | order(orderRank) { _id, title, slug, heroImage }`,
  });
  return data as Card[];
}

export default async function PortfolioPage() {
  const cards = await getCards();

  return (
    <>
      <JsonLd raw={PORTFOLIO_JSONLD} />

      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">
          Portfolio
        </h1>
      </section>

      <section className="px-4 md:px-6 pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map((card, i) => {
            const imgUrl = card.heroImage
              ? urlFor(card.heroImage).width(900).height(675).auto("format").url()
              : null;
            return (
              <Link
                key={card._id}
                href={`/portfolio/${card.slug.current}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-gray-100"
              >
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    alt={card.title}
                    fill
                    loading={i < 6 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
      </section>
    </>
  );
}
