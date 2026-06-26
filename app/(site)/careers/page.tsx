import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers at Mom's Design Build",
  description:
    "Join the most award-winning landscape architecture and interior design-build firm in the Midwest. View open positions at Mom's Design Build in Minnesota.",
};

export default function CareersPage() {
  return (
    <section className="py-16 md:py-24 px-6 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-6">
        Careers
      </h1>
      <p className="text-[14px] font-[300] leading-relaxed text-muted max-w-lg mb-10">
        We&apos;re always looking for talented, passionate people to join our
        team. If you&apos;d like to be part of Minnesota&apos;s most
        award-winning design-build firm, we&apos;d love to hear from you.
      </p>
      <Link
        href="/contact"
        className="inline-block bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
      >
        Contact Us
      </Link>
    </section>
  );
}
