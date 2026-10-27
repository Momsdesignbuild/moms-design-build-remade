"use client";

import { useEffect, useRef, useState } from "react";

// The section after the hero: one full-screen property pinned while the visitor scrolls.
// The scroll position drives the video (summer, fall, winter) AND lights up a statement
// word by word (the Pressure Titans move). The header slides away while it is on screen
// (html[data-cm-immersive], see globals.css) and returns afterwards. Desktop only; the
// video has every frame as a keyframe so scrubbing stays smooth.
export default function SeasonsScene({ videoUrl, imageUrl, statement, accent, seasons }: { videoUrl: string; imageUrl: string; statement: string; accent: string; seasons: { label: string; service: string }[] }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);
  const words = [...statement.split(" ").map((w) => ({ w, accent: false })), ...accent.split(" ").map((w) => ({ w, accent: true }))];

  useEffect(() => {
    const s = section.current, v = video.current;
    if (!s || !v) return;
    const root = document.documentElement;
    const spans = Array.from(s.querySelectorAll<HTMLElement>("[data-word]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = s.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (s.offsetHeight - vh)));
      if (v.duration && window.innerWidth >= 1024) v.currentTime = p * v.duration;
      setIdx(Math.min(seasons.length - 1, Math.floor(p * seasons.length)));
      spans.forEach((el, i) => {
        const k = Math.min(1, Math.max(0, (p - (0.03 + (i / spans.length) * 0.72)) / 0.05));
        el.style.opacity = String(0.16 + 0.84 * k);
        el.style.filter = `blur(${(1 - k) * 6}px)`;
      });
      if (window.innerWidth >= 1024 && r.top <= 40 && r.bottom > vh * 0.88) root.dataset.cmImmersive = "1";
      else delete root.dataset.cmImmersive;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    v.addEventListener("loadedmetadata", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", update);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete root.dataset.cmImmersive;
    };
  }, [seasons.length]);

  return (
    <section ref={section} className="relative hidden lg:block motion-reduce:hidden h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#222]">
        <video ref={video} src={videoUrl} poster={imageUrl} muted playsInline preload="auto" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
        <p className="absolute left-12 right-12 top-[11vh] max-w-[1200px] text-[4.4vw] leading-[1.1] tracking-[-0.03em] font-light text-white [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
          {words.map((x, i) => (
            <span key={i} data-word style={{ opacity: 0.16 }} className={`inline-block mr-[0.24em] ${x.accent ? "italic font-normal [font-family:var(--font-serif)]" : ""}`}>{x.w}</span>
          ))}
        </p>
        <div className="absolute left-12 bottom-10 h-8 text-white text-[20px] tracking-[0.18em] uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
          {seasons.map((s, i) => (
            <span key={s.label} className={`absolute bottom-0 left-0 whitespace-nowrap transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== idx}>
              <b className="font-bold [font-synthesis:weight]">{s.label}</b> <span className="opacity-60">/</span> {s.service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
