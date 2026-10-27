"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Desktop: the hero is pinned while the visitor scrolls, and the scroll position drives
// the video (summer into fall). Phones and reduced-motion get the still photo. The video
// has every frame as a keyframe so scrubbing it by hand stays smooth.
export default function ScrollHero({ videoUrl, imageUrl, imageAlt, children }: { videoUrl: string; imageUrl: string; imageAlt: string; children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const s = section.current, v = video.current;
    if (!s || !v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!v.duration || window.innerWidth < 1024) return;
      const p = Math.min(1, Math.max(0, -s.getBoundingClientRect().top / (s.offsetHeight - window.innerHeight)));
      v.currentTime = p * v.duration;
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
    };
  }, []);

  return (
    <section ref={section} className="relative lg:h-[260vh]">
      <div className="relative min-h-[70vh] lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] lg:min-h-0 overflow-hidden bg-[#222] flex items-start justify-center">
        <Image src={imageUrl} alt={imageAlt} fill priority sizes="100vw" className="object-cover lg:hidden" />
        <video ref={video} src={videoUrl} poster={imageUrl} muted playsInline preload="auto" aria-hidden className="hidden lg:block absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative px-6 pt-24 lg:pt-[10vh] max-w-[900px] text-center text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">{children}</div>
      </div>
    </section>
  );
}
