import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://momsdesignbuild.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all portfolio slugs from Sanity
  const portfolioProjects = await client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
    `*[_type == "portfolioProject"] { slug, _updatedAt }`
  );

  // Fetch all blog post slugs from Sanity
  const blogPosts = await client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
    `*[_type == "post"] { slug, _updatedAt }`
  ).catch(() => [] as Array<{ slug: { current: string }; _updatedAt: string }>);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL + "/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: BASE_URL + "/portfolio",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/services/landscape-architecture",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: BASE_URL + "/services/interior-design-and-remodeling",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: BASE_URL + "/services/garden-management",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/services/commercial-maintenance",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: BASE_URL + "/process",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: BASE_URL + "/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: BASE_URL + "/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: BASE_URL + "/careers",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: BASE_URL + "/homeowner-portal",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.slug.current}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioPages, ...blogPages];
}
