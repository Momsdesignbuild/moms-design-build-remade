import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { stegaClean } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import PortableBody, { JsonLd, type BodyBlock } from "@/components/PortableBody";
import ReadingProgress from "@/components/blog/ReadingProgress";
import NewsletterSignup from "@/components/blog/NewsletterSignup";

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);

type Post = {
  title: string;
  slug: { current: string };
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: SanityImageSource & { alt?: string };
  body?: BodyBlock[];
  publishedAt?: string;
  categories?: string[];
  jsonLd?: string;
  sourceUrl?: string;
  _type?: string;
};

async function getPost(slug: string): Promise<Post | null> {
  // posts first; root-level utility `page` docs (e.g. portfolio-2) fall back
  const { data } = await sanityFetch({
    query: `coalesce(
      *[_type == "post" && slug.current == $slug][0],
      *[_type == "page" && slug.current == $slug][0]
    ) {
      _type, title, slug, metaTitle, metaDescription, heroImage,
      body[]{ ..., asset }, publishedAt, categories, jsonLd, sourceUrl
    }`,
    params: { slug },
  });
  return data as Post | null;
}

type Related = { title: string; slug: { current: string }; publishedAt?: string; cat?: string; img?: string };

async function getRelated(slug: string, category?: string): Promise<Related[]> {
  // same-category first, latest-first backfill; designer-titled posts never
  // surface in recirculation modules (founders' rule)
  const { data } = await sanityFetch({
    query: `*[_type == "post" && slug.current != $slug && defined(heroImage)
        && !(slug.current in ["test", "thank-you", "contact-thanks-original", "mediterranean-meets-mn", "application"])]
      | order(select($cat != "" && $cat in categories => 0, 1) asc, coalesce(publishedAt, "1970-01-01") desc) [0...8] {
        title, slug, publishedAt, "cat": categories[0], "img": heroImage.asset->url
      }`,
    params: { slug, cat: category ?? "" },
  });
  const DESIGNER_RE = /bastyr|sweeney|mlejnek|udenberg|birkenbeuel|wiebusch|woodhead|denman/i;
  return (data as Related[]).filter((p) => !DESIGNER_RE.test(p.title)).slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle ? { absolute: post.metaTitle } : post.title,
    description: post.metaDescription,
    // their posts live at ROOT paths — canonical copied from WP verbatim
    alternates: post.sourceUrl
      ? { canonical: `https://momsdesignbuild.com${post.sourceUrl}` }
      : undefined,
    openGraph: post.heroImage
      ? {
          images: [
            {
              url: builder.image(post.heroImage).width(1200).height(630).auto("format").url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "post"] { slug }`
  );
  return slugs.map((p) => ({ slug: p.slug.current }));
}

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

// honest reading time from the actual body text
function readingMinutes(body?: BodyBlock[]): number | null {
  if (!body) return null;
  const words = body
    .filter((b) => b._type === "block")
    .flatMap((b) => (b.children ?? []).map((c) => stegaClean(c.text ?? "")))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return words > 120 ? Math.max(1, Math.round(words / 220)) : null;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const isPost = post._type !== "page";
  const minutes = readingMinutes(post.body);
  const category = post.categories?.[0];
  const related = isPost ? await getRelated(slug, category) : [];

  // Their WP convention: a short unpunctuated line is a photo CAPTION sitting
  // BELOW its photo. One appearing before any body image captions the HERO
  // (award-winning-designs: "Cedar & Stone" renders under the featured image
  // on live, but the migration placed it mid-body) — bind it under the hero
  // mat instead of letting it float above the NEXT photo (Josh 7/14).
  const captionText = (b?: BodyBlock): string | null => {
    if (!b || b._type !== "block" || b.listItem || /^h[1-6]$/.test(b.style ?? "")) return null;
    // stegaClean: draft-mode invisible chars would fail the <60-char test
    const t = stegaClean((b.children ?? []).map((c) => c.text).join("")).trim();
    return t && t.length < 60 && !/[.!?:]$/.test(t) ? t : null;
  };
  let heroCaption: string | null = null;
  let heroCaptionKey: string | null = null;
  if (isPost && post.heroImage) {
    // only the OPENING of the post can caption the hero — an unbounded scan
    // glued far-away CTA lines under the hero (why-hire, "SCHEDULE YOUR…")
    for (const b of (post.body ?? []).slice(0, 4)) {
      if (b._type === "image") break; // body images own their own captions
      if ((b as { markDefs?: unknown[] }).markDefs?.length) continue; // linked lines are CTAs, not captions
      const t = captionText(b);
      if (t) {
        heroCaption = t;
        heroCaptionKey = b._key;
      }
    }
  }
  const bodyBlocks = heroCaptionKey
    ? post.body!.filter((b) => b._key !== heroCaptionKey)
    : post.body;

  return (
    <>
      <JsonLd raw={post.jsonLd} />
      {isPost && <ReadingProgress />}

      <article>
        {/* ── Editorial masthead on cream ── */}
        <header className="bg-[#F7F5F2] pt-20 md:pt-28 pb-16 md:pb-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-brand mb-6">
              {[category ?? (isPost ? "The Journal" : null), fmtDate(post.publishedAt), minutes ? `${minutes} min read` : null]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
            <h1 className="text-[26px] md:text-[40px] font-[300] tracking-[0.04em] leading-[1.25] text-ink">
              {post.title}
            </h1>
          </div>
        </header>

        {/* ── Hero as a matted print riding the masthead's edge ── */}
        {post.heroImage && (
          <div className="px-4 md:px-6 -mt-8 md:-mt-10 mb-12 md:mb-16">
            <figure className="max-w-[1000px] mx-auto bg-white p-3 shadow-[0_34px_70px_-36px_rgba(28,28,26,0.4)]">
              <Image
                src={builder.image(post.heroImage).width(1600).auto("format").url()}
                alt={post.heroImage.alt || post.title}
                width={1600}
                height={900}
                priority
                className="w-full h-auto object-cover"
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
              {heroCaption && (
                <figcaption className="pt-3.5 pb-1.5 text-center text-[13px] font-[400] tracking-[0.22em] uppercase text-brand-mid">
                  {heroCaption}
                </figcaption>
              )}
            </figure>
          </div>
        )}

        {/* ── The read: measured column, teal drop cap on the opening ── */}
        <div
          className="px-6 pb-16 max-w-[680px] mx-auto
            [&_p]:text-[20px] [&_p]:leading-[1.9]
            [&_p:first-of-type]:first-letter:float-left
            [&_p:first-of-type]:first-letter:text-[54px]
            [&_p:first-of-type]:first-letter:leading-[0.85]
            [&_p:first-of-type]:first-letter:pr-2.5
            [&_p:first-of-type]:first-letter:mt-1
            [&_p:first-of-type]:first-letter:text-brand
            [&_p:first-of-type]:first-letter:[font-family:var(--font-heading)]"
        >
          <PortableBody body={bodyBlocks} editorial={isPost} />

          {/* sign-off */}
          <div className="mt-14 pt-8 border-t border-ink/10 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-[10px] font-semibold tracking-[0.26em] uppercase text-muted">
              Mom&rsquo;s Design Build · Minneapolis, MN
            </p>
            <Link
              href="/blog"
              className="text-[10px] font-semibold tracking-[0.24em] uppercase text-ink border-b border-ink/25 pb-0.5 hover:border-ink transition-colors"
            >
              All Stories
            </Link>
          </div>
        </div>

        {/* ── Keep Reading ── */}
        {related.length === 3 && (
          <section className="bg-[#F7F5F2] py-20 lg:py-24 px-6 lg:px-10">
            <div className="max-w-[1400px] mx-auto">
              <div className="mb-12">
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">Keep Reading</p>
                <h2 className="text-2xl md:text-4xl font-[300] tracking-[0.06em] uppercase text-ink">
                  More from the Journal
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                {related.map((p) => (
                  <Link key={p.slug.current} href={`/${p.slug.current}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-white">
                      {p.img && (
                        <Image
                          src={p.img}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 92vw, 430px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-muted mb-2.5">
                      {p.cat ?? "Journal"}{p.publishedAt ? ` · ${fmtDate(p.publishedAt)}` : ""}
                    </p>
                    <h3 className="text-[20px] md:text-[17px] font-[300] tracking-[0.05em] leading-snug text-ink group-hover:text-brand transition-colors duration-300">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {isPost && <NewsletterSignup />}
      </article>
    </>
  );
}
