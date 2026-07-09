import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { JsonLd } from "@/components/PortableBody";
import { TEAM_JSONLD } from "./jsonld";

export const revalidate = 3600;

const builder = createImageUrlBuilder(client);

export const metadata: Metadata = {
  title: { absolute: "Team Members Archive - Mom's Design Build" },
  // WP's archive has no meta description — ours supplies one
  description:
    "Meet the designers, project managers, and craftspeople behind Mom's Design Build — the most awarded landscape design firm in the Midwest.",
  alternates: { canonical: "https://momsdesignbuild.com/team/" },
};

type Member = {
  name: string;
  slug: { current: string };
  role?: string;
  photo?: SanityImageSource;
};

export default async function TeamPage() {
  const { data: members } = (await sanityFetch({
    query: `*[_type == "teamMember"] | order(order asc, name asc) { name, slug, role, photo }`,
  })) as { data: Member[] };

  return (
    <>
      <JsonLd raw={TEAM_JSONLD} />

      <section className="pt-16 md:pt-24 pb-10 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-4">
          Our Team
        </h1>
      </section>

      <section className="px-4 md:px-6 pb-20 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((m) => (
            <Link key={m.slug.current} href={`/team/${m.slug.current}`} className="group block text-center">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                {m.photo && (
                  <Image
                    src={builder.image(m.photo).width(500).height(667).auto("format").url()}
                    alt={m.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>
              <h2 className="text-[13px] font-[400] tracking-[0.12em] uppercase text-ink">{m.name}</h2>
              {m.role && (
                <p className="text-[11px] font-[300] tracking-[0.08em] text-muted mt-1">{m.role}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
