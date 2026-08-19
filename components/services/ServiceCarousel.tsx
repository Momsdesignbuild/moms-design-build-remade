"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Their Elementor media-carousel: full-width slide, auto-advance, arrows.
 * One slide visible; swipes/arrows/dots all work; pauses while hovered. */

export type CarouselSlide = { url: string; alt?: string; href?: string; dim?: { width: number; height: number } };

export default function ServiceCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [idx, setIdx] = useState(0);
  const hovered = useRef(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((d: number) => setIdx((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => {
      if (!hovered.current) go(1);
    }, 4500);
    return () => clearInterval(t);
  }, [n, go]);

  if (!n) return null;

  return (
    <div
      className="relative my-8 overflow-hidden select-none"
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
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {slides.map((s, i) => {
          const img = (
            <Image
              src={s.url}
              alt={s.alt || ""}
              width={s.dim?.width ?? 2000}
              height={s.dim?.height ?? 1333}
              className="w-full h-auto object-cover aspect-[3/2]"
              sizes="(max-width: 1200px) 100vw, 1200px"
              {...(i === 0 ? { priority: true } : { loading: "lazy" as const })}
            />
          );
          return (
            <div key={i} className="w-full shrink-0">
              {/* live slides link through to the matching portfolio project */}
              {s.href ? <Link href={s.href} draggable={false}>{img}</Link> : img}
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <>
          <button
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/35 hover:bg-black/55 text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/35 hover:bg-black/55 text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Photo ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/45"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
