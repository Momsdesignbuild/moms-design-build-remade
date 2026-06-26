import Link from "next/link";
import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";

export const metadata: Metadata = {
  title: {
    absolute: "Mom's Design Build - Landscape & Interior Designers In Minnesota",
  },
  description:
    "At Mom's Design Build, we believe in creating spaces that inspire the human spirit to live fully present. Award-winning landscape architecture, interior design, and remodeling in Minnesota.",
};

const SERVICES = [
  {
    title: "Landscape Architecture",
    href: "/services/landscape-architecture",
    image:
      "https://momsdesignbuild.com/wp-content/uploads/2026/04/Moms-Design-Build_Garden-Grandeur-Project-002-768x431.jpg",
    alt: "Mom's Design Build Landscape Architecture — award-winning outdoor design in Minnesota",
  },
  {
    title: "Interior Design and Remodeling",
    href: "/services/interior-design-and-remodeling",
    image:
      "https://momsdesignbuild.com/wp-content/uploads/2023/11/16918-Stratus-Ct_006-768x512.jpg",
    alt: "Mom's Design Build Interior Design and Remodeling — custom spaces in Minnesota",
  },
  {
    title: "Residential Fine Gardening",
    href: "/services/garden-management",
    image:
      "https://momsdesignbuild.com/wp-content/uploads/2023/11/6718-Cove-Point-Rd_090-768x512.jpg",
    alt: "Mom's Fine Gardening — residential garden maintenance in Minnesota",
  },
  {
    title: "Commercial Maintenance",
    href: "/services/commercial-maintenance",
    image:
      "https://momsdesignbuild.com/wp-content/uploads/2026/04/COV_3155-Galleria_005-768x512.jpg",
    alt: "Mom's Commercial Maintenance — professional grounds maintenance in Minnesota",
  },
];

const AWARDS = [
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2026/04/Best-of-Twin-Cities-Readers-Choice-Award-2026-Moms-Design-Build-1024x986.jpg",
    alt: "Best of Twin Cities Readers Choice Award 2026 — Mom's Design Build",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2026/04/Best-of-2026-Award-Winner-Business-Rate-Moms-Design-Build-1024x885.jpg",
    alt: "Best of 2026 Award Winner — Mom's Design Build",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2026/04/Midwest-Design-Awards-2025-1st-Place-1024x733.png",
    alt: "Midwest Design Awards 2025 — 1st Place",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2026/04/PNG2025-NARI_RotY-MINNESOTA-WinnerMultipleAwards_CLR.png",
    alt: "NARI Remodeler of the Year Minnesota — Mom's Design Build, Multiple Award Winner",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2026/04/MNLA-Industry-Award-Winner-Moms-Design-Build-e1775482345107.png",
    alt: "MNLA Industry Award Winner — Mom's Design Build",
  },
];

const CHARITIES = [
  {
    href: "https://www.bellagoosecoffee.com/freedomcoffee",
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/11/Bella-Goose-N.jpg",
    alt: "Bella Goose Coffee — Freedom Coffee",
  },
  {
    href: "https://connectedfamilies.org/about/",
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/11/450.jpg",
    alt: "Connected Families",
  },
  {
    href: "https://foldsofhonor.org/about-us/",
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/11/star-50.jpg",
    alt: "Folds of Honor",
  },
  {
    href: "https://faithslodge.org/",
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/11/Faiths-Lodge-N.jpg",
    alt: "Faith's Lodge",
  },
  {
    href: "https://griefclubmn.org/",
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/11/Grief-Club-of-MN-N.jpg",
    alt: "Grief Club of Minnesota",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero Slider ── */}
      <section aria-label="Portfolio image gallery">
        <HeroSlider />
      </section>

      {/* ── Build Your Legacy ── */}
      <section className="py-16 md:py-24 px-6 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-8">
            Build Your Legacy
          </h1>
          <div className="space-y-5 text-[14.5px] font-[300] leading-[1.85] text-muted max-w-2xl mx-auto">
            <p>
              At Mom&apos;s Design Build, we believe in creating spaces that
              inspire the human spirit to live fully present. If it&apos;s a
              dream backyard or cozy basement hideaway, we craft beautiful,
              thoughtful living spaces that inspire the soul to rest, retreat,
              connect and play.
            </p>
            <p>
              There is no place like home. Whether from a long journey or just
              today&apos;s adventure, once you reach your own front door, you
              cease to be the weary traveler — you&apos;ve arrived. We transcend
              landscaping and remodeling to craft distinctive, thoughtful living
              spaces.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-block mt-10 bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            View Our Portfolio
          </Link>
        </div>
      </section>

      {/* ── Service Offerings ── */}
      <section className="pb-20 px-6 bg-white" aria-labelledby="services-heading">
        <div className="max-w-[1400px] mx-auto">
          <h2
            id="services-heading"
            className="text-center text-[13px] font-[300] tracking-[0.28em] uppercase text-ink mb-8"
          >
            Service Offerings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SERVICES.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="bg-brand text-white text-center py-3 px-4">
                  <span className="text-[10.5px] font-[600] tracking-[0.18em] uppercase">
                    {service.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buildertrend ── */}
      <section
        className="py-20 px-6 bg-white border-t border-gray-100"
        aria-labelledby="buildertrend-heading"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2
            id="buildertrend-heading"
            className="text-[22px] font-[300] tracking-[0.2em] uppercase text-ink mb-5"
          >
            Buildertrend at Mom&apos;s
          </h2>
          <p className="text-[14px] font-[300] leading-[1.85] text-muted">
            Buildertrend is the project management program we use to communicate
            important information about your project, from the design phase
            throughout its completion.
          </p>
          <Link
            href="/homeowner-portal"
            className="inline-block mt-8 bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* ── Awards ── */}
      <section
        className="py-20 px-6 bg-white border-t border-gray-100"
        aria-labelledby="awards-heading"
      >
        <div className="max-w-[1000px] mx-auto text-center">
          <h2
            id="awards-heading"
            className="text-[22px] font-[300] tracking-[0.2em] uppercase text-ink mb-3"
          >
            The Most Award-Winning in the Midwest
          </h2>
          <p className="text-[11.5px] font-[300] tracking-[0.2em] uppercase text-muted mb-10">
            Recognized By:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {AWARDS.map((award) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={award.alt}
                src={award.src}
                alt={award.alt}
                loading="lazy"
                className="h-[80px] w-auto object-contain"
              />
            ))}
          </div>
          <p className="mt-8 text-[13px] font-[300] text-muted">
            + HGTV, Rivard Stone, &amp; Others
          </p>
        </div>
      </section>

      {/* ── Giving Back ── */}
      <section
        className="py-20 px-6 bg-white border-t border-gray-100"
        aria-labelledby="giving-heading"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="giving-heading"
            className="text-[22px] font-[300] tracking-[0.2em] uppercase text-ink mb-6"
          >
            Giving Back
          </h2>
          <p className="text-[14px] font-[300] leading-[1.85] text-muted mb-10">
            A pillar of our purpose statement reads: &ldquo;Love our community.
            We give generously to impact people in need.&rdquo; From this
            foundational value grew our Giving Back Initiative — where all
            consultation fees are donated to a community organization. We are
            honored to share the story of our partners.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            {CHARITIES.map((charity) => (
              <a
                key={charity.alt}
                href={charity.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={charity.src}
                  alt={charity.alt}
                  loading="lazy"
                  className="h-[60px] w-auto object-contain"
                />
              </a>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-block bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
          >
            Connect with Us
          </Link>
        </div>
      </section>
    </>
  );
}
