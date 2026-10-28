import type { Metadata } from "next";
import Link from "next/link";
import { getCopy } from "@/sanity/lib/copy";
import { PageHero, Intro, Rows, ClosingCta } from "@/components/cm/CmParts";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getCopy("cm");
  return {
    title: { absolute: c.aboutMetaTitle },
    description: c.aboutMetaDescription,
    alternates: { canonical: "https://momsdesignbuild.com/commercial/about/" },
  };
}

export default async function CmAbout() {
  const c = await getCopy("cm");
  const linkBg = c.aboutSections.length % 2 === 0 ? "bg-white" : "bg-brand-light";
  return (
    <>
      <PageHero image={c.heroImage} title={c.aboutHeading} />
      <Intro paras={c.aboutBody} />
      <Rows sections={c.aboutSections} cinematicFirst />
      <section className={`px-6 py-16 text-center ${linkBg}`}>
        <Link href="/about" className="inline-block border-2 border-brand text-ink text-[18px] font-[600] tracking-[0.18em] uppercase px-8 py-4 hover:bg-brand hover:text-white transition-colors">
          {c.aboutLinkLabel}
        </Link>
      </section>
      <ClosingCta heading={c.closingHeading} text={c.closingBody} label={c.ctaLabel} />
    </>
  );
}
