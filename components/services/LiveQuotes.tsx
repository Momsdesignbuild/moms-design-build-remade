"use client";

import { useEffect, useState } from "react";

/* Their Elementor testimonial carousel: one quote in a light-gray bubble with a
 * pointer, the name under it, arrows either side, auto-advance (live water
 * features page, 2026-10-01). */
export default function LiveQuotes({ quotes }: { quotes: Array<{ text: string; name?: string }> }) {
  const [i, setI] = useState(0);
  const n = quotes.length;
  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [n]);
  const arrow = (d: number, label: string, path: string) => (
    <button
      aria-label={label}
      onClick={() => setI((x) => (x + d + n) % n)}
      className="shrink-0 w-8 h-8 flex items-center justify-center text-brand-stone/60 hover:text-brand-mid transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={path} />
      </svg>
    </button>
  );
  return (
    <div className="flex items-center gap-1">
      {n > 1 && arrow(-1, "Previous review", "M15 5l-7 7 7 7")}
      <div className="flex-1 min-w-0 grid">
        {quotes.map((q, k) => (
          <figure
            key={k}
            aria-hidden={k !== i}
            className={`[grid-area:1/1] m-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <blockquote className="relative bg-[#F9FAFA] p-5 font-sans text-[20px] md:text-[23.4px] font-[300] leading-[1.5] text-brand-mid text-center after:content-[''] after:absolute after:left-1/2 after:-bottom-2.5 after:-translate-x-1/2 after:border-x-[10px] after:border-t-[10px] after:border-x-transparent after:border-t-[#F9FAFA]"
              style={{ fontStyle: "italic", fontSynthesis: "style" }}
            >
              {q.text}
            </blockquote>
            {q.name && <figcaption className="mt-6 text-center font-sans text-[14px] font-[600] text-brand-mid">{q.name}</figcaption>}
          </figure>
        ))}
      </div>
      {n > 1 && arrow(1, "Next review", "M9 5l7 7-7 7")}
    </div>
  );
}
