import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

type PortfolioProject = {
  _id: string;
  title: string;
  slug: { current: string };
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  categories?: string[];
  description?: Array<{ _type: string; children?: Array<{ text: string }> }>;
  videoUrl?: string;
  designerName?: string;
  designerSlug?: string;
};

async function getProject(slug: string): Promise<PortfolioProject | null> {
  return client.fetch(
    `*[_type == "portfolioProject" && slug.current == $slug][0] {
      _id, title, slug, metaTitle, metaDescription,
      heroImage, gallery, categories, description,
      videoUrl, designerName, designerSlug
    }`,
    { slug }
  );
}

async function getAdjacentProjects(slug: string) {
  const all = await client.fetch<Array<{ title: string; slug: { current: string }; heroImage?: SanityImageSource }>>(
    `*[_type == "portfolioProject"] | order(order asc, _createdAt asc) {
      title, slug, heroImage
    }`
  );
  const idx = all.findIndex((p) => p.slug.current === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.metaTitle || `${project.title} | Mom's Design Build`,
    description:
      project.metaDescription ||
      `View the ${project.title} project by Mom's Design Build — landscape architecture and outdoor living design in Minnesota.`,
    openGraph: project.heroImage
      ? {
          images: [
            {
              url: urlFor(project.heroImage).width(1200).height(630).auto("format").url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "portfolioProject"] { slug }`
  );
  return slugs.map((p) => ({ slug: p.slug.current }));
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, adjacent] = await Promise.all([
    getProject(slug),
    getAdjacentProjects(slug),
  ]);

  if (!project) notFound();

  const heroUrl = project.heroImage
    ? urlFor(project.heroImage).width(1600).auto("format").url()
    : null;

  const category = project.categories?.[0] ?? "";

  return (
    <>
      {/* ── Hero ── */}
      {heroUrl && (
        <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden bg-gray-100">
          <Image
            src={heroUrl}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-end p-8 md:p-16">
            <div>
              {category && (
                <p className="text-white/70 text-[10px] font-[500] tracking-[0.25em] uppercase mb-2">
                  {category}
                </p>
              )}
              <h1 className="text-white text-[24px] md:text-[40px] font-[300] tracking-[0.15em] uppercase">
                {project.title}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* ── Content ── */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        {!heroUrl && (
          <h1 className="text-[24px] md:text-[36px] font-[300] tracking-[0.15em] uppercase text-ink mb-8">
            {project.title}
          </h1>
        )}

        {project.description && project.description.length > 0 && (
          <div className="prose prose-sm max-w-none text-muted font-[300] tracking-[0.05em] leading-relaxed">
            {project.description.map((block, i) => {
              if (block._type === "block" && block.children) {
                const text = block.children.map((c) => c.text).join("");
                return text ? <p key={i}>{text}</p> : null;
              }
              return null;
            })}
          </div>
        )}
      </section>

      {/* ── Video ── */}
      {project.videoUrl && (
        <section className="px-4 md:px-6 pb-10 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={`${project.title} — project video`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="px-4 md:px-6 pb-20 bg-white">
          <div className="max-w-[1400px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
            {project.gallery.map((img, i) => {
              const url = urlFor(img).width(900).auto("format").url();
              return (
                <div key={i} className="break-inside-avoid overflow-hidden">
                  <Image
                    src={url}
                    alt={`${project.title} — photo ${i + 1}`}
                    width={900}
                    height={600}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Designer Attribution ── */}
      {project.designerName && project.designerName !== "Mom's Design Build" && (
        <section className="px-6 py-8 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-[12px] font-[300] tracking-[0.1em] text-muted">
              Designed by{" "}
              {project.designerSlug ? (
                <Link
                  href={`/team/${project.designerSlug}`}
                  className="text-ink hover:underline"
                >
                  {project.designerName}
                </Link>
              ) : (
                <span className="text-ink">{project.designerName}</span>
              )}{" "}
              of Mom&apos;s Design Build
            </p>
          </div>
        </section>
      )}

      {/* ── Navigation ── */}
      <nav className="border-t border-gray-100 px-6 py-10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          {adjacent.prev ? (
            <Link
              href={`/portfolio/${adjacent.prev.slug.current}`}
              className="group flex items-center gap-3 text-[11px] font-[400] tracking-[0.15em] uppercase text-muted hover:text-ink transition-colors"
            >
              <span className="text-[16px] transition-transform group-hover:-translate-x-1">←</span>
              <span className="max-w-[180px] truncate">{adjacent.prev.title}</span>
            </Link>
          ) : (
            <span />
          )}

          <Link
            href="/portfolio"
            className="text-[10px] font-[500] tracking-[0.2em] uppercase text-muted hover:text-ink transition-colors"
          >
            All Projects
          </Link>

          {adjacent.next ? (
            <Link
              href={`/portfolio/${adjacent.next.slug.current}`}
              className="group flex items-center gap-3 text-[11px] font-[400] tracking-[0.15em] uppercase text-muted hover:text-ink transition-colors"
            >
              <span className="max-w-[180px] truncate text-right">{adjacent.next.title}</span>
              <span className="text-[16px] transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>

      {/* ── CTA ── */}
      <section className="bg-[#f7f4ef] py-16 px-6 text-center">
        <h2 className="text-[18px] md:text-[22px] font-[300] tracking-[0.2em] uppercase text-ink mb-4">
          Start Your Project
        </h2>
        <p className="text-[13px] font-[300] tracking-[0.08em] text-muted mb-8 max-w-md mx-auto">
          Ready to transform your outdoor or interior space? Let's talk.
        </p>
        <Link
          href="/contact"
          className="inline-block border border-ink text-ink text-[10px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}
