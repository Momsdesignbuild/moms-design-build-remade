import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/sanity/lib/copy";

// Shared pieces for the Commercial Maintenance pages. Layout and imagery only: every visitor-facing
// word is passed in from the Sanity text, so the words check has nothing new to flag.

type Img = { url: string; alt: string };
type Section = { heading: string; image?: Img | null; body: string[] };
type Service = { slug: string; title: string; summary: string; image: Img };
type City = { slug: string; name: string };
type Fill = (t: string) => string;
const same: Fill = (t) => t;

export const h2 = "text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-ink text-center";
const body = "text-[19px] md:text-[20px] font-[400] leading-[1.8] text-[#3c3c3c]";
const card = "shadow-[0_2px_14px_rgba(0,0,0,0.06)]";

export async function PageHero({ image, title, cta = true }: { image: Img; title: string; cta?: boolean }) {
  const [c, nav] = cta ? await Promise.all([getCopy("cm"), getCopy("nav")]) : [null, null];
  return (
    <section className="relative min-h-[340px] md:min-h-[480px] flex items-end bg-[#222] overflow-hidden">
      <Image src={image.url} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-10 pt-14 pb-12 md:pt-20 md:pb-16">
        <h1 className="max-w-[900px] font-[300] text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] tracking-[0.05em] uppercase !text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">{title}</h1>
        <div className="mt-6 w-16 h-1 bg-brand" />
        {c && nav && (
          <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
            <Link href="/commercial/contact" className="bg-brand text-white text-[17px] md:text-[20px] font-[600] tracking-[0.18em] uppercase whitespace-nowrap px-7 py-3.5 hover:bg-brand-dark transition-colors">{c.ctaLabel}</Link>
            <a href={nav.phoneHref} className="hidden sm:inline-block border-2 border-white/80 text-white text-[17px] md:text-[20px] font-[600] tracking-[0.12em] whitespace-nowrap px-6 py-3 hover:bg-white hover:!text-ink transition-colors">{nav.phone}</a>
          </div>
        )}
      </div>
    </section>
  );
}

