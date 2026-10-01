"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Their Elementor media-carousel: auto-advance, arrows, dots, pauses while hovered.
 * Default: one full-width slide. `strip` = their service-page carousel: 3 photos
 * side by side, 238px tall, 10px apart, one per view on phones, 5s autoplay
 * (measured off live custom-decks 2026-10-01). */

export type CarouselSlide = { url: string; alt?: string; href?: string; dim?: { width: number; height: number } };

const GAP = 10;

export default function ServiceCarousel({
  slides,
  aspect = "aspect-[3/2]",
  strip = false,
}: {
  slides: CarouselSlide[];
  aspect?: string;
  strip?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(strip ? 3 : 1);
  const hovered = useRef(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const pv = Math.min(perView, n);
  const stops = Math.max(n - pv + 1, 1);

  useEffect(() => {
    if (!strip) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setPerView(mq.matches ? 3 : 1);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, [strip]);

  const go = useCallback((d: number) => setIdx((i) => (i + d + stops) % stops), [stops]);
  useEffect(() => setIdx((i) => Math.min(i, stops - 1)), [stops]);

  useEffect(() => {
    if (stops < 2) return;
    const t = setInterval(() => {
      if (!hovered.current) go(1);
    }, strip ? 5000 : 4500);
    return () => clearInterval(t);
  }, [stops, go, strip]);

  if (!n) return null;

  // one step = one slide + its gap; slide width = (track - gaps) / perView
  const gap = strip ? GAP : 0;
  const shift = `translateX(calc(${-idx} * (100% + ${gap}px) / ${pv}))`;

  return (
    <div
      className={`relative my-8 overflow-hidden select-none${strip ? " pb-[30px]" : ""}`}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{ transform: shift, gap }}
      >
        {slides.map((s, i) => {
          const img = (
            <Image
              src={s.url}
              alt={s.alt || ""}
              width={s.dim?.width ?? 2000}
              height={s.dim?.height ?? 1333}
              className={strip ? "w-full h-[238px] object-cover" : `w-full h-auto object-cover ${aspect}`}
              sizes={strip ? "(max-width: 768px) 100vw, 360px" : "(max-width: 1200px) 100vw, 1200px"}
              {...(i < pv ? { priority: true } : { loading: "lazy" as const })}
            />
          );
          return (
            <div key={i} className="shrink-0" style={{ width: `calc((100% - ${(pv - 1) * gap}px) / ${pv})` }}>
              {/* live slides link through to the matching portfolio project */}
              {s.href ? <Link href={s.href} draggable={false}>{img}</Link> : img}
            </div>
          );
        })}
      </div>

      {stops > 1 && (
        <>
          <button
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className={`absolute left-3 ${strip ? "top-[119px]" : "top-1/2"} -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/35 hover:bg-black/55 text-white transition-colors`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button
            aria-label="Next photo"
            onClick={() => go(1)}
            className={`absolute right-3 ${strip ? "top-[119px]" : "top-1/2"} -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/35 hover:bg-black/55 text-white transition-colors`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className={`absolute ${strip ? "bottom-2" : "bottom-3"} left-0 right-0 flex justify-center gap-2`}>
            {Array.from({ length: stops }, (_, i) => (
              <button
                key={i}
                aria-label={`Photo ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${strip ? (i === idx ? "bg-brand-mid" : "bg-brand-mid/30") : i === idx ? "bg-white" : "bg-white/45"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
