import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Process — The Mom's Way",
  description:
    "Learn about Mom's Design Build's proven design-build process — from initial consultation through project completion. The Mom's Way ensures a seamless experience.",
};

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We begin with a conversation to understand your vision, lifestyle, and goals for your space.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our designers craft a custom plan tailored to your property, preferences, and budget.",
  },
  {
    number: "03",
    title: "Selections",
    description:
      "Together we select every material, plant, and finish to bring your vision to life.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Our experienced crews execute the plan with precision, managed through Buildertrend for full transparency.",
  },
  {
    number: "05",
    title: "Completion",
    description:
      "We walk through every detail together to ensure your complete satisfaction before calling it done.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-4">
          The Mom&apos;s Way
        </h1>
        <p className="text-[14px] font-[300] leading-relaxed text-muted max-w-lg mx-auto">
          Our proven design-build process guides every project from first
          conversation to final walkthrough.
        </p>
      </section>

      <section className="px-6 pb-20 bg-white">
        <div className="max-w-[800px] mx-auto flex flex-col gap-10">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex gap-8 items-start pb-10 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <span className="text-[32px] font-[300] text-brand/30 leading-none flex-shrink-0 w-12 text-right">
                {step.number}
              </span>
              <div>
                <h2 className="text-[15px] font-[500] tracking-[0.18em] uppercase text-ink mb-3">
                  {step.title}
                </h2>
                <p className="text-[14px] font-[300] leading-[1.85] text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-white border-t border-gray-100 text-center">
        <h2 className="text-[18px] font-[300] tracking-[0.2em] uppercase text-ink mb-5">
          Buildertrend at Mom&apos;s
        </h2>
        <p className="text-[14px] font-[300] leading-relaxed text-muted max-w-lg mx-auto mb-8">
          Buildertrend is the project management program we use to communicate
          important information about your project, from the design phase
          throughout its completion.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/homeowner-portal"
            className="inline-block bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
          >
            Homeowner Portal
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-brand text-brand text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand hover:text-white transition-colors duration-200"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
