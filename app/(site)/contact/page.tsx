import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import BuilderTrendForm from "@/components/BuilderTrendForm";
import { PAGE_JSONLD } from "./jsonld";

export const metadata: Metadata = {
  title: { absolute: "Contact Mom's Design Build - Landscape & Interior Design" },
  description:
    "Mom's Design Build offers custom luxury landscaping, remodeling & gardening services to the Twin Cities, MN and surrounding areas. Let's chat!",
  alternates: { canonical: "https://momsdesignbuild.com/contact/" },
  openGraph: {
    title: "Contact Mom's Design Build - Landscape & Interior Design",
    description:
      "Mom's Design Build offers custom luxury landscaping, remodeling & gardening services to the Twin Cities, MN and surrounding areas. Let's chat!",
    url: "https://momsdesignbuild.com/contact/",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd raw={PAGE_JSONLD} />

      {/* ── Page Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">
          Let&rsquo;s Talk
        </h1>
        <p className="mt-4 text-[20px] font-[300] leading-relaxed text-muted max-w-md mx-auto">
          Ready to start your project? We&apos;d love to hear from you.
        </p>
        {/* verbatim from their live contact page */}
        <p className="mt-3 text-[20px] font-[300] leading-relaxed text-muted max-w-lg mx-auto">
          Help us build a better tomorrow by joining our team today! A variety of full-time and
          part-time positions are available!{" "}
          <Link href="/careers" className="underline underline-offset-4 decoration-brand/40 hover:decoration-brand text-ink transition-colors">
            Careers at Mom&rsquo;s
          </Link>
        </p>
      </section>

      {/* ── Contact Layout ── */}
      <section className="px-6 pb-20 bg-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-[14px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">
              Get in Touch
            </h2>

            <address className="not-italic space-y-6 text-[20px] font-[300] leading-relaxed text-muted">
              <div>
                <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  Address
                </p>
                <a
                  href="https://www.google.com/maps/search/12275+Weckman+Road+Shakopee+MN+55379"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors"
                >
                  12275 Weckman Road
                  <br />
                  Shakopee, MN 55379
                </a>
              </div>

              <div>
                <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  Phone
                </p>
                <a href="tel:+19522776667" className="hover:text-brand transition-colors">
                  952.277.6667
                </a>
              </div>

              <div>
                <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  Email
                </p>
                <a
                  href="mailto:hello@momsdesignbuild.com"
                  className="hover:text-brand transition-colors"
                >
                  hello@momsdesignbuild.com
                </a>
              </div>
            </address>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                {[
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/momsdesignbuild/",
                  },
                  {
                    label: "Facebook",
                    href: "http://www.facebook.com/momsdesignbuild",
                  },
                  {
                    label: "Houzz",
                    href: "http://www.houzz.com/pro/momsdesignbuild",
                  },
                  {
                    label: "Pinterest",
                    href: "https://www.pinterest.com/momsdesignbuild/",
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/momsdesignbuild",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-[400] tracking-[0.08em] uppercase text-muted hover:text-brand transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form — the SAME BuilderTrend lead form their live site
              embeds (builderID 19370). Submissions become "BuilderTrend new
              leads" emails to Cherilyn, which feed the intake automation +
              QuickBooks pipeline. Do NOT replace with a generic form. */}
          <div>
            <h2 className="text-[14px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">
              Send a Message
            </h2>
            <BuilderTrendForm />
          </div>
        </div>
      </section>
    </>
  );
}
