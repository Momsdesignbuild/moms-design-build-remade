"use client";

import { useEffect, useRef, useState } from "react";

// The section after the hero: one full-screen property pinned while the visitor scrolls,
// and the scroll position drives the video (summer, fall, winter). The header slides away
// while it is on screen (html[data-cm-immersive], see globals.css) and returns afterwards.
// Desktop only; the video has every frame as a keyframe so scrubbing stays smooth.
export default function SeasonsScene({ videoUrl, imageUrl, seasons }: { videoUrl: string; imageUrl: string; seasons: { label: string; service: string }[] }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const s = section.current, v = video.current;
    if (!s || !v) return;
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = s.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (s.offsetHeight - vh)));
      if (v.duration && window.innerWidth >= 1024) v.currentTime = p * v.duration;
      setIdx(Math.min(seasons.length - 1, Math.floor(p * seasons.length)));
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
    <section ref={section} className="relative hidden lg:block motion-reduce:hidden h-[360vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#222]">
        <video ref={video} src={videoUrl} poster={imageUrl} muted playsInline preload="auto" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-12 bottom-14 text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
          {seasons.map((s, i) => (
            <div key={s.label} className={`absolute bottom-0 left-0 transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== idx}>
              <p className="font-bold [font-synthesis:weight] text-[56px] leading-none tracking-[0.06em] uppercase whitespace-nowrap">{s.label}</p>
              <p className="mt-3 text-[22px] font-[300] tracking-[0.14em] uppercase whitespace-nowrap">{s.service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
