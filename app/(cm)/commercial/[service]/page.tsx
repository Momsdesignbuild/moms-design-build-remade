import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCopy } from "@/sanity/lib/copy";
import { COPY } from "@/sanity/copy/defaults";

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
  const title = `${s.title} for Twin Cities Commercial Properties - Mom's Commercial Maintenance`;
  return {
    title: { absolute: title },
    description: s.summary,
    alternates: { canonical: `https://momsdesignbuild.com/commercial/${s.slug}/` },
    openGraph: { title, description: s.summary, siteName: c.heroHeading, locale: "en_US", type: "article", images: [{ url: s.image.url }] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CmServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { c, s } = await find((await params).service);
  if (!s) notFound();
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center bg-[#222]">
        <Image src={s.image.url} alt={s.image.alt} fill priority sizes="100vw" className="object-cover opacity-45" />
        <h1 className="relative px-6 text-center text-white font-bold [font-synthesis:weight] text-[36px] md:text-[56px] leading-[1.1] tracking-[0.05em] uppercase [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
          {s.title}
        </h1>
      </section>
      <section className="px-6 py-20 bg-white">
        <div className="max-w-[820px] mx-auto flex flex-col gap-6">
          {s.body.map((p, i) => (
            <p key={i} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">{p}</p>
          ))}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact" className="bg-[#5EAD4F] text-white text-[20px] font-[600] tracking-[0.18em] uppercase px-8 py-4 hover:bg-[#4d9340] transition-colors">
              {c.ctaLabel}
            </Link>
            <Link href="/commercial#services" className="border border-[#5EAD4F] text-brand-mid text-[20px] font-[600] tracking-[0.12em] uppercase px-8 py-4 hover:bg-gray-50 transition-colors">
              {c.servicesHeading}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
