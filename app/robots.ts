import { MetadataRoute } from "next";

// robots.txt is intentionally ALLOW everywhere, including *.vercel.app:
// staging noindex comes from middleware.ts (X-Robots-Tag). Google has to be
// able to crawl a page to see its noindex header — a Disallow here would let
// staging URLs show up as "indexed without content" instead of staying out.
export default function robots(): MetadataRoute.Robots {
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
