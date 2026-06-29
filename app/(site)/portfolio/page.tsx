import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landscape & Interior Design Build Portfolio",
  description:
    "Browse Mom's Design Build portfolio — award-winning landscape architecture, outdoor living spaces, and interior design projects across Minnesota.",
};

// Portfolio images pulled from the actual site's project gallery
const PORTFOLIO_IMAGES = [
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/c47bdf0b295511950d170dec4e3f65b7beb0e131-2400x1602.jpg",
    alt: "Landscape design project — Excelsior Blvd, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/c7f944134634480eae2b0dd964e16d8641465a16-2400x1601.jpg",
    alt: "Exterior and landscape design — Stratus Court, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/c27dd3a0910d5cadd075b3d2b1d8d8becbb69cf3-2400x1600.jpg",
    alt: "Landscape architecture project — Warwick St, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/7e1fde5d29ed59456a5699031caf27ea44b851c5-2400x1601.jpg",
    alt: "Outdoor living design — West Lake St twilight, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/a3f6b6db85ad504043d2c6330ac768afb13f124d-1500x1000.webp",
    alt: "Landscape design — Dakota Ave project, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/9d782a2b5e80a589a0f3f362a940555db07f7980-2400x1600.jpg",
    alt: "Interior design project by Mom's Design Build, Minnesota",
    category: "Interior",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/04e8d131adca65ec9a98361a52ab66ed44f4e409-768x431.jpg",
    alt: "Garden Grandeur landscape design project, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/91c34d378586d02a69723e86369183298f13df30-768x512.jpg",
    alt: "Landscape and exterior design — Stratus Court project",
    category: "Landscape",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/955df2aa9dba1df55b7259322038aca03f43ef6d-768x512.jpg",
    alt: "Residential fine gardening — Cove Point Rd project",
    category: "Gardening",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/76b6e92d3cbfa29d0db6230a4f610adec8971951-768x512.jpg",
    alt: "Commercial maintenance — Galleria property, Minnesota",
    category: "Commercial",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/e08993ae127ec9541b11c1c447806949ba30298e-1024x683.jpg",
    alt: "Award-winning design project by Mom's Design Build",
    category: "Interior",
  },
  {
    src: "https://cdn.sanity.io/images/wavk40jo/production/4b14ddb15bc917daf03fa928df8f5fd6553bfbb6-500x500.webp",
    alt: "Coastal cottage landscape design project, Minnesota",
    category: "Landscape",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">
          Portfolio
        </h1>
        <p className="mt-4 text-[13px] font-[300] tracking-[0.1em] uppercase text-muted">
          Landscape &amp; Interior Design Build Projects
        </p>
      </section>

      {/* ── Masonry-style Grid ── */}
      <section className="px-4 md:px-6 pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {PORTFOLIO_IMAGES.map((image, i) => (
            <div
              key={i}
              className="break-inside-avoid group relative overflow-hidden block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading={i < 4 ? "eager" : "lazy"}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-[10px] font-[500] tracking-[0.15em] uppercase">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
