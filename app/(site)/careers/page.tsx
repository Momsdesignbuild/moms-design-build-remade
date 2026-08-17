import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { JsonLd } from "@/components/PortableBody";
import CareersGrid, { type CareerTile } from "@/components/careers/CareersGrid";

export const revalidate = 3600;

// SEO fields = WP verbatim (manifest `careers` entry); JSON-LD = live Yoast,
// byte-for-byte, stored on the career-hub doc by scripts/build-careers.mjs.
export const metadata: Metadata = {
  title: { absolute: "Careers At Mom's Design Build - Explore Job Opportunities" },
  description:
    "Mom's Design Build is looking for talented applicants from designers to builders in MN. Explore our job openings and submit your application today!",
  alternates: { canonical: "https://momsdesignbuild.com/careers/" },
  openGraph: {
    title: "Careers At Mom's Design Build - Explore Job Opportunities",
    description:
      "Mom's Design Build is looking for talented applicants from designers to builders in MN. Explore our job openings and submit your application today!",
    url: "https://momsdesignbuild.com/careers/",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

async function getHubJsonLd(): Promise<string | undefined> {
  const { data: doc } = (await sanityFetch({
    query: `*[_type == "careerPage" && _id == "career-hub"][0]{ jsonLd }`,
  })) as { data: { jsonLd?: string } | null };
  return doc?.jsonLd;
}

async function getTiles(): Promise<CareerTile[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "careerPage" && order >= 0 && published != false] | order(order asc) { title, slug, order, photo{ ..., asset } }`,
  });
  return data as CareerTile[];
}

export default async function CareersPage() {
  const [jsonLd, tiles] = await Promise.all([getHubJsonLd(), getTiles()]);

  return (
    <>
      <JsonLd raw={jsonLd} />

      {/* ── Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-4">
          Careers
        </h1>
        <p className="text-[20px] font-[300] leading-relaxed text-muted max-w-lg mx-auto">
          We&apos;re always looking for talented, passionate people to join our
          team. Be part of Minnesota&apos;s most award-winning design-build firm.
        </p>
      </section>

      {/* ── Photo-tile grid — the career-page loop-grid treatment, hub-wide (Josh, July 8) ── */}
      <CareersGrid tiles={tiles} />

      {/* ── CTA ── */}
      <section className="bg-[#f7f4ef] py-14 px-6 text-center border-t border-gray-100">
        <p className="text-[20px] font-[300] tracking-[0.08em] text-muted mb-6 max-w-md mx-auto">
          Don&apos;t see the right role? We&apos;d still love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-block border border-ink text-ink text-[10px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}
