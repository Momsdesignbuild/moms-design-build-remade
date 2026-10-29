import CmHeader from "@/components/cm/CmHeader";
import CmFooter from "@/components/cm/CmFooter";
import CmCallBar from "@/components/cm/CmCallBar";
import { getCopy } from "@/sanity/lib/copy";

// The Commercial Maintenance (CM) section: same site, its own header and footer.
export default async function CmLayout({ children }: { children: React.ReactNode }) {
  const [cm, nav] = await Promise.all([getCopy("cm"), getCopy("nav")]);
  return (
    <div style={{ "--color-brand": "#5EAD4F", "--color-brand-dark": "#4A8F3D", "--color-brand-coral": "#5EAD4F", "--color-brand-teal": "#5EAD4F" } as React.CSSProperties}>{/* ui-label: Commercial Maintenance green (#5EAD4F, same as the main-site services section) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:px-4 focus:py-3 focus:bg-brand focus:text-white focus:text-[20px] focus:font-medium"
      >
        Skip to main content{/* ui-label: accessibility skip link */}
      </a>
      <CmHeader cm={cm} />
      <main id="main-content">{children}</main>
      <CmFooter cm={cm} nav={nav} />
      <CmCallBar phone={nav.phone} phoneHref={nav.phoneHref} label={cm.ctaLabel} />
    </div>
  );
}
