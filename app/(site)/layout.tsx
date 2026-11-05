import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { getCopy } from "@/sanity/lib/copy";
import GuideCTA from "@/components/remastered/GuideCTA";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = await getCopy("nav");
  const guide = await getCopy("guide");
  const areas = await getCopy("areas");
  // Service Areas menu: the main cities + "More cities", added unless the Studio menu already has one
  const areaMenu = {
    label: areas.hubKicker,
    href: "/service-areas",
    children: [
      ...areas.cities.filter((c) => c.featured).map((c) => ({ label: c.name, href: `/service-areas/${c.slug}` })),
      { label: areas.moreLabel, href: "/service-areas" },
    ],
  };
  const header = nav.header.some((i) => i.href.startsWith("/service-areas"))
    ? nav.header
    : nav.header.flatMap((i) => (i.href === "/services" ? [i, areaMenu] : [i]));
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:px-4 focus:py-3 focus:bg-brand focus:text-white focus:text-[20px] focus:font-medium"
      >
        Skip to main content
      </a>
      <Header items={header} />
      <MainContent>{children}</MainContent>
      <Footer />
      <GuideCTA c={guide} />
    </>
  );
}
