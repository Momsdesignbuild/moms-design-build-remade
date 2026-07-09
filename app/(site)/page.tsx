import type { Metadata, Viewport } from "next";
import Hero from "@/components/home/Hero";
import HomeServices from "@/components/home/HomeServices";
import HomeOurWork from "@/components/home/HomeOurWork";
import HomeGivingBack from "@/components/home/HomeGivingBack";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Mom's Design Build - Landscape & Interior Designers In Minnesota",
  },
  description:
    "Mom's Design Build is a MN based custom luxury remodeling & landscaping firm. Learn why we are Minnesota's most awarded design build company.",
  alternates: {
    canonical: "https://momsdesignbuild.com/",
  },
  openGraph: {
    url: "https://momsdesignbuild.com/",
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

export default function HomePage() {
  return (
    <>
      <style>{`@media (max-width: 1023px) { html, body { background-color: #000; } }`}</style>
      <Hero />
      <HomeServices />

      <HomeOurWork />

      <HomeGivingBack />
    </>
  );
}
