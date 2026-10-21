import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import { PROCESS_JSONLD } from "./jsonld";
import { getCopy } from "@/sanity/lib/copy";

// og:image = the exact 768x512 crop WP serves, same bytes, from Sanity
const OG_IMAGE =
  "https://cdn.sanity.io/images/wavk40jo/production/126b88b9f5bf35c72b00dbef22b8802f6ee9ec5c-768x512.jpg";
export const metadata: Metadata = {
  title: { absolute: "Home & Landscape Design Process - Mom's Design Build Company" },
  description:
    "Mom's Design Build is with you throughout the whole design build process from consultation to a tour of your new space. Let's make your project a reality.",
  alternates: { canonical: "https://momsdesignbuild.com/process/" },
  openGraph: {
    title: "Home & Landscape Design Process - Mom's Design Build Company",
    description:
      "Mom's Design Build is with you throughout the whole design build process from consultation to a tour of your new space. Let's make your project a reality.",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
    images: [{ url: OG_IMAGE, width: 768, height: 512, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default async function ProcessPage() {
  const c = await getCopy("process");
  return (
    <>
      <JsonLd raw={PROCESS_JSONLD} />

      {/* ── Header ── */}
      <section className="pt-20 md:pt-28 pb-14 md:pb-16 px-6 text-center bg-[#F7F5F2]">
        <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-5">{c.eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-[300] tracking-[0.08em] uppercase text-ink mb-6">
          {c.heading}
        </h1>
        <p className="text-[20px] md:text-[20px] font-[300] tracking-[0.06em] text-brand-mid max-w-md mx-auto">
          {c.subline}
        </p>
      </section>

      {/* ── Steps: numbered, photo alternates sides; small WP sources never upscaled ── */}
      <section className="px-6 pb-16 pt-6 bg-white">
        <div className="max-w-[1060px] mx-auto flex flex-col">
          {c.steps.map((step, i) => (
            <div
              key={step.title}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-14"
            >
              <div className={step.photo && i % 2 === 1 ? "md:order-2" : ""}>
                <p className="text-[20px] font-semibold tracking-[0.26em] uppercase text-brand mb-3">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-[22px] md:text-[26px] font-[300] tracking-[0.1em] uppercase text-brand mb-5">
                  {step.title}
                </h2>
                <div className="space-y-4">
                  {step.paras.map((p, j) => (
                    <p key={j} className="text-[20px] md:text-[20px] font-[300] leading-[1.8] text-brand-mid">
                      {p}
                    </p>
                  ))}
                </div>
                {step.warrantyButtons && (
                  <div className="flex flex-wrap gap-4 mt-8">
                    <a
                      href={c.warrantyUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-block bg-ink border border-ink text-white text-[20px] font-[600] tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-white hover:text-ink transition-colors duration-300"
                    >
                      {c.warrantyLabel}
                    </a>
                    <a
                      href={c.guidelinesUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-block border border-ink text-ink text-[20px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
                    >
                      {c.guidelinesLabel}
                    </a>
                  </div>
                )}
              </div>
              {step.photo && (
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  {/* uniform frame for every step, whatever the source size (Summer, 7/14) */}
                  <div className="bg-white p-3 shadow-[0_30px_60px_-32px_rgba(28,28,26,0.35)] w-full max-w-[520px]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={step.photo.url}
                        alt={step.photo.alt}
                        fill
                        priority={i === 0}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 520px"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F7F5F2] py-20 lg:py-24 px-6 text-center">
        <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">{c.ctaEyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-[300] tracking-[0.08em] uppercase text-brand mb-5">
          {c.ctaHeading}
        </h2>
        <p className="text-[20px] font-[300] tracking-[0.06em] text-brand-mid mb-9 max-w-md mx-auto">
          {c.ctaText}
        </p>
        <Link
          href={c.ctaHref}
          className="inline-block border border-ink text-ink text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-ink hover:text-white transition-colors duration-300"
        >
          {c.ctaLabel}
        </Link>
      </section>
    </>
  );
}
