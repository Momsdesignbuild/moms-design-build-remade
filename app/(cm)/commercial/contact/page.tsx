import type { Metadata } from "next";
import Link from "next/link";
import BuilderTrendForm from "@/components/BuilderTrendForm";
import { getCopy } from "@/sanity/lib/copy";
import { PageHero, Rows } from "@/components/cm/CmParts";

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
  const label = "text-[14px] font-[600] tracking-[0.2em] uppercase text-brand mb-1.5";
  const link = "text-white hover:text-brand transition-colors";
  return (
    <>
      <PageHero image={c.heroImage} title={c.contactHeading} cta={false} />
      <section className="px-6 py-14 md:py-20 bg-white text-center">
        <p className="text-[22px] md:text-[28px] font-[300] leading-relaxed text-ink max-w-3xl mx-auto">{c.contactSubline}</p>
      </section>
      <section className="px-6 pb-20 md:pb-28 bg-white">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.35fr] gap-8 md:gap-12 items-start">
          <div className="bg-[#2B3A3F] text-white p-8 md:p-10 md:sticky md:top-28">
            <h2 className="text-[20px] font-[300] tracking-[0.2em] uppercase !text-white mb-8">{labels.infoHeading}</h2>
            <address className="not-italic space-y-7 text-[20px] font-[300] leading-relaxed text-white/90">
              <div>
                <p className={label}>{labels.addressLabel}</p>
                <a href={nav.addressLink} target="_blank" rel="noopener noreferrer" className={link}>
                  {nav.addressLines.map((line, i) => (
                    <span key={i}>{i > 0 && <br />}{line}</span>
                  ))}
                </a>
              </div>
              <div>
                <p className={label}>{labels.phoneLabel}</p>
                <a href={nav.phoneHref} className={link}>{nav.phone}</a>
              </div>
              <div>
                <p className={label}>{labels.emailLabel}</p>
                <a href={`mailto:${nav.email}`} className={link}>{nav.email}</a>
              </div>
            </address>
            <p className="mt-10 pt-8 border-t border-white/20 text-[18px] font-[300]">
              <Link href="/commercial#services" className="text-white underline underline-offset-4 hover:text-brand">{c.servicesHeading}</Link>
            </p>
          </div>
          <div className="bg-white p-6 md:p-10 border-t-4 border-brand shadow-[0_10px_44px_rgba(0,0,0,0.12)]">
            <h2 className="text-[20px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">{labels.formHeading}</h2>
            <BuilderTrendForm />
          </div>
        </div>
      </section>
      <Rows sections={c.contactSections} offset={1} />
    </>
  );
}
