import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { APPLICATION_JSONLD } from "./jsonld";

// Their WP page is an interactive form — forms can't be carbon-copied, so this
// is a working rebuild. SEO head matches THEIRS (title, canonical, JSON-LD).
export const metadata: Metadata = {
  title: { absolute: "Job Application - Mom's Design Build" },
  description:
    "Apply to join Mom's Design Build — Minnesota's most award-winning landscape design-build and remodeling team.",
  alternates: { canonical: "https://momsdesignbuild.com/application/" },
};

export default function ApplicationPage() {
  return (
    <>
      <JsonLd raw={APPLICATION_JSONLD} />

      <section className="pt-16 md:pt-20 pb-10 px-6 text-center">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-4">
          Job Application
        </h1>
        <p className="text-[13px] font-[300] tracking-[0.06em] leading-relaxed text-muted max-w-lg mx-auto">
          Interested in building extraordinary spaces with us? Tell us who you are —
          or browse our{" "}
          <Link href="/careers" className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink">
            open positions
          </Link>{" "}
          first.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
