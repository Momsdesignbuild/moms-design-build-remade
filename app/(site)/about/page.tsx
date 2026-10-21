import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import { sanityFetch } from "@/sanity/lib/live";
import { getCopy } from "@/sanity/lib/copy";
import Rich from "@/components/Rich";
import { ABOUT_JSONLD } from "./jsonld";

// og:image = the SAME photo WP serves (SHA-verified identical bytes), from Sanity —
// zero WordPress dependency by design
const HERO_IMAGE =
  "https://cdn.sanity.io/images/wavk40jo/production/7eea8bef60c3713a0431574b13024cba6eb7ee2f-2560x1581.jpg";

export const metadata: Metadata = {
  title: { absolute: "About Mom's Design Build - Landscape & Remodeling Design" },
  description:
    "Discover the talented team behind Mom's Design Build, an award-winning landscape and interior remodel design firm based in Minnesota.",
  alternates: { canonical: "https://momsdesignbuild.com/about/" },
  openGraph: {
    title: "About Mom's Design Build - Landscape & Remodeling Design",
    description:
      "Discover the talented team behind Mom's Design Build, an award-winning landscape and interior remodel design firm based in Minnesota.",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
    images: [{ url: HERO_IMAGE, width: 2560, height: 1581, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default async function AboutPage() {
  const c = await getCopy("about");
  // Job titles and photo descriptions live in Sanity (Team Member); the list above is only the fallback
  const { data: people } = (await sanityFetch({
    query: `*[_type == "teamMember"]{ "slug": slug.current, role, "alt": photo.alt }`,
  })) as { data: { slug: string; role?: string; alt?: string }[] };
  const bySlug = new Map(people.map((p) => [p.slug, p]));
  const sanityFor = (href: string) => bySlug.get(href.split("/").pop() ?? "");
  return (
    <>
      <JsonLd raw={ABOUT_JSONLD} />

      {/* ── Hero ── */}
      {/* Was a fixed-height crop (h-[55vw] max-h-[600px]) with object-cover
          biased toward the bottom of the frame — on any screen wider than
          ~1090px the height cap kicked in while width kept growing, cropping
          progressively more of the top of the photo (where people's heads
          are). Locked to the source photo's real aspect ratio instead, so
          the whole crew is always visible, at any screen width (Josh, 8/17). */}
      {/* 8/19: full-aspect hero filled a laptop viewport — nothing visible
          below the photo. Section is 30% shorter; the crop removes the TOP
          30% of the frame (sky/building), bottom-anchored so the crew stays
          in view (aspect 2560/1107 = 70% of the photo's real height). */}
      <section className="relative w-full max-w-[1800px] mx-auto aspect-[2560/1107] min-h-[280px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.heroImage.url}
          alt={c.heroImage.alt}
          className="w-full h-full object-cover object-bottom"
          loading="eager"
        />
      </section>

      {/* ── Story ── */}
      <section className="py-16 md:py-24 px-6 bg-white" aria-labelledby="story-heading">
        <div className="max-w-[1050px] mx-auto text-center">
          <h1
            id="story-heading"
            className="text-[22px] md:text-[28px] font-[300] tracking-[0.22em] uppercase text-ink mb-8"
          >
            {c.storyHeading}
          </h1>
          <div className="space-y-5 text-[20px] md:text-[20px] font-[300] leading-[1.8] text-brand-mid text-left md:text-center">
            {c.story.map((para, i) => (
              <p key={i}>
                <Rich text={para} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="py-16 px-6 bg-white double-rule"
        aria-labelledby="team-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <h2
            id="team-heading"
            className="text-center text-[24px] md:text-[28px] font-[300] tracking-[0.22em] uppercase text-brand mb-12"
          >
            {c.teamHeading}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {c.team.map((member) => (
              <div key={member.name} className="group">
                <Link href={member.href} className="block">
                  <div className="overflow-hidden mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo.url}
                      alt={sanityFor(member.href)?.alt || member.photo.alt}
                      loading="lazy"
                      className="w-full aspect-square object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[20px] font-[500] tracking-[0.14em] uppercase text-brand border-b border-brand/20 pb-1.5 mb-1.5">
                    {member.name}
                  </p>
                </Link>
                <p className="text-[20px] font-[300] tracking-[0.06em] uppercase text-ink">
                  {sanityFor(member.href)?.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section
        className="py-16 md:py-20 px-6 bg-white double-rule"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-[1050px] mx-auto text-center">
          <h2
            id="mission-heading"
            className="text-[26px] md:text-[35px] font-[300] tracking-[0.22em] uppercase text-brand mb-6"
          >
            {c.missionHeading}
          </h2>
          <p className="text-[20px] font-[300] leading-[1.9] text-muted italic">
            &ldquo;{c.mission}&rdquo;
          </p>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section
        className="py-16 md:py-20 px-6 bg-white double-rule"
        aria-labelledby="values-heading"
      >
        <div className="max-w-[1050px] mx-auto text-center">
          <h2
            id="values-heading"
            className="text-[26px] md:text-[35px] font-[300] tracking-[0.22em] uppercase text-brand mb-10"
          >
            {c.valuesHeading}
          </h2>
          <ol className="flex flex-col gap-4">
            {c.values.map((value, i) => (
              <li
                key={value}
                className="flex items-center gap-4 text-[20px] font-[300] tracking-[0.1em] uppercase text-ink"
              >
                <span className="text-brand font-[400] text-[20px] w-6 text-right flex-shrink-0">
                  {i + 1}.
                </span>
                {value}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 bg-white border-t border-gray-100 text-center">
        <Link
          href={c.ctaHref}
          className="inline-block bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
        >
          {c.ctaLabel}
        </Link>
      </section>
    </>
  );
}
