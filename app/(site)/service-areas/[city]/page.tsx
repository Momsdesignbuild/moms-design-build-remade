import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCopy } from "@/sanity/lib/copy";
import { fill, fillAll, getProjects, namesWhere, pick, projectsIn, type Cat, type Photo } from "@/sanity/lib/areas";
import { JsonLd } from "@/components/PortableBody";
import CityHero, { type HeroSlide } from "@/components/areas/CityHero";
import AwardsStrip from "@/components/remastered/AwardsStrip";
import WordReveal from "@/components/areas/WordReveal";
import TransformationSlider from "@/components/remastered/TransformationSlider";
import Anatomy from "@/components/remastered/Anatomy";
import { getHomeContent } from "@/sanity/lib/homePage";
import ServiceSpreads from "@/components/areas/ServiceSpreads";
import Topo from "@/components/areas/Topo";
import CityCta from "@/components/areas/CityCta";
import { COPY } from "@/sanity/copy/defaults";
import { SERIF, SIZE_RAIL } from "@/components/areas/fonts";

// the 20 cities that also have a landscape design-build page under /services/landscape-architecture/
const DESIGN_BUILD_PAGES = new Set(["chanhassen", "chaska", "deephaven", "eden-prairie", "edina", "excelsior", "lake-minnetonka-area", "long-lake", "maple-grove", "medicine-lake", "minnetonka", "minnetrista", "mound", "orono", "prior-lake", "shorewood", "tonka-bay", "victoria", "wayzata", "woodland"]);
const SERVICE_HREFS = ["/services/landscape-architecture/pools/", "/services/landscape-architecture/", "/services/landscape-architecture/custom-decks/", "/services/landscape-architecture/outdoor-kitchens/", "/services/interior-design-and-remodeling/", "/services/landscape-architecture/kitchen-interior-remodeling/"];
const POOL_RE = /pool/i, DECK_RE = /deck|patio|terrace/i, KITCHEN_RE = /outdoor kitchen|grill|fireplace|fire pit|fire bowl|pergola/i, INTERIOR_RE = /interior|bathroom|powder room|vanity|basement|living room|bedroom/i;

