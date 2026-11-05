import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCopy } from "@/sanity/lib/copy";
import { fill, getProjects, pick, projectsIn, type Photo } from "@/sanity/lib/areas";
import { JsonLd } from "@/components/PortableBody";
import CityHero from "@/components/areas/CityHero";
import WordReveal from "@/components/areas/WordReveal";
import ServicePanels from "@/components/areas/ServicePanels";
import Topo from "@/components/areas/Topo";
import CityCta from "@/components/areas/CityCta";
import { COPY } from "@/sanity/copy/defaults";
import { SERIF, SIZE_RAIL } from "@/components/areas/fonts";

export const dynamicParams = false;
export function generateStaticParams() {
  return COPY.areas.cities.map((x) => ({ city: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = await getCopy("areas");
  const x = c.cities.find((k) => k.slug === city);
  if (!x) return {};
  const title = fill(c.cityMetaTitle, x.name), description = fill(c.cityMetaDescription, x.name);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `https://momsdesignbuild.com/service-areas/${x.slug}/` },
    openGraph: { title, description, siteName: "Mom's Design Build", locale: "en_US", type: "website" },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const [c, nav, projects] = await Promise.all([getCopy("areas"), getCopy("nav"), getProjects()]);
  const x = c.cities.find((k) => k.slug === city);
  if (!x) notFound();

  const mine = projectsIn(projects, x.name);
  const sameRegion = c.cities.filter((k) => k.region === x.region && k.slug !== x.slug);
  const nearbyProjects = projects.filter((p) => !mine.includes(p) && sameRegion.some((k) => projectsIn([p], k.name).length));
  const local = [...mine, ...nearbyProjects];

  const used = new Set<string>();
  const heroPhoto = pick(local, projects, "pool", 1, used, true)[0];
  const one = (cat: "pool" | "deck" | "living" | "interior") => pick(local, projects, cat, 1, used)[0];
  const panels = ([
    [c.poolsLabel, c.poolsText, one("pool")],
    [c.decksLabel, c.decksText, one("deck")],
    [c.livingLabel, c.livingText, one("living")],
    [c.interiorsLabel, c.interiorsText, one("interior")],
  ] as [string, string, Photo | undefined][]).filter((p): p is [string, string, Photo] => !!p[2]).map(([label, text, photo]) => ({ label, text, photo }));

  const rail = local.filter((p) => p.hero).slice(0, 8);
  const countLine = mine.length
    ? fill(c.countLine, x.name).replace("{count}", String(mine.length)).replace("{noun}", mine.length === 1 ? c.projectsOne : c.projectsMany)
    : "";
  const ld = {
    "@context": "https://schema.org", "@type": "Service", // ui-label: JSON-LD, not page words
    name: `Pool, landscape and interior design-build in ${x.name}, MN`,
    provider: { "@type": "HomeAndConstructionBusiness", name: "Mom's Design Build", url: "https://momsdesignbuild.com", telephone: nav.phone },
    areaServed: { "@type": "City", name: `${x.name}, Minnesota` },
    url: `https://momsdesignbuild.com/service-areas/${x.slug}/`,
  };

  return (
    <>
      <JsonLd raw={JSON.stringify(ld)} />
      {heroPhoto && <CityHero city={x.name} kicker={c.cityKicker} tagline={fill(c.cityTagline, x.name)} primary={c.primaryCta} secondary={c.secondaryCta} photo={heroPhoto} />}

      <section className="relative overflow-hidden bg-[#F7F5F2] px-6 py-24 lg:py-36">
        <Topo className="absolute inset-0 w-full h-full" />
        <div className="relative max-w-[1100px] mx-auto">
          <p className="text-[18px] font-semibold tracking-[0.34em] uppercase text-brand mb-8">{fill(c.introLabel, x.name)}</p>
          <WordReveal text={x.intro} className="text-[clamp(28px,4.2vw,56px)] leading-[1.18] text-ink" />
          {countLine && <p className="text-[20px] font-[300] text-muted mt-10">{countLine} <Link href="/portfolio" className="text-brand border-b border-brand/40 hover:border-brand">{c.secondaryCta}</Link></p>}
        </div>
      </section>

      {panels.length > 0 && (
        <section className="bg-white px-6 py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[clamp(32px,4.6vw,60px)] leading-tight mb-10 !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>{fill(c.panelsHeading, x.name)}</h2>
            <ServicePanels panels={panels} hint={c.panelHint} />
          </div>
        </section>
      )}

      {rail.length > 0 && (
        <section className="bg-[#F7F5F2] px-6 py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[clamp(32px,4.6vw,60px)] leading-tight mb-10 !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>{fill(c.projectsHeading, x.name)}</h2>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-4 [scrollbar-width:none]">
              {rail.map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}/`} className="group snap-start shrink-0 w-[74vw] sm:w-[40vw] lg:w-[24vw]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                    <Image src={p.hero!.url} alt={p.hero!.alt} fill sizes={SIZE_RAIL} className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
                  </div>
                  <h3 className="text-[26px] mt-4 leading-tight !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>{p.title}</h3>
                  <p className="text-[15px] tracking-[0.18em] uppercase text-muted mt-1">{p.location.replace(/,\s*mn$/i, "")}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-6 py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[20px] !font-semibold !tracking-[0.3em] uppercase !text-brand mb-6">{c.nearbyHeading}</h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {sameRegion.slice(0, 12).map((k) => (
              <li key={k.slug}><Link href={`/service-areas/${k.slug}/`} className="text-[clamp(24px,3vw,38px)] text-ink hover:text-brand transition-colors" style={{ fontFamily: SERIF }}>{k.name}</Link></li>
            ))}
            <li><Link href="/service-areas/#all" className="text-[clamp(24px,3vw,38px)] text-brand italic" style={{ fontFamily: SERIF }}>{c.moreLabel} →</Link></li>
          </ul>
        </div>
      </section>

      <CityCta heading={fill(c.ctaHeading, x.name)} body={c.ctaBody} primary={c.primaryCta} call={c.callLabel} phone={nav.phone} phoneHref={nav.phoneHref} />
    </>
  );
}