/** First paragraph as a large pull-quote with a teal bar, the rest in a column beside it. */
export function Intro({ paras, fill = same }: { paras: string[]; fill?: Fill }) {
  const [lead, ...rest] = paras;
  if (!lead) return null;
  const long = lead.length > 260;
  return (
    <section className="px-6 py-20 md:py-28 bg-white">
      <div className={`max-w-[1100px] mx-auto grid gap-10 md:gap-20 items-start ${rest.length ? "md:grid-cols-[1fr_1.15fr]" : ""}`}>
        <div className="border-l-4 border-brand pl-6 md:pl-8">
          <p className={`font-[300] leading-[1.35] text-ink ${long ? "text-[22px] md:text-[26px]" : "text-[24px] md:text-[34px]"}`}>{fill(lead)}</p>
        </div>
        {rest.length > 0 && (
          <div className="flex flex-col gap-6">
            {rest.map((p, i) => (
              <p key={i} className={body}>{fill(p)}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Heading sections as alternating image/text rows; the first can be a full-width photo with the text over it. */
export function Rows({ sections, fill = same, cinematicFirst = false, offset = 0 }: { sections: Section[]; fill?: Fill; cinematicFirst?: boolean; offset?: number }) {
  return (
    <>
      {sections.map((sec, i) =>
        i === 0 && cinematicFirst && sec.image ? (
          <section key={sec.heading} className="relative text-white overflow-hidden">
            <div className="relative min-h-[520px] md:min-h-[640px] flex items-center">
              <Image src={sec.image.url} alt={sec.image.alt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
              <div className="relative max-w-[1200px] w-full mx-auto px-6 md:px-10 py-20">
                <div className="max-w-[560px] flex flex-col gap-6">
                  <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-[300] leading-[1.1] tracking-[0.06em] uppercase !text-white">{fill(sec.heading)}</h2>
                  <div className="w-14 h-1 bg-brand" />
                  {sec.body.map((p, j) => (
                    <p key={j} className="text-[19px] md:text-[20px] font-[300] leading-[1.8] text-white/90">{fill(p)}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section key={sec.heading} className={`px-6 py-20 md:py-28 ${(i + offset) % 2 ? "bg-brand-light" : "bg-white"}`}>
            <div className={`mx-auto grid gap-10 md:gap-16 items-center ${sec.image ? "max-w-[1200px] md:grid-cols-2" : "max-w-[820px]"}`}>
              {sec.image && (
                <div className={(i + offset) % 2 === 0 ? "md:order-2" : ""}>
                  <Image src={sec.image.url} alt={sec.image.alt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 600px" className="w-full aspect-[4/3] object-cover shadow-[0_12px_40px_rgba(0,0,0,0.15)]" /> {/* ui-label: image size hint, not visitor text */}
                </div>
              )}
              <div className="flex flex-col gap-6">
                <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-[300] leading-[1.15] tracking-[0.06em] uppercase text-ink">{fill(sec.heading)}</h2>
                <div className="w-14 h-1 bg-brand" />
                {sec.body.map((p, j) => (
                  <p key={j} className={body}>{fill(p)}</p>
                ))}
              </div>
            </div>
          </section>
        ),
      )}
    </>
  );
}

/** Photo tiles for the services: every tile the same size, a short last row is centered. */
export function ServiceTiles({ services, label }: { services: Service[]; label: string }) {
  const three = services.length % 3 === 0;
  const width = three ? "lg:w-[calc(33.333%-0.667rem)]" : "lg:w-[calc(25%-0.75rem)]";
  return (
    <div className="max-w-[1240px] mx-auto flex flex-wrap justify-center gap-3 lg:gap-4">
      {services.map((s) => (
        <Link key={s.slug} href={`/commercial/${s.slug}`} className={`group relative block overflow-hidden bg-[#222] w-[calc(50%-0.375rem)] aspect-[4/5] ${width}`}>
            <Image src={s.image.url} alt={s.image.alt} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" /> {/* ui-label: image size hint, not visitor text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
              <h3 className="font-[400] tracking-[0.14em] uppercase leading-snug !text-white text-[15px] md:text-[19px]">{s.title}</h3>
              <p className={`mt-2 text-[17px] font-[300] leading-relaxed text-white/90 max-w-[40ch] hidden lg:block lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:transition-all lg:duration-300 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100`}>{s.summary}</p>
              <span className="mt-3 inline-block text-[13px] md:text-[14px] font-semibold tracking-[0.24em] uppercase text-brand border-b border-brand/40 pb-0.5 group-hover:border-brand transition-colors">{label} →</span>
            </div>
        </Link>
      ))}
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[1000px] mx-auto grid sm:grid-cols-2 gap-3">
      {items.map((x) => (
        <li key={x} className={`flex items-start gap-3 bg-white px-5 py-4 ${card} text-[19px] font-[400] leading-snug text-[#3C3C3C]`}>
          <svg aria-hidden="true" className="mt-1 shrink-0 text-brand" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          {x}
        </li>
      ))}
    </ul>
  );
}

export function FaqCards({ faqs, fill = same }: { faqs: { q: string; a: string }[]; fill?: Fill }) {
  return (
    <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-5">
      {faqs.map((f, i) => (
        <div key={i} className={`bg-white border-t-4 border-brand p-6 md:p-7 ${card}`}>
          <h3 className="text-[17px] font-[500] tracking-[0.08em] uppercase leading-snug text-ink">{fill(f.q)}</h3>
          <p className="mt-3 text-[18px] font-[400] leading-[1.7] text-[#3C3C3C]">{fill(f.a)}</p>
        </div>
      ))}
    </div>
  );
}

/** Heading plus a bar, centered; used above grids and cards. */
export function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className={`${h2} mb-3`}>{children}</h2>
      <div className="w-16 h-1 bg-brand mx-auto mb-12 md:mb-14" />
    </>
  );
}

export function CitiesBand({ image, heading, cities, current }: { image: Img; heading: string; cities: City[]; current?: string }) {
  return (
    <section className="relative px-5 md:px-8 py-20 md:py-28 text-white overflow-hidden">
      <Image src={image.url} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#1F2A2E]/90" />
      <div className="relative max-w-[1000px] mx-auto text-center">
        <h2 className={`${h2} mb-3 !text-white`}>{heading}</h2>
        <div className="w-16 h-1 bg-brand mx-auto mb-10" />
        <ul className="flex flex-wrap justify-center gap-2.5">
          {cities.filter((x) => x.slug !== current).map((x) => (
            <li key={x.slug}>
              <Link href={`/commercial/service-areas/${x.slug}`} className="block rounded-full border border-white/35 px-4 py-2 text-[16px] text-white/90 hover:bg-brand hover:border-brand hover:text-white transition-colors">{x.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ClosingCta({ heading, text, label }: { heading: string; text: string; label: string }) {
  return (
    <section className="px-6 py-24 bg-[#3C3C3C] text-center text-white">
      <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase max-w-[900px] mx-auto !text-white">{heading}</h2>
      <p className="mt-5 text-[20px] font-[300] text-white/80">{text}</p>
      <Link href="/commercial/contact" className="mt-10 inline-block border-2 border-brand bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-transparent hover:text-white transition-colors duration-300">
        {label}
      </Link>
    </section>
  );
}

/** A slim teal band with the two ways to reach us, for the middle of long pages. */
export async function CtaStrip() {
  const [c, nav] = await Promise.all([getCopy("cm"), getCopy("nav")]);
  return (
    <section className="bg-brand px-6 py-8 md:py-10">
      <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <Link href="/commercial/contact" className="bg-white !text-ink text-[18px] md:text-[20px] font-[600] tracking-[0.18em] uppercase whitespace-nowrap px-8 py-3.5 hover:bg-[#3C3C3C] hover:!text-white transition-colors">{c.ctaLabel}</Link>
        <a href={nav.phoneHref} className="text-white text-[22px] md:text-[26px] font-[400] tracking-[0.1em] whitespace-nowrap hover:underline underline-offset-4">{nav.phone}</a>
      </div>
    </section>
  );
}
