import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import PortableBody, { JsonLd, type BodyBlock } from "@/components/PortableBody";
import CareersGrid, { type CareerTile } from "@/components/careers/CareersGrid";

export const revalidate = 3600;

type Career = {
  title: string;
  slug: { current: string };
  order: number;
  facts?: string[];
  body?: BodyBlock[];
  applyHref?: string;
  prevHref?: string;
  nextHref?: string;
  metaTitle?: string;
  metaDescription?: string;
  sourceUrl?: string;
  jsonLd?: string;
};

async function getCareer(slug: string): Promise<Career | null> {
  const { data } = await sanityFetch({
    // published != false: Summer's Studio toggle takes the page DOWN, not
    // just off the grid (Josh 7/16 — "take them down if they aren't hiring")
    query: `*[_type == "careerPage" && slug.current == $slug && published != false][0] {
      title, slug, order, facts, body[]{ ..., asset },
      applyHref, prevHref, nextHref,
      metaTitle, metaDescription, sourceUrl, jsonLd
    }`,
    params: { slug },
  });
  return data as Career | null;
}

async function getTiles(): Promise<CareerTile[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "careerPage" && order >= 0 && published != false] | order(order asc) { title, slug, order, photo{ ..., asset } }`,
  });
  return data as CareerTile[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // the internal hub-holder doc is not a page — their live site 404s it
  if (slug === "__hub") notFound();
  const c = await getCareer(slug);
  if (!c) return {};
  const title = c.metaTitle ?? `${c.title} - Mom's Design Build`;
  const path = c.sourceUrl ?? `/careers/${slug}/`;
  return {
    title: c.metaTitle ? { absolute: c.metaTitle } : title,
    description: c.metaDescription,
    // canonical copied from WP's own tag verbatim (absolute, trailing slash)
    alternates: { canonical: `https://momsdesignbuild.com${path}` },
    openGraph: {
      title,
      description: c.metaDescription,
      url: `https://momsdesignbuild.com${path}`,
      siteName: "Mom's Design Build",
      locale: "en_US",
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "careerPage" && order >= 0] { slug }`
  );
  return slugs.map((p) => ({ slug: p.slug.current }));
}

// Marketing 8/7: the live site fronts each job with icon rows (cash /
// calendar / arrow / building). Icon picked from the fact's wording.
function FactIcon({ text }: { text: string }) {
  const t = text.toLowerCase();
  const cls = "w-[18px] h-[18px] text-brand shrink-0";
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (/[$]|salary|pay|compensation|wage|bonus/.test(t))
    return (<svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 .9-3 2.25c0 3.4 6 1.6 6 5 0 1.35-1.3 2.25-3 2.25s-3-1.1-3-2.5" /></svg>);
  if (/schedule|monday|friday|time|hour|am|pm|seasonal|year.round|week/.test(t))
    return (<svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden><rect x="3.5" y="5" width="17" height="15.5" rx="1.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>);
  if (/travel|drive|route|field|on.site|job.site/.test(t))
    return (<svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden><path d="M4 19.5 19.5 4M19.5 4h-8M19.5 4v8" /></svg>);
  if (/office|shop|shakopee|building|hq|headquarters|location/.test(t))
    return (<svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden><path d="M4.5 20.5v-13l7.5-4 7.5 4v13M9.5 20.5v-5h5v5M4.5 20.5h15" /></svg>);
  if (/mom.?s design build|employer|company/.test(t))
    return (<svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden><path d="M4 8.5h16v11.5H4z" /><path d="M8.5 8.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2.5M4 13h16" /></svg>);
  return (<svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 8v4.5M12 16h.01" /></svg>);
}

function hrefToOurs(href?: string): string | null {
  if (!href) return null;
  // their prev/next/apply hrefs are same-site paths — keep them internal
  return href.replace(/^https?:\/\/(www\.)?momsdesignbuild\.com/, "") || "/";
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // the internal hub-holder doc is not a page — their live site 404s it
  if (slug === "__hub") notFound();
  const c = await getCareer(slug);
  if (!c) notFound();
  const tiles = await getTiles();
  const prev = hrefToOurs(c.prevHref);
  const next = hrefToOurs(c.nextHref);

  return (
    <>
      <JsonLd raw={c.jsonLd} />

      <section className="pt-16 md:pt-24 pb-14 px-6 bg-white">
        <div className="max-w-[760px] mx-auto">
          <h1 className="text-center text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-8">
            {c.title}
          </h1>

          {c.facts && c.facts.length > 0 && (
            <ul className="border-y border-ink/10 py-6 mb-10 space-y-3 max-w-md mx-auto">
              {c.facts.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start justify-center gap-3 text-[20px] font-[300] tracking-[0.04em] text-muted"
                >
                  <span className="mt-[1px] shrink-0">
                    <FactIcon text={f} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <PortableBody body={c.body} />

          {c.applyHref && (
            <div className="pt-10 text-center">
              <Link
                href={hrefToOurs(c.applyHref) || "/application/"}
                className="inline-block border border-ink px-10 py-3 text-[20px] font-[500] tracking-[0.25em] uppercase text-ink hover:bg-ink hover:text-white transition-colors"
              >
                Apply
              </Link>
            </div>
          )}

          {(prev || next) && (
            <nav className="mt-14 flex justify-between border-t border-ink/10 pt-6 text-[20px] font-[500] tracking-[0.2em] uppercase">
              {prev ? (
                <Link href={prev} className="text-muted hover:text-ink transition-colors">
                  ← Previous
                </Link>
              ) : (
                <span />
              )}
              <Link href="/careers/" className="text-muted hover:text-ink transition-colors">
                All Careers
              </Link>
              {next ? (
                <Link href={next} className="text-muted hover:text-ink transition-colors">
                  Next →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </section>

      {/* their pattern: every career page ends with the photo-tile careers grid */}
      <CareersGrid tiles={tiles} heading="Explore All Openings" />
    </>
  );
}
