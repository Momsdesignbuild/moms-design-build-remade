import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import { PAGE_JSONLD } from "./jsonld";

export const metadata: Metadata = {
  title: { absolute: "Landscaping & Home Remodeling in Minnesota - Mom's Design Build Services" },
  description:
    "Mom's Design Build offers luxury landscape architecture and design, interior design and remodeling, & Fine Gardening in MN. Contact us today!",
  alternates: { canonical: "https://momsdesignbuild.com/services/" },
  openGraph: {
    title: "Landscaping & Home Remodeling in Minnesota - Mom's Design Build Services",
    description:
      "Mom's Design Build offers luxury landscape architecture and design, interior design and remodeling, & Fine Gardening in MN. Contact us today!",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

const SERVICES = [
  {
    title: "Landscape Architecture",
    href: "/services/landscape-architecture",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/04e8d131adca65ec9a98361a52ab66ed44f4e409-768x431.jpg",
    alt: "Mom's Design Build Landscape Architecture — outdoor living design in Minnesota",
    description:
      "We tailor each outdoor living space to suit your lifestyle: from colorful gardens, cozy fire pits, peaceful water features and patios to outdoor kitchens, pavilions, and pool houses. We will help you dream and create your ideal outdoor living environment!",
  },
  {
    title: "Interior Design and Remodeling",
    href: "/services/interior-design-and-remodeling",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/91c34d378586d02a69723e86369183298f13df30-768x512.jpg",
    alt: "Mom's Design Build Interior Design and Remodeling — custom spaces in Minnesota",
    description:
      "Whether your project is new construction, remodeling, or an addition, we combine beauty and function to create custom spaces to fit your lifestyle. From beginning to end– the design, selections, ordering, and building are handled seamlessly by our team.",
  },
  {
    title: "Residential Fine Gardening",
    href: "/services/garden-management",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/955df2aa9dba1df55b7259322038aca03f43ef6d-768x512.jpg",
    alt: "Mom's Fine Gardening — residential garden maintenance in Minnesota",
    description:
      "Our team of horticulturists and gardeners deliver a comprehensive offering of landscape management services including annual container design, bi-weekly maintenance packages, disease and pest control, pond and spa treatments, and seasonal decorating.",
  },
  {
    title: "Commercial Maintenance",
    href: "/services/commerical-maintenance",
    image:
      "https://cdn.sanity.io/images/wavk40jo/production/76b6e92d3cbfa29d0db6230a4f610adec8971951-768x512.jpg",
    alt: "Mom's Commercial Maintenance — professional grounds care in Minnesota",
    description:
      "Your property is often the first impression your business makes, and we ensure it's stunning. Mom's Commercial Maintenance delivers customized plans, luxury-level service, and responsive support to keep your grounds clean, professional, and disruption-free year-round.",
  },
];

// mirrors live /services/ (2026-10-01): four 260×252 photos, the name under each in
// Futura uppercase, the paragraph, a square teal LEARN MORE — no page heading on live
export default function ServicesPage() {
  return (
    <>
      <JsonLd raw={PAGE_JSONLD} />
      <h1 className="sr-only">Our Services — Landscaping &amp; Home Remodeling in Minnesota</h1>
      <section className="px-5 pt-14 md:pt-16 pb-20 bg-white">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5">
          {SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col items-center">
              <Link href={service.href} className="block w-full overflow-hidden mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="w-full aspect-[260/252] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
              <h2 className="font-bold [font-synthesis:weight] text-[26px] md:text-[30.6px] leading-[1.2] tracking-[1.836px] uppercase text-brand-mid text-center mb-5">
                <Link href={service.href}>{service.title}</Link>
              </h2>
              <p className="font-sans text-[18px] font-[300] leading-[1.8] text-brand-mid mb-8 flex-1 self-stretch md:px-1">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-block bg-brand text-white font-sans text-[15px] font-[600] tracking-[1px] uppercase leading-none px-[34px] py-[21px] rounded-[3px] hover:bg-brand-dark transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
