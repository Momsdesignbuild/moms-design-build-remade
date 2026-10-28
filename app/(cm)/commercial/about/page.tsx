import type { Metadata } from "next";
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
  return (
    <>
      <PageHero image={c.heroImage} title={c.aboutHeading} />
      <Intro paras={c.aboutBody} />
      <Rows sections={c.aboutSections} cinematicFirst />
      <ClosingCta heading={c.closingHeading} text={c.closingBody} label={c.ctaLabel} />
    </>
  );
}
