import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import PortableBody, { JsonLd, type BodyBlock } from "@/components/PortableBody";

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);

type Post = {
  title: string;
  slug: { current: string };
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: SanityImageSource;
  body?: BodyBlock[];
  publishedAt?: string;
  jsonLd?: string;
  sourceUrl?: string;
};

async function getPost(slug: string): Promise<Post | null> {
  // posts first; root-level utility `page` docs (e.g. portfolio-2) fall back
  const { data } = await sanityFetch({
    query: `coalesce(
      *[_type == "post" && slug.current == $slug][0],
      *[_type == "page" && slug.current == $slug][0]
    ) {
      title, slug, metaTitle, metaDescription, heroImage,
      body[]{ ..., asset }, publishedAt, jsonLd, sourceUrl
    }`,
    params: { slug },
  });
  return data as Post | null;
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd raw={post.jsonLd} />

      <article className="bg-white">
        <header className="pt-16 md:pt-24 pb-8 px-6 text-center max-w-3xl mx-auto">
          {post.publishedAt && (
            <p className="text-[10px] font-[500] tracking-[0.2em] uppercase text-muted mb-4">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <h1 className="text-[22px] md:text-[32px] font-[300] tracking-[0.15em] uppercase text-ink">
            {post.title}
          </h1>
        </header>

        {post.heroImage && (
          <div className="max-w-[1100px] mx-auto px-4 md:px-6 mb-10">
            <Image
              src={builder.image(post.heroImage).width(1600).auto("format").url()}
              alt={post.title}
              width={1600}
              height={900}
              priority
              className="w-full h-auto object-cover"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        )}

        <div className="px-6 pb-16 max-w-3xl mx-auto">
          <PortableBody body={post.body} />
        </div>

        <nav className="border-t border-gray-100 px-6 py-10 text-center">
          <Link
            href="/blog"
            className="text-[10px] font-[500] tracking-[0.2em] uppercase text-muted hover:text-ink transition-colors"
          >
            ← All Posts
          </Link>
        </nav>
      </article>
    </>
  );
}
