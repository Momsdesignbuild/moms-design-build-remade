import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/PortableBody";
import { PROCESS_JSONLD } from "./jsonld";

// og:image = the exact 768x512 crop WP serves, same bytes, from Sanity
const OG_IMAGE =
  "https://cdn.sanity.io/images/wavk40jo/production/126b88b9f5bf35c72b00dbef22b8802f6ee9ec5c-768x512.jpg";
// their warranty PDF, re-hosted on Sanity (was a wp-content link on their site)
const WARRANTY_PDF =
  "https://cdn.sanity.io/files/wavk40jo/production/73ebc3f295515e599b6fade1738fff0275178b53.pdf";

export const metadata: Metadata = {
  title: { absolute: "Home & Landscape Design Process - Mom's Design Build Company" },
  description:
    "Mom's Design Build is with you throughout the whole design build process from consultation to a tour of your new space. Let's make your project a reality.",
  alternates: { canonical: "https://momsdesignbuild.com/process/" },
  openGraph: {
    title: "Home & Landscape Design Process - Mom's Design Build Company",
    description:
      "Mom's Design Build is with you throughout the whole design build process from consultation to a tour of your new space. Let's make your project a reality.",
    url: "https://momsdesignbuild.com/process/",
    siteName: "Mom's Design Build",
    locale: "en_US",
    type: "article",
    images: [{ url: OG_IMAGE, width: 768, height: 512, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image" },
};

type Step = {
  title: string;
  paras: string[];
  photo?: { url: string; width: number; height: number };
};

const STEPS: Step[] = [
  {
    title: "Creative Process",
    // paragraphs verbatim from their live page
    paras: [
      "Finding the right designer for your home is an important decision, as is selecting the company that will install it. We believe that by being both your design and build company, Mom\u2019s will ultimately make your life a little bit easier and your lifestyle a lot more satisfying.",
      "To help you see the advantage of a seamless vision from beginning to end, let us introduce you to our unique process. It is the attention to detail in every step that makes your project a success!",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/2b4e6787fd4bac092a117cc4aedc320deca4f735-7161x4776.jpg", width: 7161, height: 4776 },
  },
  {
    title: "Initial Consultation and Design Interview",
    // paragraphs verbatim from their live page
    paras: [
      "The first meeting is for us to get to know you and to be introduced to your space. To inspire you, we will proudly show off some of our past achievements. Your designer will listen to your personal dreams and lifestyle needs to inspire a plan for you and your space. At the end of this introductory assessment, we provide a cost estimate for the next phase: developing a comprehensive design.",
      "After receiving the design fee, we are able to move forward and develop a physical plan for the space that you and the designer have envisioned. At this point, the designer will ask for any surveys or architectural plans you may have.",
      "To tailor a space around your unique preferences, your designer will spend time becoming acquainted with you, your tastes and your goals for your lifestyle.",
      "You may choose to explore magazines and websites such as Pinterest and Houzz to build a collection of images that strike your fancy. This can help you (and us) hone in on your style preferences. In the end, we want you to say, \u201cMom\u2019s gets me!\u201d",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/1f939b035c27489dc0ae038fcbce57c3b8d66481-750x501.jpg", width: 750, height: 501 },
  },
  {
    title: "Design Development and Concept Presentation",
    // paragraphs verbatim from their live page
    paras: [
      "After gathering the necessary information, the designer heads back to the drawing board where the magic making begins. The designer melds your insights with his or her own creative inspirations drawn from architecture, art, science and the world around us. This culminates into a design \u2013 not just any design, mind you, a design that is a meaningful reflection of your unique style and accomplishes your goals for how you will experience your home.",
      "The concept presentation is the exciting moment when the designers share their vision for your space: a presentation that includes 3-D renderings, picture pages, perhaps some samples of proposed materials and a feasibility study assessing project costs. These tools facilitate moving onto the next step\u2026turning your dream into reality! The designer works with you to determine the actual scope of the project and to refine some of the details. If needed, we can also recommend an efficient approach to phasing out the construction.",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/eaed7d324d0437f2b6ced1645242478d2bef0d0a-500x375.jpg", width: 500, height: 375 },
  },
  {
    title: "Architectural Detailing, Engineering & Construction Documentation",
    // paragraphs verbatim from their live page
    paras: [
      "Mom\u2019s projects often include custom-designed structures. They are placed and personalized not only to be functional, but to also enhance the overall setting and to beautifully tell the story of your space and how you live. To ensure the story endures, a structural engineer may be brought in to develop the details of design and construction. Depending on the project, engineering may be required by the city, and additional detailing may also be required. We think you\u2019ll agree that the extra cost is worth it.",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/ce6de2ed591aa08acbfc1c846d1dab1da11008fa-500x324.png", width: 500, height: 324 },
  },
  {
    title: "Selections",
    // paragraphs verbatim from their live page
    paras: [
      "Get ready for the really fun part! Even if you typically don\u2019t find pleasure in choosing things like fabrics, lighting, furniture, stone and other decorative elements, your designer is there to guide you and help make it an enjoyable process. It\u2019s this personal attention that results in a project with artistry, energy and soul. You\u2019re going to love it! Seriously.",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/fac2b7742dd5c5c059e1721d65f0b5de37e6899d-350x290.jpg", width: 350, height: 290 },
  },
  {
    title: "Breaking Ground",
    // paragraphs verbatim from their live page
    paras: [
      "Welcome to the wonderful (and somewhat messy) world of construction. This is the phase we like to call, \u201cMuscle, brawn, grit and finesse.\u201d It\u2019s where our proficient teams skillfully merge old world craftsmanship with new world technology as they dive right in to shape your distinctive space. (Here\u2019s a little secret: As tough and focused as these guys may seem, truth is, they\u2019re sensitive craftsmen who understand your daily life goes on amidst their fast-paced activity.)",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/5a69ef7e4226443dc7a2fbc4b0bb24f516b5be96-350x290.jpg", width: 350, height: 290 },
  },
  {
    title: "Your Dreams Realized",
    // paragraphs verbatim from their live page
    paras: [
      "Alas! It\u2019s time to pop open some bubbly and celebrate the achievement of your new lifestyle investment: your completed living space! Your designer (by now your new best friend) will take you on an in-depth tour throughout the finished spaces to highlight the design features, discuss proper maintenance and answer your questions. Hugs all around!",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/068f4ebb8e9b9a867062e26db520ad0f6a58c5c5-500x334.jpg", width: 500, height: 334 },
  },
  {
    title: "Happily Ever After",
    // paragraphs verbatim from their live page
    paras: [
      "Your relationship with Mom\u2019s doesn\u2019t have to end there. We want your newly created space \u2013 and your delight in it \u2013 to last for a long, long, LONG time! With that in mind, we have created a Fine Gardening Division to help you care for your new landscape. We offer flexible service plans to tailor our maintenance offerings to your property.",
    ],
    photo: { url: "https://cdn.sanity.io/images/wavk40jo/production/29f097e61ea26ae6b5f374a70d7dd672bbf6e247-750x500.jpg", width: 750, height: 500 },
  },
  {
    title: "Best in Class Warranty",
    // paragraphs verbatim from their live page
    paras: [
      "Mom\u2019s will take care of you. We want your new space to endure the test of time. To that end, we have developed our warranty with you in mind. We offer a 1-year plant warranty, 5-year hardscape warranty, 10-year deck warranty and so much more! Our goal is your peace of mind. Download the full warranty here.",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd raw={PROCESS_JSONLD} />

      {/* ── Header ── */}
      <section className="pt-20 md:pt-28 pb-14 md:pb-16 px-6 text-center bg-[#F7F5F2]">
        <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-5">The Process</p>
        <h1 className="text-4xl md:text-6xl font-[300] tracking-[0.08em] uppercase text-ink mb-6">
          The Mom&rsquo;s Way
        </h1>
        <p className="text-[20px] md:text-[20px] font-[300] tracking-[0.06em] text-brand-mid max-w-md mx-auto">
          From first conversation to happily ever after.
        </p>
      </section>

      {/* ── Steps: numbered, photo alternates sides; small WP sources never upscaled ── */}
      <section className="px-6 pb-16 pt-6 bg-white">
        <div className="max-w-[1060px] mx-auto flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-14"
            >
              <div className={step.photo && i % 2 === 1 ? "md:order-2" : ""}>
                <p className="text-[20px] font-semibold tracking-[0.26em] uppercase text-brand mb-3">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-[22px] md:text-[26px] font-[300] tracking-[0.1em] uppercase text-brand mb-5">
                  {step.title}
                </h2>
                <div className="space-y-4">
                  {step.paras.map((p, j) => (
                    <p key={j} className="text-[20px] md:text-[20px] font-[300] leading-[1.8] text-brand-mid">
                      {p}
                    </p>
                  ))}
                </div>
                {step.title === "Best in Class Warranty" && (
                  <div className="flex flex-wrap gap-4 mt-8">
                    <a
                      href={WARRANTY_PDF}
                      target="_blank"
                      rel="noopener"
                      className="inline-block bg-ink border border-ink text-white text-[20px] font-[600] tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-white hover:text-ink transition-colors duration-300"
                    >
                      Best in Class Warranty
                    </a>
                    <a
                      href="https://www.paradeofhomes.org/resources/managing-your-home/minimum-performance-guidelines/"
                      target="_blank"
                      rel="noopener"
                      className="inline-block border border-ink text-ink text-[20px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
                    >
                      Minimum Performance Guidelines
                    </a>
                  </div>
                )}
              </div>
              {step.photo && (
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  {/* uniform frame for every step, whatever the source size (Summer, 7/14) */}
                  <div className="bg-white p-3 shadow-[0_30px_60px_-32px_rgba(28,28,26,0.35)] w-full max-w-[520px]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={step.photo.url}
                        alt=""
                        fill
                        priority={i === 0}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 520px"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F7F5F2] py-20 lg:py-24 px-6 text-center">
        <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">Your Turn</p>
        <h2 className="text-2xl md:text-4xl font-[300] tracking-[0.08em] uppercase text-brand mb-5">
          Build Your Legacy
        </h2>
        <p className="text-[20px] font-[300] tracking-[0.06em] text-brand-mid mb-9 max-w-md mx-auto">
          Ready to begin the Mom&rsquo;s Way? Let&rsquo;s talk.
        </p>
        <Link
          href="/contact"
          className="inline-block border border-ink text-ink text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-ink hover:text-white transition-colors duration-300"
        >
          Meet With Us
        </Link>
      </section>
    </>
  );
}
