import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import BuilderTrendForm from "@/components/BuilderTrendForm";
import { PAGE_JSONLD } from "./jsonld";
import { getCopy } from "@/sanity/lib/copy";
import { socialIcon } from "@/components/SocialIcon";

export const metadata: Metadata = {
  title: { absolute: "Contact Mom's Design Build - Landscape & Interior Design" },
  description:
    "Mom's Design Build offers custom luxury landscaping, remodeling & gardening services to the Twin Cities, MN and surrounding areas. Let's chat!",
  alternates: { canonical: "https://momsdesignbuild.com/contact/" },
  openGraph: {
    title: "Contact Mom's Design Build - Landscape & Interior Design",
    description:
      "Mom's Design Build offers custom luxury landscaping, remodeling & gardening services to the Twin Cities, MN and surrounding areas. Let's chat!",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default async function ContactPage() {
  const [c, nav] = await Promise.all([getCopy("contact"), getCopy("nav")]);
  return (
    <>
      <JsonLd raw={PAGE_JSONLD} />

      {/* ── Page Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[34px] md:text-[44px] font-[700] tracking-[0.25em] uppercase text-ink">
          {c.heading}
        </h1>
        <p className="mt-4 text-[20px] font-[300] leading-relaxed text-muted max-w-md mx-auto">
          {c.subline}
        </p>
      </section>

      {/* ── Contact Layout ── */}
      <section className="px-6 pb-20 bg-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-[20px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">
              {c.infoHeading}
            </h2>

            <address className="not-italic space-y-6 text-[20px] font-[300] leading-relaxed text-muted">
              <div>
                <p className="text-[20px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  {c.addressLabel}
                </p>
                <a
                  href={nav.addressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors"
                >
                  {nav.addressLines.map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </a>
              </div>

              <div>
                <p className="text-[20px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  {c.phoneLabel}
                </p>
                <a href={nav.phoneHref} className="hover:text-brand transition-colors">
                  {nav.phone}
                </a>
              </div>

              <div>
                <p className="text-[20px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  {c.emailLabel}
                </p>
                <a
                  href={`mailto:${nav.email}`}
                  className="hover:text-brand transition-colors"
                >
                  {nav.email}
                </a>
              </div>
            </address>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex gap-5">
                {nav.socials.map(({ label, href }) => {
                  const Icon = socialIcon(label);
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-ink hover:text-brand transition-colors"
                    >
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form — the SAME BuilderTrend lead form their live site
              embeds (builderID 19370). Submissions become "BuilderTrend new
              leads" emails to Cherilyn, which feed the intake automation +
              QuickBooks pipeline. Do NOT replace with a generic form. */}
          <div>
            <h2 className="text-[20px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">
              {c.formHeading}
            </h2>
            <BuilderTrendForm />
          </div>
        </div>

        {/* verbatim ask from their live contact page — moved below the form
            to match their layout (Josh, 8/17) */}
        <div className="max-w-[1000px] mx-auto mt-16 pt-16 border-t border-gray-100 text-center">
          <h2 className="text-[22px] md:text-[28px] font-[300] tracking-[0.2em] uppercase text-ink">
            {c.careerHeading}
          </h2>
          <p className="mt-4 text-[20px] font-[300] leading-relaxed text-muted max-w-lg mx-auto">
            {c.careerText}
          </p>
          <Link
            href={c.careerHref}
            className="inline-block mt-8 border border-ink text-ink text-[20px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
          >
            {c.careerLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
