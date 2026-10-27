import type { Metadata } from "next";
import Link from "next/link";
import BuilderTrendForm from "@/components/BuilderTrendForm";
import { getCopy } from "@/sanity/lib/copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getCopy("cm");
  return {
    title: { absolute: c.contactMetaTitle },
    description: c.contactMetaDescription,
    alternates: { canonical: "https://momsdesignbuild.com/commercial/contact/" },
    openGraph: { title: c.contactMetaTitle, description: c.contactMetaDescription, siteName: c.heroHeading, locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

// CM's own contact page: its words, the company address and phone, and the same
// BuilderTrend lead form the residential contact page uses, so leads reach the same inbox.
export default async function CmContact() {
  const [c, labels, nav] = await Promise.all([getCopy("cm"), getCopy("contact"), getCopy("nav")]);
  const label = "text-[20px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5";
  return (
    <>
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[34px] md:text-[44px] font-[300] tracking-[0.12em] uppercase text-ink">{c.contactHeading}</h1>
        <p className="mt-4 text-[20px] font-[300] leading-relaxed text-muted max-w-md mx-auto">{c.contactSubline}</p>
      </section>
      <section className="px-6 pb-20 bg-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-[20px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">{labels.infoHeading}</h2>
            <address className="not-italic space-y-6 text-[20px] font-[300] leading-relaxed text-muted">
              <div>
                <p className={label}>{labels.addressLabel}</p>
                <a href={nav.addressLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
                  {nav.addressLines.map((line, i) => (
                    <span key={i}>{i > 0 && <br />}{line}</span>
                  ))}
                </a>
              </div>
              <div>
                <p className={label}>{labels.phoneLabel}</p>
                <a href={nav.phoneHref} className="hover:text-brand transition-colors">{nav.phone}</a>
              </div>
              <div>
                <p className={label}>{labels.emailLabel}</p>
                <a href={`mailto:${nav.email}`} className="hover:text-brand transition-colors">{nav.email}</a>
              </div>
            </address>
            <p className="mt-10 pt-8 border-t border-gray-100 text-[20px] font-[300] text-muted">
              <Link href="/commercial#services" className="underline underline-offset-4 hover:text-brand">{c.servicesHeading}</Link>
            </p>
          </div>
          <div>
            <h2 className="text-[20px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">{labels.formHeading}</h2>
            <BuilderTrendForm />
          </div>
        </div>
      </section>
    </>
  );
}
