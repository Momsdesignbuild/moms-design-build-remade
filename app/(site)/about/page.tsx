import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Mom's Design Build - Landscape & Remodeling Design",
  description:
    "Meet the award-winning team behind Mom's Design Build — Minnesota's most recognized landscape architecture and interior design-build firm. Founded by Jim Sweeney in 1993.",
};

const TEAM = [
  {
    name: "Jim Sweeney",
    role: "Founder/CEO",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Jim-BW-Square-1024x1024.jpg",
    href: "/team/jim-sweeney",
  },
  {
    name: "Craig Weckman",
    role: "Chief Operating Officer",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Craig-BW-Square-1024x1024.jpg",
    href: "/team/craig-weckman",
  },
  {
    name: "Becca Bastyr",
    role: "Senior Landscape Designer",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Becca-BW-Square-1024x1024.jpg",
    href: "/team/becca-bastyr",
  },
  {
    name: "Heather Sweeney",
    role: "Senior Landscape Designer",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Heather-BW-Square-1024x1024.jpg",
    href: "/team/heather-sweeney",
  },
  {
    name: "Melissa Mlejnek",
    role: "Senior Interior Designer",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Melissa-BW-Square-1024x1024.jpg",
    href: "/team/melissa-mlejnek",
  },
  {
    name: "Owen Sweeney",
    role: "Landscape Designer",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Owen-BW-Square-1024x1024.jpg",
    href: "/team/owen-sweeney",
  },
  {
    name: "Brittney Udenberg",
    role: "Landscape Designer",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Britt-BW-Square-1024x1024.jpg",
    href: "/team/brittney-udenberg",
  },
  {
    name: "Cherilyn Tangen",
    role: "Office Manager",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Cherilyn-BW-Square-1024x1024.jpg",
    href: "/team/cherilyn-tangen",
  },
  {
    name: "Natalie Hahn",
    role: "Director of Fine Gardening",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Natalie-BW-Square-1024x1024.jpg",
    href: "/team/natalie-hahn",
  },
  {
    name: "Mike Weckman",
    role: "Director of Remodeling & Construction",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Mike-BW-Square-1024x1024.jpg",
    href: "/team/mike-weckman",
  },
  {
    name: "Kelly Lindell",
    role: "Director of Operations",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2025/02/Kelly-BW-Square-1024x1024.jpg",
    href: "/team/kelly-lindell",
  },
  {
    name: "Alex Birkenbeuel",
    role: "Commercial Maintenance & Operations Manager",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2026/02/Alex-Birkenbeuel-BW-Square-1024x1024.jpg",
    href: "/team/alex-birkenbeuel",
  },
  {
    name: "Kelley Woodhead",
    role: "Project Manager",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Kelley-BW-Square-1024x1024.jpg",
    href: "/team/kelley-woodhead",
  },
  {
    name: "Tony Denman",
    role: "Project Manager",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Tony-BW-Square-1024x1024.jpg",
    href: "/team/tony-denman",
  },
  {
    name: "Chris Moller",
    role: "Production Specialty Manager",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/05/Chris-BW-Square-1024x1024.jpg",
    href: "/team/chris-moller",
  },
  {
    name: "Cara Anderson",
    role: "Project Coordinator",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2025/03/Cara-BW-Square-1024x1024.jpg",
    href: "/team/cara-anderson",
  },
  {
    name: "Jay Forbes",
    role: "Project Coordinator",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2024/08/Jay-BW-Square-1024x1024.jpg",
    href: "/team/jay-forbes",
  },
  {
    name: "Summer Ostendorf",
    role: "Director of Marketing",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2024/08/Summer-BW-Square-1024x1024.jpg",
    href: "/team/summer-ostendorf",
  },
  {
    name: "Ingrid Liljenquist",
    role: "Marketing Coordinator",
    photo:
      "https://momsdesignbuild.com/wp-content/uploads/2023/11/Ingrid-BW-Square-1024x1024.jpg",
    href: "/team/ingrid-liljenquist",
  },
];

