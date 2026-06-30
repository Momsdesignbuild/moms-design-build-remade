import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Mom's Design Build Blog - Explore Home & Landscape Design" },
  description:
    "The Mom's Design Build Blog is composed of various current trends and home design ideas that are sure to inspire your next project.",
};

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24 px-6 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-6">
        Blog
      </h1>
      <p className="text-[14px] font-[300] leading-relaxed text-muted max-w-md mb-10">
        Design inspiration, project stories, and expert tips — coming soon.
      </p>
      <Link
        href="/contact"
        className="inline-block bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
      >
        Get in Touch
      </Link>
    </section>
  );
}
