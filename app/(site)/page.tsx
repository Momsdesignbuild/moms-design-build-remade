import type { Metadata } from "next";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Hero from "@/components/home/Hero";
import HomeServices from "@/components/home/HomeServices";
import HomePortfolioGrid from "@/components/home/HomePortfolioGrid";
import HomeAwards from "@/components/home/HomeAwards";
import HomeBuildertrendSection from "@/components/home/HomeBuildertrendSection";
import HomeGivingBack from "@/components/home/HomeGivingBack";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Mom's Design Build - Landscape & Interior Designers In Minnesota",
  },
  description:
    "Mom's Design Build is a MN based custom luxury remodeling & landscaping firm. Learn why we are Minnesota's most awarded design build company.",
  alternates: {
    canonical: "https://momsdesignbuild.com/",
  },
  openGraph: {
    url: "https://momsdesignbuild.com/",
  },
};

const builder = createImageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

async function getFeaturedPortfolio() {
  const projects = await client.fetch<
    Array<{ title: string; slug: { current: string }; heroImage?: SanityImageSource }>
  >(
    `*[_type == "portfolioProject"] | order(featured desc, order asc, _createdAt asc)[0..8] {
      title, slug, heroImage
    }`
  );
  return projects.map((p) => ({
    title: p.title,
    slug: p.slug,
    heroImageUrl: p.heroImage
      ? urlFor(p.heroImage).width(800).height(600).auto("format").url()
      : null,
  }));
}

export default async function HomePage() {
  const portfolio = await getFeaturedPortfolio();

  return (
    <>
      <Hero />
      <HomeServices />
      <HomePortfolioGrid items={portfolio} />
      <HomeAwards />
      <HomeBuildertrendSection />
      <HomeGivingBack />
    </>
  );
}
