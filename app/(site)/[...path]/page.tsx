import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import PortableBody, { JsonLd, type BodyBlock } from "@/components/PortableBody";

export const revalidate = 3600;

// Nested WP utility/sub pages (contact/thanks, services/x/y…) — carbon-copied
// `page` docs served at their exact WP paths.
type PageDoc = {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  body?: BodyBlock[];
  jsonLd?: string;
  sourceUrl?: string;
};

async function getDoc(path: string): Promise<PageDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "page" && slug.current == $path][0]{ title, metaTitle, metaDescription, body, jsonLd, sourceUrl }`,
    params: { path },
  });
  return data as PageDoc | null;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "page" && slug.current match "*/*"]{ slug }`
  );
  return slugs.map((p) => ({ path: p.slug.current.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ path: string[] }> }): Promise<Metadata> {
  const { path } = await params;
  const doc = await getDoc(path.join("/"));
  if (!doc) return {};
  return {
    title: { absolute: doc.metaTitle || doc.title },
    description: doc.metaDescription,
    alternates: doc.sourceUrl ? { canonical: `https://momsdesignbuild.com${doc.sourceUrl}` } : undefined,
  };
}

export default async function NestedPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const doc = await getDoc(path.join("/"));
  if (!doc) notFound();

  return (
    <>
      <JsonLd raw={doc.jsonLd} />
      <section className="pt-16 md:pt-20 pb-10 px-6 text-center">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">{doc.title}</h1>
      </section>
      <section className="px-6 pb-24">
        <div className="max-w-[1050px] mx-auto">
          <PortableBody body={doc.body} />
        </div>
      </section>
    </>
  );
}
