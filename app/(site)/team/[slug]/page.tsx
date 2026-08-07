import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import PortableBody, { JsonLd, type BodyBlock } from "@/components/PortableBody";
import OverlayTile from "@/components/OverlayTile";

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);

type Member = {
  name: string;
  slug: { current: string };
  role?: string;
  photo?: SanityImageSource & { alt?: string };
  photoDim?: { width: number; height: number };
  ogImageUrl?: string;
  ogImageDim?: { width: number; height: number };
  bio?: BodyBlock[];
  metaTitle?: string;
  metaDescription?: string;
  sourceUrl?: string;
  jsonLd?: string;
};

async function getMember(slug: string): Promise<Member | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "teamMember" && slug.current == $slug][0] {
      name, slug, role,
      photo{ ..., asset },
      "photoDim": photo.asset->metadata.dimensions{ width, height },
      "ogImageUrl": ogImage.asset->url,
      "ogImageDim": ogImage.asset->metadata.dimensions{ width, height },
      bio[]{ ..., asset }, metaTitle, metaDescription, sourceUrl, jsonLd
    }`,
    params: { slug },
  });
  return data as Member | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = await getMember(slug);
  if (!m) return {};
  const title = m.metaTitle ?? `${m.name} | Mom's Design Build`;
  const path = m.sourceUrl ?? `/team/${slug}/`;
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : title,
    description: m.metaDescription,
    // canonical copied from WP verbatim (absolute, trailing slash)
    alternates: { canonical: `https://momsdesignbuild.com${path}` },
    openGraph: {
      title,
      description: m.metaDescription,
      url: `https://momsdesignbuild.com${path}`,
      siteName: "Mom's Design Build",
      locale: "en_US",
      type: "article",
      // WP shares the BW square here, not the page portrait — same bytes, served from Sanity
      images: m.ogImageUrl
        ? [{ url: m.ogImageUrl, width: m.ogImageDim?.width, height: m.ogImageDim?.height, type: "image/jpeg" }]
        : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "teamMember"] { slug }`
  );
  return slugs.map((p) => ({ slug: p.slug.current }));
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = await getMember(slug);
  if (!m) notFound();

  // Marketing 8/7: this designer's portfolio work, shown on their page.
  // `match` also catches shared credits ("Heather Sweeney and Melissa Mlejnek").
  const { data: designedRaw } = await sanityFetch({
    query: `*[_type == "portfolioProject" && designerName match $name]
      | order(orderRank, _createdAt asc) { title, slug, heroImage }`,
    params: { name: m.name },
  });
  const designed = (designedRaw ?? []) as Array<{
    title: string;
    slug: { current: string };
    heroImage?: SanityImageSource;
  }>;

  return (
    <>
      <JsonLd raw={m.jsonLd} />

      <section className="pt-16 md:pt-24 pb-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 items-start">
          {m.photo && (
            <Image
              src={builder.image(m.photo).width(900).auto("format").url()}
              alt={m.photo.alt || m.name}
              width={900}
              height={m.photoDim ? Math.round((900 * m.photoDim.height) / m.photoDim.width) : 1200}
              priority
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          )}
          <div>
            <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.2em] uppercase text-ink mb-2">
              {m.name}
            </h1>
            {m.role && (
              <p className="text-[16px] font-[400] tracking-[0.15em] uppercase text-muted mb-6">
                {m.role}
              </p>
            )}
            <PortableBody body={m.bio} />
          </div>
        </div>

        {designed.length > 0 && (
          <div className="pt-16 border-t border-ink/10 mt-14">
            <h2 className="text-center text-[20px] md:text-[24px] font-[300] tracking-[0.22em] uppercase text-brand mb-8">
              Projects by {m.name.split(" ")[0]}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {designed.map((pr) => (
                <OverlayTile
                  key={pr.slug.current}
                  href={`/portfolio/${pr.slug.current}`}
                  img={pr.heroImage ? builder.image(pr.heroImage).width(500).height(625).auto("format").url() : null}
                  title={pr.title}
                  aspect="aspect-[4/5]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ))}
            </div>
          </div>
        )}

        <nav className="pt-14 text-center">
          {/* their site never links the /team archive — send people to the About team grid */}
          <Link
            href="/about#team-heading"
            className="text-[10px] font-[500] tracking-[0.2em] uppercase text-muted hover:text-ink transition-colors"
          >
            ← Meet the Full Team
          </Link>
        </nav>
      </section>
    </>
  );
}
