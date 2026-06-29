import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home & Landscape Design Process -- The Mom's Way | Mom's Design Build",
  description:
    "Learn about Mom's Design Build's proven design-build process -- from initial consultation and concept design through construction and warranty. The Mom's Way.",
};

const STEPS = [
  {
    title: "Creative Process",
    body: "Finding the right designer for your home is an important decision, as is selecting the company that will install it. We believe that by being both your design and build company, Mom's will ultimately make your life a little bit easier and your lifestyle a lot more satisfying. It is the attention to detail in every step that makes your project a success.",
  },
  {
    title: "Initial Consultation & Design Interview",
    body: "The first meeting is for us to get to know you and to be introduced to your space. Your designer will listen to your personal dreams and lifestyle needs to inspire a plan for you. At the end of this introductory assessment, we provide a cost estimate for the next phase: developing a comprehensive design. To tailor a space around your unique preferences, your designer will spend time becoming acquainted with you, your tastes and your goals for your lifestyle. You may choose to explore magazines and websites such as Pinterest and Houzz to build a collection of images that strike your fancy. In the end, we want you to say: Mom's gets me!",
  },
  {
    title: "Design Development & Concept Presentation",
    body: "The designer melds your insights with his or her own creative inspirations drawn from architecture, art, science and the world around us. This culminates into a design that is a meaningful reflection of your unique style and accomplishes your goals for how you will experience your home. The concept presentation includes 3-D renderings, picture pages, samples of proposed materials and a feasibility study assessing project costs. The designer works with you to determine the actual scope of the project and refine the details.",
  },
  {
    title: "Architectural Detailing, Engineering & Construction Documentation",
    body: "Mom's projects often include custom-designed structures placed and personalized not only to be functional, but to enhance the overall setting and beautifully tell the story of your space. To ensure the story endures, a structural engineer may be brought in to develop the details of design and construction. Depending on the project, engineering may be required by the city. We think you'll agree that the extra attention is worth it.",
  },
  {
    title: "Selections",
    body: "Get ready for the really fun part! Even if you typically don't find pleasure in choosing things like fabrics, lighting, furniture, stone and other decorative elements, your designer is there to guide you and help make it an enjoyable process. It's this personal attention that results in a project with artistry, energy and soul. You're going to love it. Seriously.",
  },
  {
    title: "Breaking Ground",
    body: "Welcome to the wonderful (and somewhat messy) world of construction. This is the phase we like to call: Muscle, brawn, grit and finesse. It's where our proficient teams skillfully merge old world craftsmanship with new world technology as they dive right in to shape your distinctive space.",
  },
  {
    title: "Your Dreams Realized",
    body: "It's time to pop open some bubbly and celebrate the achievement of your new lifestyle investment! Your designer -- by now your new best friend -- will take you on an in-depth tour throughout the finished spaces to highlight the design features, discuss proper maintenance, and answer your questions.",
  },
  {
    title: "Happily Ever After",
    body: "Your relationship with Mom's doesn't have to end there. We want your newly created space -- and your delight in it -- to last for a long, long time. With that in mind, we have created a Fine Gardening Division to help you care for your new landscape. We offer flexible service plans to tailor our maintenance offerings to your property.",
  },
  {
    title: "Best in Class Warranty",
    body: "Mom's will take care of you. We want your new space to endure the test of time. We offer a 1-year plant warranty, 5-year hardscape warranty, 10-year deck warranty and so much more. Our goal is your peace of mind.",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink mb-4">
          The Mom&apos;s Way
        </h1>
        <p className="text-[14px] font-[300] leading-relaxed text-muted max-w-md mx-auto">
          Our proven design-build process -- from first conversation to final walkthrough.
        </p>
      </section>

      {/* ── Steps ── */}
      <section className="px-6 pb-20 bg-white">
        <div className="max-w-[760px] mx-auto flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex gap-8 py-10 border-b border-gray-100 last:border-0"
            >
              <span className="text-[28px] font-[200] text-brand/25 leading-none flex-shrink-0 w-10 text-right pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-[13px] font-[500] tracking-[0.18em] uppercase text-ink mb-3">
                  {step.title}
                </h2>
                <p className="text-[14px] font-[300] leading-[1.9] text-muted">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Buildertrend Banner ── */}
      <section className="bg-[#f7f4ef] py-16 px-6">
        <div className="max-w-[760px] mx-auto">
          <h2 className="text-[16px] md:text-[18px] font-[300] tracking-[0.2em] uppercase text-ink mb-4">
            Buildertrend at Mom&apos;s
          </h2>
          <p className="text-[14px] font-[300] leading-[1.85] text-muted mb-8 max-w-xl">
            Buildertrend is the project management program we use to communicate important information about your project -- from the design phase throughout its completion. View designs, selections, schedules, invoices, and communicate directly with your team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/homeowner-portal"
              className="inline-block bg-brand text-white text-[10.5px] font-[600] tracking-[0.2em] uppercase px-8 py-3 hover:bg-brand-dark transition-colors duration-200"
            >
              Homeowner Portal
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-ink text-ink text-[10.5px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
