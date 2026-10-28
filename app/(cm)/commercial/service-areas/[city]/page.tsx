import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCopy } from "@/sanity/lib/copy";
import { COPY } from "@/sanity/copy/defaults";
import { PageHero, Intro, Rows, FaqCards, SectionHead, ServiceTiles, CitiesBand, ClosingCta } from "@/components/cm/CmParts";

// One page per CM service area. Same template for every city until each gets its own
// researched words; {city} in the Studio text is replaced with the city's name.
export function generateStaticParams() {
  return COPY.cm.cities.map((c) => ({ city: c.slug }));
}

async function find(slug: string) {
  const c = await getCopy("cm");
  const city = c.cities.find((x) => x.slug === slug);
  return { c, city, fill: (t: string) => (city ? t.replaceAll("{city}", city.name) : t) };
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { c, city, fill } = await find((await params).city);
  if (!city) return {};
  const title = fill(c.cityMetaTitle);
  const description = fill(c.cityMetaDescription);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://momsdesignbuild.com/commercial/service-areas/${city.slug}/` },
    openGraph: { title, description, siteName: c.heroHeading, locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CmCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { c, city, fill } = await find((await params).city);
  if (!city) notFound();
  // After the light services band the rows start white; the FAQ band takes the opposite of the last row.
  const faqBg = c.citySections.length % 2 === 0 ? "bg-white" : "bg-brand-light";
  return (
    <>
      <PageHero image={city.image} title={fill(c.cityHeading)} />
      <Intro paras={[...city.intro, ...c.cityBody]} fill={fill} />
      <section className="px-4 md:px-8 py-20 md:py-28 bg-brand-light">
        <SectionHead>{fill(c.cityServicesHeading)}</SectionHead>
        <ServiceTiles services={c.services} label={c.learnMoreLabel} />
      </section>
      <Rows sections={c.citySections} fill={fill} />
      <section className={`px-6 py-20 md:py-28 ${faqBg}`}>
        <SectionHead>{c.faqHeading}</SectionHead>
        <FaqCards faqs={c.cityFaqs} fill={fill} />
      </section>
      <CitiesBand image={c.seasonsImage} heading={c.propertiesHeading} cities={c.cities} current={city.slug} />
      <ClosingCta heading={c.closingHeading} text={c.closingBody} label={c.ctaLabel} />
    </>
  );
}
