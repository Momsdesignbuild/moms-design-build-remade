import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Site-wide search index (marketing 8/7, Jim's ask): one slim JSON of
// portfolio + blog + careers, fetched once by the search overlay and
// filtered client-side. Rebuilt at most hourly.
export const revalidate = 3600;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export type SearchItem = {
  type: "Portfolio" | "Blog" | "Careers";
  title: string;
  href: string;
  img: string | null;
  desc: string;
};

export async function GET() {
  const [projects, posts, careers] = await Promise.all([
    client.fetch<Array<{ title: string; slug: string; img: string | null; location: string | null }>>(
      `*[_type == "portfolioProject"] | order(orderRank, _createdAt asc) {
        title, "slug": slug.current, "img": heroImage.asset->url, "location": location
      }`,
    ),
    client.fetch<Array<{ title: string; slug: string; img: string | null; excerpt: string | null }>>(
      `*[_type == "post"] | order(publishedAt desc) {
        title, "slug": slug.current, "img": heroImage.asset->url, excerpt
      }`,
    ),
    client.fetch<Array<{ title: string; slug: string; img: string | null }>>(
      `*[_type == "careerPage" && order >= 0] | order(order asc) {
        title, "slug": slug.current, "img": photo.asset->url
      }`,
    ),
  ]);

  const thumb = (u: string | null) => (u ? `${u}?w=160&h=160&fit=crop&auto=format` : null);

  const items: SearchItem[] = [
    ...projects.map((p) => ({
      type: "Portfolio" as const,
      title: p.title,
      href: `/portfolio/${p.slug}/`,
      img: thumb(p.img),
      desc: p.location || "Portfolio project",
    })),
    ...posts.map((p) => ({
      type: "Blog" as const,
      title: p.title,
      href: `/${p.slug}/`,
      img: thumb(p.img),
      desc: (p.excerpt || "From the blog").slice(0, 140),
    })),
    ...careers.map((c) => ({
      type: "Careers" as const,
      title: c.title,
      href: `/careers/${c.slug}/`,
      img: thumb(c.img),
      desc: "Now hiring — join the Mom's Design Build team",
    })),
  ];

  return NextResponse.json(items, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
