import Link from "next/link";
import type { COPY } from "@/sanity/copy/defaults";

type Cm = (typeof COPY)["cm"];
type Nav = (typeof COPY)["nav"];

/** Phones only: the two ways to reach us stay on screen while the page scrolls. */
export default function CmMobileBar({ cm, nav }: { cm: Cm; nav: Nav }) {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 shadow-[0_-4px_18px_rgba(0,0,0,0.2)] pb-[env(safe-area-inset-bottom)] bg-white">
      <a href={nav.phoneHref} className="flex items-center justify-center gap-2 h-[56px] bg-white !text-ink text-[17px] font-[600] tracking-[0.06em] whitespace-nowrap">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg> {/* ui-label: phone icon, not visitor text */}
        {nav.phone}
      </a>
      <Link href="/commercial/contact" className="flex items-center justify-center h-[56px] bg-brand !text-white text-[16px] font-[600] tracking-[0.14em] uppercase whitespace-nowrap">{cm.ctaLabel}</Link>
    </div>
  );
}
