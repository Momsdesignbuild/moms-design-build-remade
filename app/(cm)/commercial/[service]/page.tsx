import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCopy } from "@/sanity/lib/copy";
import { COPY } from "@/sanity/copy/defaults";
import { PageHero, Intro, Rows, Checklist, FaqCards, SectionHead, ServiceTiles, CitiesBand, ClosingCta } from "@/components/cm/CmParts";

// One page per CM service, all read from the "cm" page-text document.
export function generateStaticParams() {
  return COPY.cm.services.map((s) => ({ service: s.slug }));
}

async function find(slug: string) {
  const c = await getCopy("cm");
  return { c, s: c.services.find((x) => x.slug === slug) };
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { c, s } = await find((await params).service);
  if (!s) return {};
  const title = s.metaTitle;
  return {
    title: { absolute: title },
    description: s.metaDescription,
    alternates: { canonical: `https://momsdesignbuild.com/commercial/${s.slug}/` },
    openGraph: { title, description: s.metaDescription, siteName: c.heroHeading, locale: "en_US", type: "article", images: [{ url: s.image.url }] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CmServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { c, s } = await find((await params).service);
  if (!s) notFound();
  // The rows start on the light background (offset 1). The bands after them alternate from the color the last row ended on.
  const a = s.sections.length % 2 === 1 ? "bg-white" : "bg-brand-light";
  const b = a === "bg-white" ? "bg-brand-light" : "bg-white";
  return (
    <>
      <PageHero image={s.image} title={s.title} />
      <Intro paras={s.body} />
      <Rows sections={s.sections} offset={1} />
      <section className={`px-6 py-20 md:py-28 ${a}`}>
        <SectionHead>{c.includedHeading}</SectionHead>
        <Checklist items={s.included} />
      </section>
      <section className={`px-6 py-20 md:py-28 ${b}`}>
        <SectionHead>{c.faqHeading}</SectionHead>
        <FaqCards faqs={s.faqs} />
      </section>
      <section className={`px-4 md:px-8 py-20 md:py-28 ${a}`}>
        <SectionHead>{c.servicesHeading}</SectionHead>
        <ServiceTiles services={c.services} label={c.learnMoreLabel} />
      </section>
      <CitiesBand image={c.seasonsImage} heading={c.propertiesHeading} cities={c.cities} />
      <ClosingCta heading={c.closingHeading} text={c.closingBody} label={c.ctaLabel} />
    </>
  );
}
