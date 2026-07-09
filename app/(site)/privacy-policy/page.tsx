import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import PortableBody, { JsonLd, type BodyBlock } from "@/components/PortableBody";

export const revalidate = 3600;

type PageDoc = {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  body?: BodyBlock[];
  jsonLd?: string;
  sourceUrl?: string;
};

async function getDoc(): Promise<PageDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_id == "wp-page-privacy-policy"][0]{ title, metaTitle, metaDescription, body, jsonLd, sourceUrl }`,
  });
  return data as PageDoc | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getDoc();
  return {
    title: { absolute: doc?.metaTitle || "Privacy Policy - Mom's Design Build" },
    description: doc?.metaDescription || "How Mom's Design Build collects, uses, and protects your information.",
    alternates: { canonical: "https://momsdesignbuild.com/privacy-policy/" },
  };
}

export default async function PrivacyPolicyPage() {
  const doc = await getDoc();

  return (
    <>
      <JsonLd raw={doc?.jsonLd} />

      <section className="pt-16 md:pt-20 pb-10 px-6 text-center">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">
          Privacy Policy
        </h1>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <PortableBody body={doc?.body} />
        </div>
      </section>
    </>
  );
}
