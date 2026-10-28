"use client";

import { useEffect } from "react";

// Marks <html> while the page is at the very top, so the CM header can sit transparent over the hero.
export default function HeroTop() {
  useEffect(() => {
    const r = document.documentElement;
    const f = () => { if (window.scrollY < 40) r.dataset.cmTop = "1"; else delete r.dataset.cmTop; };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => { window.removeEventListener("scroll", f); delete r.dataset.cmTop; };
  }, []);
  return null;
}
