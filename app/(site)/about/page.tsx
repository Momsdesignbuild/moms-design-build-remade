import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
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
    url: "https://momsdesignbuild.com/about/",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
    images: [{ url: HERO_IMAGE, width: 2560, height: 1581, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image" },
};

// 21 members, THEIR live-page order; photos are SHA-verified WP originals on Sanity CDN
const TEAM = [
  {
    name: "Jim Sweeney",
    role: "Founder/CEO",
    // alt verbatim from THEIR live about page
    alt: "Jim B&W Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/70186490433697653f87fe3f4e28deca0789249d-1024x1024.jpg",
    href: "/team/jim-sweeney",
  },
  {
    name: "Craig Weckman",
    role: "Chief Operating Officer",
    // alt verbatim from THEIR live about page
    alt: "Craig Weckman - COO at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/9b03bc4b6fba9f9a6d9abb896950c93b024affb4-1024x1024.jpg",
    href: "/team/craig-weckman",
  },
  {
    name: "Becca Bastyr",
    role: "Senior Landscape Designer",
    // alt verbatim from THEIR live about page
    alt: "Becca Bastyr - Mom's Design Build Senior Landscape Designer",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/015079607ddfeb5f76a201410bf8f24acfdde6d6-1024x1024.jpg",
    href: "/team/becca-bastyr",
  },
  {
    name: "Heather Sweeney",
    role: "Senior Landscape Designer",
    // alt verbatim from THEIR live about page
    alt: "Heather Sweeney - Senior Landscape Designer at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/ed37799df8fd3c3982cb1396c98a7a76bae6deb0-1024x1024.jpg",
    href: "/team/heather-sweeney",
  },
  {
    name: "Melissa Mlejnek",
    role: "Senior Interior Designer",
    // alt verbatim from THEIR live about page
    alt: "Melissa Mlejnek - Senior Interior Designer - Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/9136ae17e40dd6a507d269c3d3d9af13db3001bc-1024x1024.jpg",
    href: "/team/melissa-mlejnek",
  },
  {
    name: "Owen Sweeney",
    role: "Landscape Designer",
    // alt verbatim from THEIR live about page
    alt: "Owen Sweeney - Landscape Designer - Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/360eb27d6d1b830b982ce36f80c29357b7c52f2c-1024x1024.jpg",
    href: "/team/owen-sweeney",
  },
  {
    name: "Brittney Udenberg",
    role: "Landscape Designer",
    // alt verbatim from THEIR live about page
    alt: "Brittney Udenberg - Designer at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/5125fa61dc71a8db6f5266d8832c07262c1044e4-1024x1024.jpg",
    href: "/team/brittney-udenberg",
  },
  {
    name: "Cherilyn Tangen",
    role: "Office Manager",
    // alt verbatim from THEIR live about page
    alt: "Cherilyn Tangen - Office Manager at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/ac692b8ab5929453e0c02dcdbca8e8c305d49aad-1024x1024.jpg",
    href: "/team/cherilyn-tangen",
  },
  {
    name: "Natalie Hahn",
    role: "Director of Fine Gardening",
    // alt verbatim from THEIR live about page
    alt: "Natalie Hahn - Director of Fine Gardening at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/29fda6846ad76f983f558193edcf9d0951887b3a-1024x1024.jpg",
    href: "/team/natalie-hahn",
  },
  {
    name: "Mike Weckman",
    role: "Director of Remodeling & Construction",
    // alt verbatim from THEIR live about page
    alt: "Mike Weckman - Senior Carpenter at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/34e46a4a72851ae5a184c474c6adcd7dabb68881-1024x1024.jpg",
    href: "/team/mike-weckman",
  },
  {
    name: "Kelly Lindell",
    role: "Director of Operations",
    // alt verbatim from THEIR live about page
    alt: "Kelly Lindell - Director of Operations at Mom's Design Build, Minnesota",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/f7c4351e6a6e2b10c8d6734ca5a2457ace8e2595-1024x1024.jpg",
    href: "/team/kelly-lindell",
  },
  {
    name: "Alex Birkenbeuel",
    role: "Commercial Maintenance & Operations Manager",
    // alt verbatim from THEIR live about page
    alt: "Alex Birkenbeuel - Commerical Maintenance & Operations Manager - Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/8c7192e2fd6a062739c188da4d2c0c9f3767809a-1024x1024.jpg",
    href: "/team/alex-birkenbeuel",
  },
  {
    name: "Kelley Woodhead",
    role: "Project Manager",
    // alt verbatim from THEIR live about page
    alt: "Kelley Woodhead - Project Manager - Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/69a5256da77cecab3e4e514c0b60c111a6733101-1024x1024.jpg",
    href: "/team/kelley-woodhead",
  },
  {
    name: "Tony Denman",
    role: "Project Manager",
    // alt verbatim from THEIR live about page
    alt: "Tony Denman - Project Manager - Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/74b00bb35a4bf0aa30deb119addd695872b34b4e-1024x1024.jpg",
    href: "/team/tony-denman",
  },
  {
    name: "Chris Moller",
    role: "Production Specialty Manager",
    // alt verbatim from THEIR live about page
    alt: "Chris Moller - Production Specialty Manager at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/a102606db43edcfd2b1d625110869b3d24c81bd1-1024x1024.jpg",
    href: "/team/chris-moller",
  },
  {
    name: "Cara Anderson",
    role: "Project Coordinator",
    // alt verbatim from THEIR live about page
    alt: "Project Coordinator at Mom's Design Build - Most Awarded Design Build Firm in the Midwest",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/1a76ee8840fc2cb1f8d313112551545af74cd188-1024x1024.jpg",
    href: "/team/cara-anderson",
  },
  {
    name: "Heather Kubista",
    role: "Project Coordinator",
    // alt verbatim from THEIR live about page
    alt: "Heather Kubista - Project Coordinator at Mom's Design Build - Seamlessly Blending Indoor & Outdoor Living Since 1993",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/c22b38f68e98a49d5686e9c9574506468817eed8-1024x1024.jpg",
    href: "/team/heather-kubista",
  },
  {
    name: "Jay Forbes",
    role: "Project Coordinator",
    // alt verbatim from THEIR live about page
    alt: "Jay Forbes - Project Coordinator - Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/b06b0d13451ce3f6f7ea6410a3366873853bdd82-1024x1024.jpg",
    href: "/team/jay-forbes",
  },
  {
    name: "Summer Ostendorf",
    role: "Director of Marketing",
    // alt verbatim from THEIR live about page
    alt: "Summer Ostendorf - Director of Marketing - Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/e63d8ff6f2331ed31d22e90b018b0170861b6c1b-1024x1024.jpg",
    href: "/team/summer-ostendorf",
  },
  {
    name: "Ingrid Liljenquist",
    role: "Marketing Coordinator",
    // alt verbatim from THEIR live about page
    alt: "Ingrid Liljenquist - Marketing Coordinator at Mom's Design Build",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/84ade2ee920cb1b830204fa75a0730e90b30945c-1024x1024.jpg",
    href: "/team/ingrid-liljenquist",
  },
  {
    name: "Jazper Wiebusch",
    role: "Social Media Specialist",
    // alt verbatim from THEIR live about page
    alt: "Social Media Specialist at Mom's Design Build - The Most Awarded Design Build Firm in the Midwest - Jazper Wiebusch",
    photo:
      "https://cdn.sanity.io/images/wavk40jo/production/889be4555ddc033829a5eb60939ddfeff26e9d31-1024x1024.jpg",
    href: "/team/jazper-wiebusch",
  },
];

// verbatim from THEIR live about page — including the $#!T, that's their brand voice
const CORE_VALUES = [
  "People Matter",
  "Show Up and Give a $#!T",
  "Respect",
  "Be Grateful and Positive",
  "Prepare and Adapt",
  "Make a Better Tomorrow",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd raw={ABOUT_JSONLD} />

      {/* ── Hero ── */}
      <section className="relative w-full h-[55vw] max-h-[600px] min-h-[280px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Mom's Design Build - Meet the Team!"
          className="w-full h-full object-cover object-[center_75%]"
          loading="eager"
        />
      </section>

      {/* ── Story ── */}
      <section className="py-16 md:py-24 px-6 bg-white" aria-labelledby="story-heading">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            id="story-heading"
            className="text-[22px] md:text-[28px] font-[300] tracking-[0.22em] uppercase text-ink mb-8"
          >
            The Story Behind the Name
          </h1>
          <div className="space-y-5 text-[20px] md:text-[20px] font-[300] leading-[1.8] text-brand-mid text-left md:text-center">
            {/* verbatim from their live page — curly apostrophes + unspaced em-dashes are THEIRS */}
            <p>
              Simple as it may seem,{" "}
              <em className="text-brand not-italic">the Mom’s name refers to a philosophy</em>
              —a belief we hold that people matter.
            </p>
            <p>
              Founder Jim Sweeney grew up in a lively home with eight siblings—filled with
              laughter, occasional bickering, and the constant hustle of meals and daily chaos.
              As the story goes, Jim recalls the one thing rising above the chaos was his
              mom’s unwavering care and strength. In her presence, he always found a listening
              ear, a devoted problem solver, and a steadfast champion of his spirit.
            </p>
            <p>
              In 1993, Jim founded Mom’s Landscaping with those qualities in mind. He set out
              to build a company that would be a champion for the human spirit. A company who
              would embody a relentless desire to serve others.
            </p>
            <p>
              Through building strong relationships and a commitment to quality, Mom’s
              Landscaping grew from just a couple of guys with a lawnmower into{" "}
              <em className="text-brand not-italic">
                the most award-winning design-build firm in the Midwest
              </em>
              —now known as Mom’s Design Build. Jim Sweeney and his business partner Craig
              Weckman have a half century of combined experience in design and construction.
              Their vast knowledge in the industry and progressive vision have a proven track
              record. Jim and Craig credit their success to the talented, professional, and
              service-focused team at Mom’s whose skill and artistry are lived out every day.
            </p>
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
            Meet Our Award-Winning Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="group">
                <Link href={member.href} className="block">
                  <div className="overflow-hidden mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo}
                      alt={member.alt}
                      loading="lazy"
                      className="w-full aspect-square object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[20px] font-[500] tracking-[0.14em] uppercase text-brand border-b border-brand/20 pb-1.5 mb-1.5">
                    {member.name}
                  </p>
                </Link>
                <p className="text-[20px] font-[300] tracking-[0.06em] uppercase text-ink">
                  {member.role}
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
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="mission-heading"
            className="text-[24px] md:text-[28px] font-[300] tracking-[0.22em] uppercase text-brand mb-6"
          >
            Our Mission
          </h2>
          <p className="text-[20px] font-[300] leading-[1.9] text-muted italic">
            &ldquo;To serve people through the fusion of anthropology,
            horticulture, and architecture, in order to discover, create, and
            enhance distinctive places.&rdquo;
          </p>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section
        className="py-16 md:py-20 px-6 bg-white double-rule"
        aria-labelledby="values-heading"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2
            id="values-heading"
            className="text-[24px] md:text-[28px] font-[300] tracking-[0.22em] uppercase text-brand mb-10"
          >
            Core Values
          </h2>
          <ol className="flex flex-col gap-4">
            {CORE_VALUES.map((value, i) => (
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
          href="/contact"
          className="inline-block bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
        >
          Work with Our Team
        </Link>
      </section>
    </>
  );
}
