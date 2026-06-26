import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landscape & Interior Design Build Portfolio",
  description:
    "Browse Mom's Design Build portfolio — award-winning landscape architecture, outdoor living spaces, and interior design projects across Minnesota.",
};

// Portfolio images pulled from the actual site's project gallery
const PORTFOLIO_IMAGES = [
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/21420-Excelsior-Blvd_083.jpg",
    alt: "Landscape design project — Excelsior Blvd, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/16918-Stratus-Ct_006.jpg",
    alt: "Exterior and landscape design — Stratus Court, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/07/Moms-Design-Build_Warwick-St_002-1.jpg",
    alt: "Landscape architecture project — Warwick St, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/Moms-Design-Build_W-Lake-St_Twilight_002.jpg",
    alt: "Outdoor living design — West Lake St twilight, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2023/11/400_Dakota_Ave_S_010-1.webp",
    alt: "Landscape design — Dakota Ave project, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/Photographer-Spacecrafting.jpg",
    alt: "Interior design project by Mom's Design Build, Minnesota",
    category: "Interior",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2026/04/Moms-Design-Build_Garden-Grandeur-Project-002-768x431.jpg",
    alt: "Garden Grandeur landscape design project, Minnesota",
    category: "Landscape",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2023/11/16918-Stratus-Ct_006-768x512.jpg",
    alt: "Landscape and exterior design — Stratus Court project",
    category: "Landscape",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2023/11/6718-Cove-Point-Rd_090-768x512.jpg",
    alt: "Residential fine gardening — Cove Point Rd project",
    category: "Gardening",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2026/04/COV_3155-Galleria_005-768x512.jpg",
    alt: "Commercial maintenance — Galleria property, Minnesota",
    category: "Commercial",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2025/10/Moms-Design-Build-Cool-California-Project-05-1024x683.jpg",
    alt: "Award-winning design project by Mom's Design Build",
    category: "Interior",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2023/11/CoastalCottage-1-1.webp",
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
