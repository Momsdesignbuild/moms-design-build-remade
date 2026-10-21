import { getCopy } from "@/sanity/lib/copy";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import { PAGE_JSONLD } from "./jsonld";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getCopy("services");
  return {
  title: { absolute: c.metaTitle },
  description:
    c.metaDescription,
  alternates: { canonical: "https://momsdesignbuild.com/services/" },
  openGraph: {
    title: c.metaTitle,
    description:
      c.metaDescription,
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  };
}

// mirrors live /services/ (2026-10-01): four 260×252 photos, the name under each in
// Futura uppercase, the paragraph, a square teal LEARN MORE — no page heading on live
export default async function ServicesPage() {
  const c = await getCopy("services");
  return (
    <>
      <JsonLd raw={PAGE_JSONLD} />
      <h1 className="sr-only">{c.hiddenHeading}</h1>
      <section className="px-5 pt-14 md:pt-16 pb-20 bg-white">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5">
          {c.cards.map((service) => (
            <div key={service.title} className="flex flex-col items-center">
              <Link href={service.href} className="block w-full overflow-hidden mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image.url}
                  alt={service.image.alt}
                  loading="lazy"
                  className="w-full aspect-[260/252] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
              <h2 className="font-bold [font-synthesis:weight] text-[26px] md:text-[30.6px] leading-[1.2] tracking-[1.836px] uppercase text-brand-mid text-center mb-5">
                <Link href={service.href}>{service.title}</Link>
              </h2>
              <p className="font-sans text-[18px] font-[300] leading-[1.8] text-brand-mid mb-8 flex-1 self-stretch md:px-1">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-block bg-brand text-white font-sans text-[15px] font-[600] tracking-[1px] uppercase leading-none px-[34px] py-[21px] rounded-[3px] hover:bg-brand-dark transition-colors duration-200"
              >
                {c.learnMoreLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
