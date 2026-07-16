import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://momsdesignbuild.com";

// junk WP utility pages that exist as docs but must not be advertised
const EXCLUDE = new Set(["test", "thank-you", "contact-thanks-original", "contact/thanks"]);

const CATEGORY_SLUGS = [
  "favorite-spaces", "fine-gardening", "landscape-design", "news-press",
  "planning-resources", "product-highlights", "services", "tips-from-an-expert", "uncategorized",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, services, careers, team, pages] = await Promise.all([
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "portfolioProject"] { slug, _updatedAt }`),
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "post"] { slug, _updatedAt }`),
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "servicePage"] { slug, _updatedAt }`),
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "careerPage" && defined(slug.current) && slug.current != "__hub" && published != false] { slug, _updatedAt }`),
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "teamMember"] { slug, _updatedAt }`),
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "page"] { slug, _updatedAt }`),
  ]);

  const entry = (
    path: string,
    lastModified: Date,
    changeFrequency: "weekly" | "monthly",
    priority: number
    // trailing slash matches every page's canonical (copied from WP) — GSC
    // treats /x and /x/ as distinct URLs, so the sitemap must advertise the
    // canonical form
  ) => ({ url: BASE_URL + (path.endsWith("/") ? path : path + "/"), lastModified, changeFrequency, priority });

  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    entry("/", now, "weekly", 1.0),
    entry("/portfolio", now, "weekly", 0.9),
    entry("/services", now, "monthly", 0.9),
    entry("/about", now, "monthly", 0.75),
    entry("/process", now, "monthly", 0.7),
    entry("/blog", now, "weekly", 0.7),
    entry("/contact", now, "monthly", 0.7),
    entry("/careers", now, "monthly", 0.5),
    entry("/application", now, "monthly", 0.4),
    entry("/team", now, "monthly", 0.5),
    entry("/commercial-spaces", now, "monthly", 0.6),
    entry("/homeowner-portal", now, "monthly", 0.5),
  ];

  return [
    ...statics,
    // servicePage slugs: section pages live under /services/, root-level info
    // pages (homeowner-portal, commercial-spaces) are already in statics
    ...services
      .filter((s) => s.slug.current.includes("/") || ["landscape-architecture", "interior-design-and-remodeling", "garden-management", "commerical-maintenance"].includes(s.slug.current))
      .map((s) => entry(`/services/${s.slug.current}`, new Date(s._updatedAt), "monthly", 0.8)),
    ...projects.map((p) => entry(`/portfolio/${p.slug.current}`, new Date(p._updatedAt), "monthly", 0.7)),
    // posts live at ROOT paths (their WP structure), never /blog/<slug>
    ...posts
      .filter((p) => !EXCLUDE.has(p.slug.current))
      .map((p) => entry(`/${p.slug.current}`, new Date(p._updatedAt), "monthly", 0.6)),
    ...CATEGORY_SLUGS.map((c) => entry(`/category/${c}`, now, "weekly", 0.4)),
    ...careers.map((c) => entry(`/careers/${c.slug.current}`, new Date(c._updatedAt), "monthly", 0.5)),
    ...team.map((t) => entry(`/team/${t.slug.current}`, new Date(t._updatedAt), "monthly", 0.4)),
    ...pages
      .filter((p) => !EXCLUDE.has(p.slug.current))
      .map((p) => entry(`/${p.slug.current}`, new Date(p._updatedAt), "monthly", 0.4)),
  ];
}
