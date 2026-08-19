import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import type { BodyBlock, ServiceTemplate } from "./ServicePageBody";

export type ServicePageDoc = {
  title: string;
  template: ServiceTemplate;
  cardsSet?: string;
  divisionLogoUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  sourceUrl?: string;
  jsonLd?: string;
  body: BodyBlock[];
};

export async function getServicePage(slug: string): Promise<ServicePageDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "servicePage" && slug.current == $slug][0]{
      title, template, cardsSet, divisionLogoUrl, metaTitle, metaDescription,
      ogImageUrl, ogImageWidth, ogImageHeight, ogImageType, sourceUrl, jsonLd,
      body[]{
        ...,
        _type == "image" => { "url": asset->url, "dim": asset->metadata.dimensions{ width, height } },
        _type == "imageCarousel" => { "images": images[]{ "url": asset->url, alt, href, "dim": asset->metadata.dimensions{ width, height } } }
      }
    }`,
    params: { slug },
  });
  return data as ServicePageDoc | null;
}

// build-time slug list for a section's [sub] route (client.fetch — no request context)
export async function serviceSubSlugs(section: string): Promise<string[]> {
  const rows = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "servicePage" && slug.current match $glob] { slug }`,
    { glob: `${section}/*` }
  );
  return rows.map((r) => r.slug.current.slice(section.length + 1));
}

// head matches THEIR page exactly — metaTitle/description/canonical/og verbatim
// from the migrated doc (originally from WP/Yoast)
export function serviceMetadata(doc: ServicePageDoc | null): Metadata {
  if (!doc) return {};
  const url = `https://momsdesignbuild.com${doc.sourceUrl ?? ""}`;
  return {
    title: doc.metaTitle ? { absolute: doc.metaTitle } : undefined,
    description: doc.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: doc.metaTitle,
      description: doc.metaDescription,
      url,
      siteName: "Mom's Design Build",
      locale: "en_US",
      type: "article",
      ...(doc.ogImageUrl
        ? {
            images: [
              {
                url: doc.ogImageUrl,
                width: doc.ogImageWidth,
                height: doc.ogImageHeight,
                type: doc.ogImageType,
              },
            ],
          }
        : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}
