import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/sanity/lib/copy";
import Reveal from "@/components/Reveal";
import SeasonsScene from "@/components/cm/SeasonsScene";
import HeroTop from "@/components/cm/HeroTop";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getCopy("cm");
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: "https://momsdesignbuild.com/commercial/" },
    openGraph: { title: c.metaTitle, description: c.metaDescription, siteName: "Mom's Design Build", locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

const h2 = "text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-ink text-center";

export default async function CmHome() {
  const c = await getCopy("cm");
  return (
    <>
      <section className="relative min-h-[100svh] -mt-[72px] flex items-center justify-center bg-[#222]">
        <Image src={c.heroImage.url} alt={c.heroImage.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <HeroTop />
        <div className="relative px-6 pt-32 pb-24 max-w-[1300px] text-center text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
          <p className="text-[19px] md:text-[31px] font-semibold tracking-[0.3em] uppercase text-white/85 mb-6">{c.heroKicker}</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[300] leading-[1.08] tracking-[0.08em] uppercase text-white">
            {[c.heroLine1, c.heroLine2].map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.3em]"><span className="cm-word inline-block" style={{ animationDelay: `${0.1 + (li * c.heroLine1.split(" ").length + i) * 0.07}s` }}>{w}</span></span>
                ))}
              </span>
            ))}
          </h1>
          <Link href="/contact" className="mt-10 inline-block border-2 border-brand bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-transparent hover:text-white transition-colors duration-300 [text-shadow:none]">
            {c.ctaLabel}
          </Link>
        </div>
      </section>

      <SeasonsScene videoUrl={c.seasonsVideo} mobileVideoUrl={c.seasonsVideoMobile} imageUrl={c.seasonsImage.url} statement={c.seasonsStatement} accent={c.seasonsStatementAccent} seasons={c.seasons} />

      <section className="px-6 py-20 bg-white">
        <div className="max-w-[820px] mx-auto flex flex-col gap-6">
          {c.intro.map((p, i) => (
            <p key={i} className="text-[20px] font-[300] leading-[1.8] text-brand-mid">{p}</p>
          ))}
        </div>
      </section>

      <section id="services" className="px-6 pb-24 bg-white scroll-mt-[90px]">
        <h2 className={`${h2} mb-12`}>{c.servicesHeading}</h2>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {c.services.map((s) => (
            <div key={s.slug} className="flex flex-col">
              <Link href={`/commercial/${s.slug}`} className="block overflow-hidden mb-5">
                <Reveal>
                  <Image src={s.image.url} alt={s.image.alt} width={600} height={450} sizes="(max-width: 640px) 100vw, 25vw" className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-[1.03]" />
                </Reveal>
              </Link>
              <h3 className="text-[20px] lg:text-[21px] font-[300] tracking-[0.14em] uppercase leading-snug text-ink mb-3">
                <Link href={`/commercial/${s.slug}`}>{s.title}</Link>
              </h3>
              <p className="text-[20px] font-[300] leading-relaxed text-brand-mid mb-4 flex-1">{s.summary}</p>
              <Link href={`/commercial/${s.slug}`} className="self-start text-[20px] font-semibold tracking-[0.24em] uppercase text-ink border-b border-ink/20 pb-0.5 hover:border-ink transition-colors">
                {c.learnMoreLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="properties" className="px-6 py-20 bg-brand-light scroll-mt-[90px]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className={`${h2} mb-6`}>{c.propertiesHeading}</h2>
          <p className="text-[20px] font-[300] leading-[1.8] text-brand-mid mb-10">{c.propertiesBody}</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {c.properties.map((p) => (
              <li key={p} className="border border-[#5EAD4F] text-brand-mid text-[20px] font-[300] px-5 py-2">{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-24 bg-[#3C3C3C] text-center text-white">
        <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase max-w-[900px] mx-auto !text-white">{c.closingHeading}</h2>
        <p className="mt-5 text-[20px] font-[300] text-white/80">{c.closingBody}</p>
        <Link href="/contact" className="mt-10 inline-block border-2 border-brand bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-transparent hover:text-white transition-colors duration-300">
          {c.ctaLabel}
        </Link>
      </section>
    </>
  );
}
