import type { Metadata } from "next";
import Image from "next/image";
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
        <h1 className="font-[300] text-[34px] md:text-[44px] leading-[1.15] tracking-[0.05em] uppercase text-brand-mid">{c.aboutHeading}</h1>
        {c.aboutBody.map((p, i) => (
          <p key={i} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">{p}</p>
        ))}
        {c.aboutSections.map((sec) => (
            <div key={sec.heading} className="flex flex-col gap-6">
              <h2 className="text-[26px] md:text-[34px] font-[300] leading-[1.2] tracking-[0.06em] uppercase text-ink mt-8">{sec.heading}</h2>
              {sec.image && <Image src={sec.image.url} alt={sec.image.alt} width={1200} height={800} sizes="(max-width: 820px) 100vw, 820px" className="w-full aspect-[3/2] object-cover" />}
              {sec.body.map((p, i) => (
                <p key={i} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">{p}</p>
              ))}
            </div>
          ))}
        <Link href="/about" className="self-start text-[20px] font-[600] tracking-[0.12em] uppercase text-brand underline underline-offset-4">
          {c.aboutLinkLabel}
        </Link>
      </div>
    </section>
  );
}
