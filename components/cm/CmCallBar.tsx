"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Call and contact, pinned to the bottom of every Commercial page. It slides up once the top of the page has scrolled away. */
export default function CmCallBar({ phone, phoneHref, label }: { phone: string; phoneHref: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const compute = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const tab = visible ? 0 : -1;
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 bg-[#2B3A3F] shadow-[0_-4px_18px_rgba(0,0,0,0.25)] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="max-w-[1100px] mx-auto flex lg:justify-center lg:gap-6">
        <a href={phoneHref} tabIndex={tab} className="flex-1 lg:flex-none flex items-center justify-center gap-2 h-[56px] lg:h-[64px] lg:px-8 !text-white text-[17px] lg:text-[20px] font-[600] tracking-[0.06em] whitespace-nowrap hover:!text-brand transition-colors">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg> {/* ui-label: phone icon, not visitor text */}
          {phone}
        </a>
        <Link href="/commercial/contact" tabIndex={tab} className="flex-1 lg:flex-none flex items-center justify-center h-[56px] lg:h-[64px] lg:px-12 bg-brand !text-white text-[16px] lg:text-[18px] font-[600] tracking-[0.14em] uppercase whitespace-nowrap hover:bg-brand-dark transition-colors">{label}</Link>
      </div>
    </div>
  );
}
