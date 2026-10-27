import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCopy } from "@/sanity/lib/copy";
import { COPY } from "@/sanity/copy/defaults";

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
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center bg-[#222]">
        <Image src={c.heroImage.url} alt={c.heroImage.alt} fill priority sizes="100vw" className="object-cover opacity-45" />
        <h1 className="relative px-6 max-w-[1000px] text-center text-white font-[300] text-[34px] md:text-[52px] leading-[1.1] tracking-[0.05em] uppercase [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
          {fill(c.cityHeading)}
        </h1>
      </section>
      <section className="px-6 py-20 bg-white">
        <div className="max-w-[820px] mx-auto flex flex-col gap-6">
          {c.cityBody.map((p, i) => (
            <p key={i} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">{fill(p)}</p>
          ))}
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
            {c.services.map((s) => (
              <li key={s.slug}>
                <Link href={`/commercial/${s.slug}`} className="text-[20px] font-[300] text-brand-mid underline underline-offset-4 hover:text-brand">{s.title}</Link>
              </li>
            ))}
          </ul>
          <Link href="/commercial/contact" className="self-start mt-6 bg-brand text-white text-[20px] font-[600] tracking-[0.18em] uppercase px-8 py-4 hover:bg-brand-dark transition-colors">
            {c.ctaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
