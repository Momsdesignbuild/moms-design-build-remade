import type { Metadata, Viewport } from "next";
import FramedHero from "@/components/remastered/FramedHero";
import Statement from "@/components/remastered/Statement";
import AwardsStrip from "@/components/remastered/AwardsStrip";
import WorkCarousel from "@/components/remastered/WorkCarousel";
import Anatomy from "@/components/remastered/Anatomy";
import TransformationSlider from "@/components/remastered/TransformationSlider";
import ServicesEditorial from "@/components/remastered/ServicesEditorial";
import Testimonial from "@/components/remastered/Testimonial";
import Journal from "@/components/remastered/Journal";
import GivingBackEditorial from "@/components/remastered/GivingBackEditorial";
import ClosingCTA from "@/components/remastered/ClosingCTA";
import JoinTheList from "@/components/remastered/JoinTheList";

export const revalidate = 3600;

// SEO head identical to live WP — Yoast values verbatim.
export const metadata: Metadata = {
  title: {
    absolute: "Mom's Design Build - Landscape & Interior Designers In Minnesota",
  },
  description:
    "Mom's Design Build is a MN based custom luxury remodeling & landscaping firm. Learn why we are Minnesota's most awarded design build company.",
  alternates: {
    canonical: "https://momsdesignbuild.com/",
  },
};

// iPhone chrome, homepage only (Josh, July 8): black behind the notch
// (theme-color) + black rubber-band overscroll top/bottom (html/body bg,
// scoped to this route — unmounts on navigation, rest of the site stays white).
// Mobile-width ONLY (Josh, July 9): desktop Safari tints its own toolbar with
// theme-color, which read as a black bar above the hero — desktop stays white.
export const viewport: Viewport = {
  themeColor: [
    { media: "(max-width: 1023px)", color: "#000000" },
    { media: "(min-width: 1024px)", color: "#ffffff" },
  ],
};

// Homepage draft-2 (Summer's audit, 7/14): she approved the remastered
// homepage design — ported here with her fixes: awards H2 = live's
// "Most Award-Winning in the Midwest" + the five real multi-org badges,
// Cedar & Stone night drone closes the page, giving-back partners link out,
// no Buildertrend section, larger nav. H1/meta/canonical unchanged from live.
export default function HomePage() {
  return (
    <>
      <style>{`@media (max-width: 1023px) { html, body { background-color: #000; } }`}</style>
      <FramedHero />
      <Statement />
      <AwardsStrip />
      <WorkCarousel />
      <Anatomy />
      <TransformationSlider />
      <ServicesEditorial />
      <Testimonial />
      <Journal />
      <GivingBackEditorial />
      <ClosingCTA />
      <JoinTheList
        img="https://cdn.sanity.io/images/wavk40jo/production/87f222ef7b60ceb0b29f2fbd574a8bff606a15da-1500x1023.jpg?w=1000&auto=format"
        imgAlt="Lakeside living outdoor space by Mom's Design Build"
      />
      {/* GuideCTA (Free Guide side tab) archived 8/17 per Josh — component
          kept, just not rendered. The guide content itself never existed
          yet anyway. */}
    </>
  );
}
