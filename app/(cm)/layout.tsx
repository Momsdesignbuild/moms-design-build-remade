import CmHeader from "@/components/cm/CmHeader";
import CmFooter from "@/components/cm/CmFooter";
import { getCopy } from "@/sanity/lib/copy";

// The Commercial Maintenance (CM) section: same site, its own header and footer.
export default async function CmLayout({ children }: { children: React.ReactNode }) {
  const [cm, nav] = await Promise.all([getCopy("cm"), getCopy("nav")]);
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:px-4 focus:py-3 focus:bg-brand focus:text-white focus:text-[20px] focus:font-medium"
      >
        Skip to main content{/* ui-label: accessibility skip link */}
      </a>
      <CmHeader cm={cm} />
      <main id="main-content">{children}</main>
      <CmFooter cm={cm} nav={nav} />
    </>
  );
}
