import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Landscape & Interior Design Build Portfolio | Mom's Design Build",
  description:
    "Browse Mom's Design Build portfolio — award-winning landscape architecture, outdoor living spaces, and interior design projects across Minnesota.",
};

// Revalidate every hour
export const revalidate = 3600;

const builder = createImageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

type PortfolioProject = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: SanityImageSource;
  categories?: string[];
};

async function getProjects(): Promise<PortfolioProject[]> {
  return client.fetch(
    `*[_type == "portfolioProject"] | order(order asc, _createdAt asc) {
      _id, title, slug, heroImage, categories
    }`
  );
}

export default async function PortfolioPage() {
  const projects = await getProjects();

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
          {projects.map((project, i) => {
            const imgUrl = project.heroImage
              ? urlFor(project.heroImage).width(800).auto("format").url()
              : null;
            const category = project.categories?.[0] ?? "";

            return (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug.current}`}
                className="break-inside-avoid group relative overflow-hidden block"
              >
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={project.title}
                    width={800}
                    height={600}
                    loading={i < 8 ? "eager" : "lazy"}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gray-100" />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-[11px] font-[500] tracking-[0.15em] uppercase leading-none">
                      {project.title}
                    </p>
                    {category && (
                      <p className="text-white/70 text-[9px] font-[400] tracking-[0.12em] uppercase mt-1">
                        {category}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
