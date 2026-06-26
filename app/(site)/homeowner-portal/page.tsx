import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Homeowner Portal — Buildertrend at Mom's Design Build",
  description:
    "Access the Mom's Design Build homeowner portal powered by Buildertrend. Track your project progress, view selections, and communicate with your team.",
};

export default function HomeownerPortalPage() {
  return (
    <section className="py-16 md:py-24 px-6 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-6">
        Homeowner Portal
      </h1>
      <p className="text-[14px] font-[300] leading-relaxed text-muted max-w-lg mb-10">
        Access Buildertrend to view your project updates, selections, schedules,
        and communicate directly with your project team.
      </p>
      <a
        href="https://buildertrend.net/login"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
      >
        Log In to Buildertrend
      </a>
      <p className="mt-6 text-[12px] font-[300] text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/contact" className="text-brand hover:underline">
          Contact your project manager.
        </Link>
      </p>
    </section>
  );
}
