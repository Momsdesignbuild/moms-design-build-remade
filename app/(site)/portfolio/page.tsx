import type { Metadata } from "next";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { JsonLd } from "@/components/PortableBody";
import OverlayTile from "@/components/OverlayTile";
import { PORTFOLIO_JSONLD } from "./jsonld";

// Head matches THEIR /portfolio/ exactly (Yoast values from the WP mirror).
// robots is inherited from the root layout (host-based: middleware noindexes non-prod hosts).
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
        url: "https://cdn.sanity.io/images/wavk40jo/production/096048a3bf03f284a37293beb474024e6e7e94ee-2400x1601.jpg",
        width: 2400,
        height: 1601,
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

      {/* marketing 8/7: FOUR across on desktop, cards vertical 4:5 like the live site */}
      <section className="px-4 md:px-6 pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <OverlayTile
              key={card._id}
              href={`/portfolio/${card.slug.current}`}
              img={
                card.heroImage
                  ? urlFor(card.heroImage).width(800).height(1000).auto("format").url()
                  : null
              }
              title={card.title}
              aspect="aspect-[4/5]"
              eager={i < 8}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </div>
      </section>
    </>
  );
}
