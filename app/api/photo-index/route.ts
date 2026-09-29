import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Photo catalog for search (Josh 9/29): every photo on the site that has real
// alt text, with the page it lives on. The search overlay's "Photos" tab loads
// this once and filters client-side. Rebuilt at most hourly.
export const revalidate = 3600;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export type Photo = { src: string; alt: string; w: number; h: number; page: string; href: string; type: string };

type Img = { src: string | null; alt: string | null; w: number | null; h: number | null };
type Row = { page: string; href: string; imgs: (Img | null)[] | null };

// alt text that says nothing about the photo, or only numbers a gallery ("… - 014")
const JUNK = /^(mom'?s design build|image|photo|untitled|img[_-]?\d+|dsc[_-]?\d+)$/i;
const NUMBERED = /[-–_ ]\d{1,3}$/;

const IMG = `{ "src": asset->url, alt, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height }`;

export async function GET() {
  const [projects, posts, services, careers] = await Promise.all([
    client.fetch<Row[]>(`*[_type == "portfolioProject"] | order(orderRank) {
      "page": title, "href": "/portfolio/" + slug.current + "/",
      "imgs": [leadImage${IMG}] + coalesce(gallery[]${IMG}, []) + coalesce(description[_type == "image"]${IMG}, [])
    }`),
    client.fetch<Row[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      "page": title, "href": "/" + slug.current + "/",
      "imgs": [heroImage${IMG}] + coalesce(body[_type == "image"]${IMG}, [])
    }`),
    client.fetch<Row[]>(`*[(_type == "servicePage" || (_type == "page" && sourceUrl match "/services/*")) && defined(sourceUrl)] {
      "page": title, "href": sourceUrl,
      "imgs": coalesce(body[_type == "image"]${IMG}, []) + coalesce(body[].images[]${IMG}, [])
    }`),
    client.fetch<Row[]>(`*[_type == "careerPage" && order >= 0] {
      "page": title, "href": "/careers/" + slug.current + "/", "imgs": [photo${IMG}]
    }`),
  ]);

  const seen = new Set<string>();
  const photos: Photo[] = [];
  const add = (type: string) => (r: Row) => {
    for (const i of r.imgs ?? []) {
      const alt = (i?.alt ?? "").replace(/\s+/g, " ").trim();
      if (!i?.src || alt.length < 4 || JUNK.test(alt) || NUMBERED.test(alt) || seen.has(i.src)) continue;
      seen.add(i.src);
      photos.push({ src: i.src, alt: alt.slice(0, 160), w: i.w ?? 1200, h: i.h ?? 800, page: r.page, href: r.href, type });
    }
  };
  projects.forEach(add("Portfolio"));
  services.forEach(add("Services"));
  posts.forEach(add("Blog"));
  careers.forEach(add("Careers"));

  return NextResponse.json(photos, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