const CORE_VALUES = [
  "People Matter",
  "Show Up and Give a Bit",
  "Respect",
  "Be Grateful and Positive",
  "Prepare and Adapt",
  "Make it Better Tomorrow",
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-[55vw] max-h-[600px] min-h-[280px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://momsdesignbuild.com/wp-content/uploads/2025/08/web_2025_Team_Photos01_crop_.jpg"
          alt="The Mom's Design Build team — Minnesota's most award-winning design-build firm"
          className="w-full h-full object-cover object-top"
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
          <div className="space-y-5 text-[14.5px] font-[300] leading-[1.85] text-muted text-left md:text-center">
            <p>
              Simple as it may seem,{" "}
              <em className="text-brand not-italic">
                the Mom&apos;s name refers to a philosophy
              </em>{" "}
              — a belief we hold that people matter.
            </p>
            <p>
              Founder Jim Sweeney grew up in a lively home with eight siblings —
              filled with laughter, occasional bickering, and the constant hustle
              of meals and daily chaos. As the story goes, Jim recalls the one
              thing rising above the chaos was his mom&apos;s unwavering care
              and strength. In her presence, he always found a listening ear, a
              devoted problem solver, and a steadfast champion of his spirit.
            </p>
            <p>
              In 1993, Jim founded Mom&apos;s Landscaping with those qualities
              in mind. He set out to build a company that would be a champion for
              the human spirit. A company who would embody a relentless desire to
              serve others.
            </p>
            <p>
              Through building strong relationships and a commitment to quality,
              Mom&apos;s Landscaping grew from just a couple of guys with a
              lawnmower into{" "}
              <em className="text-brand not-italic">
                the most award-winning design-build firm in the Midwest
              </em>{" "}
              — now known as Mom&apos;s Design Build. Jim Sweeney and his
              business partner Craig Weckman have a half century of combined
              experience in design and construction. Their vast knowledge in the
              industry and progressive vision have a proven track record. Jim and
              Craig credit their success to the talented, professional, and
              service-focused team at Mom&apos;s whose skill and artistry are
              lived out every day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="py-16 px-6 bg-white border-t border-gray-100"
        aria-labelledby="team-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <h2
            id="team-heading"
            className="text-center text-[22px] font-[300] tracking-[0.22em] uppercase text-ink mb-12"
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
                      alt={`${member.name} — ${member.role} at Mom's Design Build`}
                      loading="lazy"
                      className="w-full aspect-square object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[12px] font-[500] tracking-[0.14em] uppercase text-brand border-b border-brand/20 pb-1.5 mb-1.5">
                    {member.name}
                  </p>
                </Link>
                <p className="text-[11px] font-[300] tracking-[0.06em] uppercase text-ink">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section
        className="py-16 md:py-20 px-6 bg-white border-t border-gray-100"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="mission-heading"
            className="text-[22px] font-[300] tracking-[0.22em] uppercase text-ink mb-6"
          >
            Our Mission
          </h2>
          <p className="text-[15px] font-[300] leading-[1.9] text-muted italic">
            &ldquo;To serve people through the basis of anthropology,
            horticulture, and architecture, in order to discover, create, and
            enhance distinctive places.&rdquo;
          </p>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section
        className="py-16 md:py-20 px-6 bg-white border-t border-gray-100"
        aria-labelledby="values-heading"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2
            id="values-heading"
            className="text-[22px] font-[300] tracking-[0.22em] uppercase text-ink mb-10"
          >
            Core Values
          </h2>
          <ol className="flex flex-col gap-4">
            {CORE_VALUES.map((value, i) => (
              <li
                key={value}
                className="flex items-center gap-4 text-[13px] font-[300] tracking-[0.1em] uppercase text-ink"
              >
                <span className="text-brand font-[400] text-[15px] w-6 text-right flex-shrink-0">
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
          className="inline-block bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200"
        >
          Work with Our Team
        </Link>
      </section>
    </>
  );
}
