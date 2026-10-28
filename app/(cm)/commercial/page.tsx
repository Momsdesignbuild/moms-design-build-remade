import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/sanity/lib/copy";
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
          <Link href="/commercial/contact" className="mt-10 inline-block border-2 border-brand bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-transparent hover:text-white transition-colors duration-300 [text-shadow:none]">
            {c.ctaLabel}
          </Link>
        </div>
      </section>

      <SeasonsScene videoUrl={c.seasonsVideo} mobileVideoUrl={c.seasonsVideoMobile} imageUrl={c.seasonsImage.url} statement={c.seasonsStatement} accent={c.seasonsStatementAccent} seasons={c.seasons} />

      <section className="px-6 py-24 md:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-20 items-start">
          <div className="border-l-4 border-brand pl-6 md:pl-8">
            <p className="text-[26px] md:text-[38px] font-[300] leading-[1.3] text-ink">{c.intro[0]}</p>
          </div>
          <div className="flex flex-col gap-6">
            {c.intro.slice(1).map((p, i) => (
              <p key={i} className="text-[19px] md:text-[20px] font-[400] leading-[1.8] text-[#3C3C3C]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-4 md:px-8 py-20 md:py-28 bg-brand-light scroll-mt-[90px]">
        <h2 className={`${h2} mb-3`}>{c.servicesHeading}</h2>
        <div className="w-16 h-1 bg-brand mx-auto mb-12 md:mb-16" />
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 lg:auto-rows-[300px] gap-3 lg:gap-4">
          {c.services.map((s, i) => {
            const feature = i === 0;
            const wide = i >= c.services.length - 2;
            const span = feature ? "col-span-2 aspect-[16/10] lg:aspect-auto lg:row-span-2" : `aspect-[4/5] lg:aspect-auto ${wide ? "lg:col-span-2" : ""}`;
            return (
              <Link key={s.slug} href={`/commercial/${s.slug}`} className={`group relative block overflow-hidden bg-[#222] ${span}`}>
                <Image src={s.image.url} alt={s.image.alt} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                  <h3 className={`font-[400] tracking-[0.14em] uppercase leading-snug !text-white ${feature ? "text-[22px] md:text-[28px]" : "text-[15px] md:text-[19px]"}`}>{s.title}</h3>
                  <p className={`mt-2 text-[17px] font-[300] leading-relaxed text-white/90 max-w-[40ch] ${feature ? "hidden md:block" : "hidden lg:block lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:transition-all lg:duration-300 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100"}`}>{s.summary}</p>
                  <span className="mt-3 inline-block text-[13px] md:text-[14px] font-semibold tracking-[0.24em] uppercase text-brand border-b border-brand/40 pb-0.5 group-hover:border-brand transition-colors">{c.learnMoreLabel} →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="properties" className="relative px-5 md:px-8 py-24 md:py-32 scroll-mt-[90px] text-white overflow-hidden">
        <Image src={c.seasonsImage.url} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#1F2A2E]/90" />
        <div className="relative max-w-[1000px] mx-auto text-center">
          <h2 className={`${h2} mb-6 !text-white`}>{c.propertiesHeading}</h2>
          <div className="w-16 h-1 bg-brand mx-auto mb-8" />
          <p className="text-[20px] font-[300] leading-[1.8] text-white/85 max-w-[820px] mx-auto mb-10">{c.propertiesBody}</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {c.properties.map((p) => (
              <li key={p} className="bg-white/10 border border-white/25 text-white text-[18px] font-[400] px-6 py-3">{p}</li>
            ))}
          </ul>
          <div className="w-24 h-px bg-white/30 mx-auto my-12" />
          <ul className="flex flex-wrap justify-center gap-2.5">
            {c.cities.map((x) => (
              <li key={x.slug}>
                <Link href={`/commercial/service-areas/${x.slug}`} className="block rounded-full border border-white/35 px-4 py-2 text-[16px] text-white/90 hover:bg-brand hover:border-brand hover:text-white transition-colors">{x.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {c.homeSections.map((sec, i) =>
        i === 0 && sec.image ? (
          <section key={sec.heading} className="relative text-white overflow-hidden">
            <div className="relative min-h-[560px] md:min-h-[680px] flex items-center">
              <Image src={sec.image.url} alt={sec.image.alt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
              <div className="relative max-w-[1200px] w-full mx-auto px-6 md:px-10 py-20">
                <div className="max-w-[560px] flex flex-col gap-6">
                  <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-[300] leading-[1.1] tracking-[0.06em] uppercase !text-white">{sec.heading}</h2>
                  <div className="w-14 h-1 bg-brand" />
                  {sec.body.map((p, j) => (
                    <p key={j} className="text-[19px] md:text-[20px] font-[300] leading-[1.8] text-white/90">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section key={sec.heading} className={`px-6 py-20 md:py-28 ${i % 2 ? "bg-brand-light" : "bg-white"}`}>
            <div className={`mx-auto grid gap-10 md:gap-16 items-center ${sec.image ? "max-w-[1200px] md:grid-cols-2" : "max-w-[820px]"}`}>
              {sec.image && (
                <div className={i % 2 === 0 ? "md:order-2" : ""}>
                  <Image src={sec.image.url} alt={sec.image.alt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 600px" className="w-full aspect-[4/3] object-cover shadow-[0_12px_40px_rgba(0,0,0,0.15)]" />
                </div>
              )}
              <div className="flex flex-col gap-6">
                <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-[300] leading-[1.15] tracking-[0.06em] uppercase text-ink">{sec.heading}</h2>
                <div className="w-14 h-1 bg-brand" />
                {sec.body.map((p, j) => (
                  <p key={j} className="text-[19px] md:text-[20px] font-[400] leading-[1.8] text-[#3C3C3C]">{p}</p>
                ))}
              </div>
            </div>
          </section>
        ),
      )}

      <section className="px-6 py-24 bg-[#3C3C3C] text-center text-white">
        <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase max-w-[900px] mx-auto !text-white">{c.closingHeading}</h2>
        <p className="mt-5 text-[20px] font-[300] text-white/80">{c.closingBody}</p>
        <Link href="/commercial/contact" className="mt-10 inline-block border-2 border-brand bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-transparent hover:text-white transition-colors duration-300">
          {c.ctaLabel}
        </Link>
      </section>
    </>
  );
}
