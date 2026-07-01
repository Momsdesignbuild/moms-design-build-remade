import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isLive = process.env.SITE_LIVE === "true";

  if (!isLive) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: "https://momsdesignbuild.com/sitemap.xml",
  };
}
