import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Careers At Mom's Design Build - Explore Job Opportunities" },
  description:
    "Mom's Design Build is looking for talented applicants from designers to builders in MN. Explore our job openings and submit your application today!",
};

const POSITIONS = [
  "Project Manager",
  "Project Coordinator",
  "Fine Gardening Property Manager",
  "Controller & Administrative Director",
  "Gardener",
  "Lead Carpenter",
  "Carpenter",
  "Landscape Crew Lead",
  "Landscape Assistant Crew Lead",
  "Landscape Crew Member",
  "General Application",
];

export default function CareersPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-4">
          Careers
        </h1>
        <p className="text-[14px] font-[300] leading-relaxed text-muted max-w-lg mx-auto">
          We&apos;re always looking for talented, passionate people to join our team. Be part of Minnesota&apos;s most award-winning design-build firm.
        </p>
      </section>

      {/* ── Job Grid ── */}
      <section className="px-4 md:px-6 pb-20 bg-white">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {POSITIONS.map((title) => (
            <Link
              key={title}
              href="/contact"
              className="group border border-gray-200 aspect-square flex items-center justify-center p-6 text-center hover:border-brand hover:bg-brand transition-colors duration-300"
            >
              <span className="text-[11px] font-[500] tracking-[0.18em] uppercase text-muted group-hover:text-white transition-colors duration-300 leading-[1.7]">
                {title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#f7f4ef] py-14 px-6 text-center border-t border-gray-100">
        <p className="text-[13px] font-[300] tracking-[0.08em] text-muted mb-6 max-w-md mx-auto">
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
