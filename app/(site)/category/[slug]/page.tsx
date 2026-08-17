import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { JsonLd } from "@/components/PortableBody";
import BlogGrid, { type BlogCard } from "@/components/blog/BlogGrid";
import CATEGORY_SEO from "../category-seo.json";

// Blog category archives — the 9 /category/* pages from THEIR live sitemap.
// SEO head (title, canonical, Yoast JSON-LD) cloned verbatim per category from
// the mirror (scripts/category-seo.json). Their paginated /page/2+ URLs are
// not in their sitemap, so ours renders the full category on one page.
export const revalidate = 3600;

const builder = createImageUrlBuilder(client);

type Seo = {
  name: string;
  titleTag: string;
  metaDescription: string | null;
  canonical: string;
  jsonLd: string;
};
const SEO: Record<string, Seo> = CATEGORY_SEO;

type Post = {
  title: string;
  slug: { current: string };
  heroImage?: SanityImageSource & { alt?: string };
  publishedAt?: string;
  excerpt?: string;
  categories?: string[];
};

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

export async function generateStaticParams() {
  return Object.keys(SEO).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = SEO[slug];
  if (!seo) return {};
  return {
    title: { absolute: seo.titleTag },
    description: seo.metaDescription ?? undefined,
    alternates: { canonical: `https://momsdesignbuild.com/category/${slug}/` },
    openGraph: { url: `https://momsdesignbuild.com/category/${slug}/` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seo = SEO[slug];
  if (!seo) notFound();

  // "Uncategorized" on WP = posts with no category assigned
  const { data } = await sanityFetch({
    query:
      slug === "uncategorized"
        ? `*[_type == "post" && !defined(categories) && !(slug.current in ["test", "thank-you", "contact-thanks-original", "mediterranean-meets-mn", "application"])]
            | order(coalesce(publishedAt, "1970-01-01") desc) { title, slug, heroImage, publishedAt, excerpt, categories }`
        : `*[_type == "post" && $name in categories]
            | order(coalesce(publishedAt, "1970-01-01") desc) { title, slug, heroImage, publishedAt, excerpt, categories }`,
    params: { name: seo.name },
  });
  const posts = data as Post[];

  const cards: BlogCard[] = posts.map((p) => ({
    title: p.title,
    slug: p.slug.current,
    imageUrl: p.heroImage ? builder.image(p.heroImage).width(800).height(533).auto("format").url() : null,
    alt: p.heroImage?.alt || p.title,
    date: fmtDate(p.publishedAt),
    excerpt: p.excerpt ?? null,
    categories: p.categories ?? [],
  }));

  return (
    <>
      <JsonLd raw={seo.jsonLd} />

      <section className="pt-16 md:pt-20 pb-12 px-6 text-center bg-white">
        <p className="text-[20px] font-[500] tracking-[0.3em] uppercase text-muted mb-3">
          The Blog
        </p>
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">
          {seo.name}
        </h1>
      </section>

      <section className="px-4 md:px-6 pb-24 bg-white">
        <BlogGrid cards={cards} />
      </section>
    </>
  );
}
