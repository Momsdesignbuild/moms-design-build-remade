import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCopy } from "@/sanity/lib/copy";
import { cityThumb, getProjects, pick, projectsIn } from "@/sanity/lib/areas";
import Topo from "@/components/areas/Topo";
import { CityMarquee, MaskedHeading } from "@/components/areas/HubHero";
import CitiesIndex from "@/components/areas/CitiesIndex";
import { SERIF, SIZE_FULL } from "@/components/areas/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getCopy("areas");
  return {
    title: { absolute: c.hubMetaTitle },
    description: c.hubMetaDescription,
    alternates: { canonical: "https://momsdesignbuild.com/service-areas/" },
    openGraph: { title: c.hubMetaTitle, description: c.hubMetaDescription, siteName: "Mom's Design Build", locale: "en_US", type: "website" },
  };
}

// 7 main cities in a 4+2 / 2+4 / 3+3 / 6 mosaic
const SPANS = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3", "lg:col-span-6"];

export default async function ServiceAreasPage() {
  const [c, projects] = await Promise.all([getCopy("areas"), getProjects()]);
  const featured = c.cities.filter((x) => x.featured);
  const maskPhoto = pick([], projects, "pool", 1)[0];
  const index = c.cities.map((x) => ({
    slug: x.slug, name: x.name, region: x.region,
    count: projectsIn(projects, x.name).length,
    thumb: cityThumb(projects, x.name),
  }));
  return (
    <>
      <section className="relative overflow-hidden bg-[#F7F5F2] px-6 pt-36 lg:pt-44 pb-10">
        <Topo className="absolute inset-0 w-full h-full" />
        <div className="relative max-w-[1400px] mx-auto">
          <p className="text-[18px] font-semibold tracking-[0.34em] uppercase text-brand mb-6">{c.hubKicker}</p>
          {maskPhoto && <MaskedHeading lines={[c.hubHeadingA, c.hubHeadingB]} photo={maskPhoto.url + "?w=1800&auto=format&q=80"} />}
          <p className="text-[22px] font-[300] leading-relaxed text-muted max-w-[620px] mt-8">{c.hubIntro}</p>
        </div>
        <div className="relative mt-12"><CityMarquee names={c.cities.map((x) => x.name)} /></div>
      </section>

      <section className="bg-white px-6 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[clamp(34px,5vw,64px)] leading-tight mb-10 !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>{c.mainLabel}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
            {featured.map((x, i) => {
              const t = cityThumb(projects, x.name);
              const n = projectsIn(projects, x.name).length;
              return (
                <Link key={x.slug} href={`/service-areas/${x.slug}/`} className={`group relative overflow-hidden bg-ink text-white h-[44vh] min-h-[320px] ${SPANS[i] ?? ""}`}>
                  {t && <Image src={t.url} alt={t.alt} fill sizes={SIZE_FULL} className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-[clamp(32px,4vw,56px)] leading-none !text-white !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>{x.name}</h3>
                      {n > 0 && <p className="text-[16px] tracking-[0.18em] uppercase text-white/80 mt-2">{n} {n === 1 ? c.projectsOne : c.projectsMany}</p>}
                    </div>
                    <span aria-hidden="true" className="text-[32px] transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="all" className="relative overflow-hidden bg-[#F7F5F2] px-6 py-20 lg:py-28">
        <Topo className="absolute inset-0 w-full h-full" />
        <div className="relative max-w-[1400px] mx-auto">
          <h2 className="text-[clamp(34px,5vw,64px)] leading-tight mb-10 !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>{c.allLabel}</h2>
          <CitiesIndex cities={index} regions={c.regions} allRegions={c.allRegions} placeholder={c.searchPlaceholder} noMatch={c.noMatch} one={c.projectsOne} many={c.projectsMany} />
        </div>
      </section>
    </>
  );
}
