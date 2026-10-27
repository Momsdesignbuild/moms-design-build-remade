import type { Metadata } from "next";
import Link from "next/link";
import { getCopy } from "@/sanity/lib/copy";

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
    <section className="px-6 py-20 bg-white">
      <div className="max-w-[820px] mx-auto flex flex-col gap-6">
        <h1 className="font-bold [font-synthesis:weight] text-[34px] md:text-[44px] leading-[1.15] tracking-[0.05em] uppercase text-brand-mid">{c.aboutHeading}</h1>
        {c.aboutBody.map((p, i) => (
          <p key={i} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">{p}</p>
        ))}
        <Link href="/about" className="self-start text-[20px] font-[600] tracking-[0.12em] uppercase text-[#5EAD4F] underline underline-offset-4">
          {c.aboutLinkLabel}
        </Link>
      </div>
    </section>
  );
}
