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
    query: `*[_type == "careerPage" && slug.current == $slug][0] {
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
    query: `*[_type == "careerPage" && order >= 0] | order(order asc) { title, slug, order, photo{ ..., asset } }`,
  });
  return data as CareerTile[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
            <ul className="border-y border-ink/10 py-5 mb-10 space-y-1.5 text-center">
              {c.facts.map((f, i) => (
                <li
                  key={i}
                  className="text-[12px] font-[300] tracking-[0.08em] text-muted"
                >
                  {f}
                </li>
              ))}
            </ul>
          )}

          <PortableBody body={c.body} />

          {c.applyHref && (
            <div className="pt-10 text-center">
              <Link
                href={hrefToOurs(c.applyHref) || "/application/"}
                className="inline-block border border-ink px-10 py-3 text-[11px] font-[500] tracking-[0.25em] uppercase text-ink hover:bg-ink hover:text-white transition-colors"
              >
                Apply
              </Link>
            </div>
          )}

          {(prev || next) && (
            <nav className="mt-14 flex justify-between border-t border-ink/10 pt-6 text-[10px] font-[500] tracking-[0.2em] uppercase">
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
