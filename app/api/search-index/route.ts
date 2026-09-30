import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Site-wide search index (marketing 8/7, Jim's ask): one slim JSON fetched once
// by the search overlay and filtered client-side. Rebuilt at most hourly.
// 9/29 (Josh): also service pages, and every photo's alt text on every page —
// so "pool" finds the pages whose PHOTOS show pools, not just titles.
export const revalidate = 3600;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export type SearchItem = {
  type: "Portfolio" | "Blog" | "Careers" | "Services" | "Team";
  title: string;
  href: string;
  img: string | null;
  desc: string;
  tags: string; // categories, tags, location — matched, never shown
  alts: string[]; // photo alt text on the page — matched, shown as "In a photo: …"
};

type Row = { title: string; href: string; img: string | null; desc: string | null; tags?: string[] | null; alts?: (string | null)[] | null };

// alt text that says nothing about the photo
const JUNK = /^(mom'?s design build|image|photo|untitled|img[_-]?\d+|dsc[_-]?\d+)$/i;
const cleanAlts = (alts: Row["alts"]) =>
  [...new Set((alts ?? []).map((a) => (a ?? "").replace(/\s+/g, " ").trim()).filter((a) => a.length > 3 && !JUNK.test(a)))]
    .slice(0, 60)
    .map((a) => a.slice(0, 140));

export async function GET() {
  const [projects, posts, careers, services, team] = await Promise.all([
    client.fetch<Row[]>(
      `*[_type == "portfolioProject"] | order(orderRank, _createdAt asc) {
        title, "href": "/portfolio/" + slug.current + "/", "img": heroImage.asset->url, "desc": location,
        "tags": array::compact([location, designerName] + coalesce(categories, [])),
        "alts": array::compact([leadImage.alt] + coalesce(gallery[].alt, []) + coalesce(description[_type == "image"].alt, []) + coalesce(galleryBadges[].alt, []))
      }`,
    ),
    client.fetch<Row[]>(
      `*[_type == "post" && !(slug.current in ["test", "thank-you", "contact-thanks-original", "mediterranean-meets-mn", "application"])] | order(publishedAt desc) {
        title, "href": "/" + slug.current + "/", "img": heroImage.asset->url, "desc": excerpt,
        "tags": categories,
        "alts": array::compact([heroImage.alt] + coalesce(body[_type == "image"].alt, []))
      }`,
    ),
    client.fetch<Row[]>(
      `*[_type == "careerPage" && order >= 0] | order(order asc) {
        title, "href": "/careers/" + slug.current + "/", "img": photo.asset->url, "desc": null,
        "tags": facts, "alts": [photo.alt]
      }`,
    ),
    client.fetch<Row[]>(
      `*[(_type == "servicePage" || (_type == "page" && sourceUrl match "/services/*")) && defined(sourceUrl)] | order(sourceUrl asc) {
        title, "href": sourceUrl, "img": ogImageUrl, "desc": metaDescription,
        "alts": array::compact(coalesce(body[].alt, []) + coalesce(body[].images[].alt, []))
      }`,
    ),
    // the people (Josh 9/30): search a name, land on their team page
    client.fetch<Row[]>(
      `*[_type == "teamMember" && defined(slug.current)] | order(order asc, name asc) {
        "title": name, "href": "/team/" + slug.current + "/", "img": photo.asset->url, "desc": role,
        "tags": [role], "alts": [photo.alt]
      }`,
    ),
  ]);

  const thumb = (u: string | null) => (u ? `${u}?w=160&h=160&fit=crop&auto=format` : null);
  const item = (type: SearchItem["type"], fallback: string) => (r: Row): SearchItem => ({
    type,
    title: r.title,
    href: r.href,
    img: thumb(r.img),
    desc: (r.desc || fallback).slice(0, 140),
    tags: (r.tags ?? []).filter(Boolean).join(" · "),
    alts: cleanAlts(r.alts),
  });

  const items: SearchItem[] = [
    ...team.map(item("Team", "Mom's Design Build team")),
    ...services.map(item("Services", "Mom's Design Build services")),
    ...projects.map(item("Portfolio", "Portfolio project")),
    ...posts.map(item("Blog", "From the blog")),
    ...careers.map(item("Careers", "Now hiring — join the Mom's Design Build team")),
  ];

  return NextResponse.json(items, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
