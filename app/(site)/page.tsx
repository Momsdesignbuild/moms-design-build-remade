import Link from "next/link";
import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";

export const metadata: Metadata = {
  title: {
    absolute: "Mom's Design Build - Landscape & Interior Designers In Minnesota",
  },
  description:
    "Mom's Design Build is a MN based custom luxury remodeling & landscaping firm. Learn why we are Minnesota's most awarded design build company.",
};

const SERVICES = [
  {
    title: "Landscape Architecture",
    href: "/services/landscape-architecture",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/04e8d131adca65ec9a98361a52ab66ed44f4e409-768x431.jpg",
    alt: "Mom's Design Build Landscape Architecture — award-winning outdoor design in Minnesota",
  },
  {
    title: "Interior Design and Remodeling",
    href: "/services/interior-design-and-remodeling",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/91c34d378586d02a69723e86369183298f13df30-768x512.jpg",
    alt: "Mom's Design Build Interior Design and Remodeling — custom spaces in Minnesota",
  },
  {
    title: "Residential Fine Gardening",
    href: "/services/garden-management",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/955df2aa9dba1df55b7259322038aca03f43ef6d-768x512.jpg",
    alt: "Mom's Fine Gardening — residential garden maintenance in Minnesota",
  },
  {
    title: "Commercial Maintenance",
    href: "/services/commercial-maintenance",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/76b6e92d3cbfa29d0db6230a4f610adec8971951-768x512.jpg",
    alt: "Mom's Commercial Maintenance — professional grounds maintenance in Minnesota",
  },
];

const AWARDS = [
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/9192ddc536a686c836b89ab2f815d00be444d919-1024x986.jpg",
    alt: "Best of Twin Cities Readers Choice Award 2026 — Mom's Design Build",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/87a0243f7b2a2f5312cb8fb2477c4c4b8bb9c750-1024x885.jpg",
    alt: "Best of 2026 Award Winner — Mom's Design Build",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/45aa3f7afb73803d332d6ec45b1c64dfa20abb87-1024x733.png",
    alt: "Midwest Design Awards 2025 — 1st Place",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/7a35619e845fb0b39d9c56eef931fed94baf248a-600x513.png",
    alt: "NARI Remodeler of the Year Minnesota — Mom's Design Build, Multiple Award Winner",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/a607f7a1a0ec6aa83084f29b212a3f4a353a8187-218x223.png",
    alt: "MNLA Industry Award Winner — Mom's Design Build",
  },
];

const CHARITIES = [
  {
    href: "https://www.bellagoosecoffee.com/freedomcoffee",
    src: "https://cdn.sanity.io/images/wavk40jo/production/ed53609b06c15089bd692409c7414f31b1a10be8-160x160.jpg",
    alt: "Bella Goose Coffee — Freedom Coffee",
  },
  {
    href: "https://connectedfamilies.org/about/",
    src: "https://cdn.sanity.io/images/wavk40jo/production/8ec666d507534feaef21ad0e92a33582ea7ce308-160x160.jpg",
    alt: "Connected Families",
  },
  {
    href: "https://foldsofhonor.org/about-us/",
    src: "https://cdn.sanity.io/images/wavk40jo/production/1a2cf0c161520cc0471523ccb6581ad768fa4ee0-284x148.jpg",
    alt: "Folds of Honor",
  },
  {
    href: "https://faithslodge.org/",
    src: "https://cdn.sanity.io/images/wavk40jo/production/64a2c94db83818c744ef4d9267962a8a04e4e022-142x160.jpg",
    alt: "Faith's Lodge",
  },
  {
    href: "https://griefclubmn.org/",
    src: "https://cdn.sanity.io/images/wavk40jo/production/9e878b9aeaa1f5bf4956a21eac792da2a419f367-102x160.jpg",
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
