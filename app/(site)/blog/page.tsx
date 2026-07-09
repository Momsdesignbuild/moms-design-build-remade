import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { JsonLd } from "@/components/PortableBody";
import BlogGrid, { type BlogCard } from "@/components/blog/BlogGrid";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { BLOG_JSONLD } from "./jsonld";

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);

// Head matches THEIR /blog/ exactly (Yoast values); robots inherited from root layout
export const metadata: Metadata = {
  title: { absolute: "Mom's Design Build Blog - Explore Home & Landscape Design" },
  description:
    "The Mom's Design Build Blog is composed of various current trends and home design ideas that are sure to inspire your next project.",
  alternates: { canonical: "https://momsdesignbuild.com/blog/" },
  openGraph: {
    title: "Mom's Design Build Blog - Explore Home & Landscape Design",
    description:
      "The Mom's Design Build Blog is composed of various current trends and home design ideas that are sure to inspire your next project.",
    url: "https://momsdesignbuild.com/blog/",
    type: "website",
  },
};

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

export default async function BlogPage() {
  const { data: posts } = (await sanityFetch({
    // junk WP utility pages live at root like posts — never list them here
    query: `*[_type == "post" && !(slug.current in ["test", "thank-you", "contact-thanks-original", "mediterranean-meets-mn", "application"])]
      | order(coalesce(publishedAt, "1970-01-01") desc) {
      title, slug, heroImage, publishedAt, excerpt, categories
    }`,
  })) as { data: Post[] };

  const [featured, ...rest] = posts;
  const cards: BlogCard[] = rest.map((p) => ({
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
      <JsonLd raw={BLOG_JSONLD} />

      {/* ── header ── */}
      <section className="pt-16 md:pt-20 pb-12 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-4">
          The Blog
        </h1>
        <p className="text-[13px] font-[300] tracking-[0.08em] leading-relaxed text-muted max-w-md mx-auto">
          Current trends, project stories, and home &amp; landscape design ideas.
        </p>
      </section>

      {/* ── featured: the latest story, magazine-cover style ── */}
      {featured && (
        <section className="px-4 md:px-6 pb-20 bg-white">
          <Link
            href={`/${featured.slug.current}`}
            className="group relative block max-w-[1400px] mx-auto h-[52vh] md:h-[62vh] overflow-hidden bg-ink"
          >
            {featured.heroImage && (
              <Image
                src={builder.image(featured.heroImage).width(2000).auto("format").url()}
                alt={featured.heroImage?.alt || featured.title}
                fill
                priority
                className="object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.02]"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 max-w-3xl">
              <p className="text-white/60 text-[10px] font-[500] tracking-[0.3em] uppercase mb-3">
                Latest{featured.publishedAt ? ` — ${fmtDate(featured.publishedAt)}` : ""}
              </p>
              <h2 className="text-white text-[24px] md:text-[38px] font-[300] tracking-[0.06em] leading-tight">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-4 text-white/75 text-[13px] md:text-[14px] font-[300] leading-relaxed line-clamp-2 max-w-xl">
                  {featured.excerpt}
                </p>
              )}
              <span className="mt-6 inline-block text-white text-[10px] font-[500] tracking-[0.25em] uppercase border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                Read the Story →
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ── the archive ── */}
      <section className="px-4 md:px-6 pb-24 bg-white">
        <BlogGrid cards={cards} />
      </section>

      {/* ── newsletter — capture their site never had ── */}
      <NewsletterSignup />
    </>
  );
}