export const dynamicParams = false;
export function generateStaticParams() {
  return COPY.areas.cities.map((x) => ({ city: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const [c, projects] = await Promise.all([getCopy("areas"), getProjects()]);
  const x = c.cities.find((k) => k.slug === city);
  if (!x) return {};
  const here = projectsIn(projects, x.name);
  const full = fill(c.cityMetaTitle, x.name);
  const title = full.length > 65 ? fill(c.cityMetaTitleShort, x.name) : full;
  const description = here.length
    ? fill(c.cityMetaDescriptionLocal, x.name).replace("{count}", String(here.length)).replace("{noun}", here.length === 1 ? c.projectsOne : c.projectsMany).replace("{title}", here[0].title)
    : fill(c.cityMetaDescription, x.name);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `https://momsdesignbuild.com/service-areas/${x.slug}/` },
    openGraph: { title, description, siteName: "Mom's Design Build", locale: "en_US", type: "website" },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const [c, nav, projects, home] = await Promise.all([getCopy("areas"), getCopy("nav"), getProjects(), getHomeContent()]);
  const x = c.cities.find((k) => k.slug === city);
  if (!x) notFound();

  const mine = projectsIn(projects, x.name);
  const sameRegion = c.cities.filter((k) => k.region === x.region && k.slug !== x.slug);
  const nearbyProjects = projects.filter((p) => !mine.includes(p) && sameRegion.some((k) => projectsIn([p], k.name).length));
  const local = [...mine, ...nearbyProjects];

  const used = new Set<string>();
  const heroPhoto = pick(local, projects, "pool", 1, used, true, 2000)[0];
  const slides: HeroSlide[] = local.filter((p) => p.hero && p.hero.w >= 1800 && p.hero.w >= p.hero.h * 1.3).slice(0, 3).map((p) => ({ photo: p.hero!, title: p.title, place: p.location.replace(/,\s*mn$/i, ""), href: `/portfolio/${p.slug}/` }));
  if (heroPhoto && !slides.some((sl) => sl.photo.url === heroPhoto.url)) slides.unshift({ photo: heroPhoto });
  const rail = local.filter((p) => p.hero).slice(0, 8);
  const countLine = mine.length
    ? fill(c.countLine, x.name).replace("{count}", String(mine.length)).replace("{noun}", mine.length === 1 ? c.projectsOne : c.projectsMany)
    : "";
  const namesNear = sameRegion.slice(0, 3).map((k) => k.name);
  const near = namesNear.length > 1 ? `${namesNear.slice(0, -1).join(", ")} and ${namesNear[namesNear.length - 1]}` : namesNear[0] ?? "";
  const work = mine.length
    ? `We have completed ${mine.length} ${mine.length === 1 ? c.projectsOne : c.projectsMany} in ${x.name}, including ${mine[0].title}.`
    : `We serve ${x.name} and design for the lots and homes we find there.`;
  const tok = { city: x.name, region: x.region, near, work };
  const note = (tpl: string, re: RegExp) => { const names = namesWhere(local, re); return names ? fill(tpl, x.name).replace("{names}", names) : ""; };
  const notes = [note(c.poolNote, POOL_RE), null, note(c.deckNote, DECK_RE), note(c.kitchenNote, KITCHEN_RE), note(c.interiorNote, INTERIOR_RE), null];
  const spreadCats: Cat[] = ["pool", "landscape", "deck", "living", "interior", "kitchen"];
  const spreads = c.serviceBlocks.map((b, i) => ({ title: fillAll(b.title, tok), text: `${fillAll(b.text, tok)}${notes[i] ? ` ${notes[i]}` : ""}`, photos: pick(local, projects, spreadCats[i] ?? "landscape", 3, used, false, 1200), href: SERVICE_HREFS[i], linkLabel: c.serviceLinks[i] }));
  const nearTitles = nearbyProjects.slice(0, 4).map((p) => p.title);
  const listNames = (t: string[]) => (t.length > 1 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : t[0] ?? "");
  const builtLine = mine.length
    ? fill(c.projectsLineLocal, x.name).replace("{count}", String(mine.length)).replace("{noun}", mine.length === 1 ? c.projectsOne : c.projectsMany).replace("{names}", listNames(mine.slice(0, 4).map((p) => p.title)))
    : nearTitles.length ? fill(c.projectsLineNear, x.name).replace("{names}", listNames(nearTitles)) : "";
  const faqs = [...(builtLine ? [{ q: c.projectsFaqQ, a: builtLine }] : []), ...c.faqs];
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: fillAll(f.q, tok), acceptedAnswer: { "@type": "Answer", text: fillAll(f.a, tok) } })) }; // ui-label: JSON-LD, not page words
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://momsdesignbuild.com/" }, { "@type": "ListItem", position: 2, name: c.hubKicker, item: "https://momsdesignbuild.com/service-areas/" }, { "@type": "ListItem", position: 3, name: x.name, item: `https://momsdesignbuild.com/service-areas/${x.slug}/` }] };
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
      <JsonLd raw={JSON.stringify(faqLd)} />
      <JsonLd raw={JSON.stringify(crumbs)} />
      {slides.length > 0 && <CityHero city={x.name} kicker={c.cityKicker} tagline={fill(c.cityTagline, x.name)} facts={[c.heroFactSince, c.heroFactAwards, mine.length ? fill(c.heroFactLocal, x.name).replace("{count}", String(mine.length)).replace("{noun}", mine.length === 1 ? c.projectsOne : c.projectsMany) : fill(c.heroFactNear, x.name)]} primary={c.primaryCta} secondary={c.secondaryCta} slides={slides} tail={c.heroH1Tail} />}
      <div className="bg-[#F7F5F2] pt-16 lg:pt-20"><AwardsStrip content={home.awards} /></div>

      <section className="relative overflow-hidden bg-[#F7F5F2] px-6 py-24 lg:py-36">
        <Topo className="absolute inset-0 w-full h-full" />
        <div className="relative max-w-[1100px] mx-auto">
          <p className="text-[18px] font-semibold tracking-[0.34em] uppercase text-brand mb-8">{fill(c.introLabel, x.name)}</p>
          <WordReveal text={x.intro} className="text-[clamp(28px,4.2vw,56px)] leading-[1.18] text-ink" />
          {countLine && <p className="text-[20px] font-[300] text-muted mt-10">{countLine} <Link href="/portfolio" className="text-brand border-b border-brand/40 hover:border-brand">{c.secondaryCta}</Link></p>}
        </div>
      </section>


      <ServiceSpreads
        heading={fill(c.servicesKicker, x.name)}
        spreads={spreads}
        foot={DESIGN_BUILD_PAGES.has(x.slug) ? <p className="text-[20px] font-[300] text-muted">{c.designBuildLead} <Link href={`/services/landscape-architecture/${x.slug}/`} className="text-brand border-b border-brand/40 hover:border-brand">{fill(c.designBuildLink, x.name)}</Link></p> : undefined}
      />

      <TransformationSlider content={home.transformation} />
      <Anatomy content={home.anatomy} />

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


      <section className="relative overflow-hidden bg-[#F7F5F2] px-6 py-20 lg:py-28">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[clamp(32px,4.6vw,60px)] leading-tight mb-10 !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>{fill(c.faqHeading, x.name)}</h2>
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-ink/15 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[22px] lg:text-[26px] leading-snug text-ink" style={{ fontFamily: SERIF }}>
                  {fillAll(f.q, tok)}
                  <span aria-hidden="true" className="text-brand text-[30px] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-[19px] font-[300] leading-relaxed text-muted max-w-[760px]">{fillAll(f.a, tok)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

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
