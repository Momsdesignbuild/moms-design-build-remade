"use client";

import { useEffect, useRef, useState } from "react";

// The section after the hero: one full-screen property pinned while the visitor scrolls.
// The scroll position drives the video (summer, fall, winter) AND lights up a statement
// word by word (the Pressure Titans move). The header slides away while it is on screen
// (html[data-cm-immersive], see globals.css) and returns afterwards. On a phone the wide
// video sits as a band across the middle (a portrait crop would cut the building) and
// gets the lighter file. Every video frame is a keyframe so scrubbing stays smooth.
export default function SeasonsScene({ videoUrl, mobileVideoUrl, imageUrl, statement, accent, seasons }: { videoUrl: string; mobileVideoUrl: string; imageUrl: string; statement: string; accent: string; seasons: { label: string; service: string }[] }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const fill = useRef<HTMLCanvasElement>(null);
  const [idx, setIdx] = useState(0);
  const [src, setSrc] = useState<string>();
  const words = [...statement.split(" "), ...accent.split(" ")].filter(Boolean);

  useEffect(() => {
    setSrc(window.innerWidth < 1024 ? mobileVideoUrl : videoUrl);
  }, [videoUrl, mobileVideoUrl]);

  useEffect(() => {
    const s = section.current, v = video.current;
    if (!s || !v) return;
    const root = document.documentElement;
    // phones: the wide video is a band, so its frame is also painted (tiny, then blurred by CSS) across the whole screen behind it
    const c = fill.current, g = c?.getContext("2d");
    const paint = () => {
      if (!c || !g || !v.videoWidth) return;
      g.drawImage(v, 0, 0, v.videoWidth, v.videoHeight, 0, 0, c.width, c.height); // whole frame, stretched tall: smooth sky / grass / ground bands
    };
    const spans = Array.from(s.querySelectorAll<HTMLElement>("[data-word]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = s.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (s.offsetHeight - vh)));
      if (v.duration) v.currentTime = p * v.duration;
      setIdx(Math.min(seasons.length - 1, Math.floor(p * seasons.length)));
      spans.forEach((el, i) => {
        const k = Math.min(1, Math.max(0, (p - (0.03 + (i / spans.length) * 0.72)) / 0.05));
        el.style.opacity = String(0.16 + 0.84 * k);
        el.style.filter = `blur(${(1 - k) * 6}px)`;
      });
      if (r.top <= 40 && r.bottom > vh * 0.88) root.dataset.cmImmersive = "1";
      else delete root.dataset.cmImmersive;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    v.addEventListener("loadedmetadata", update);
    v.addEventListener("loadeddata", paint);
    v.addEventListener("seeked", paint);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", update);
      v.removeEventListener("loadeddata", paint);
      v.removeEventListener("seeked", paint);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete root.dataset.cmImmersive;
    };
  }, [seasons.length, src]);

  return (
    <section ref={section} className="relative motion-reduce:hidden h-[340vh] lg:h-[420vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#161616]">
        <canvas ref={fill} width={24} height={52} aria-hidden className="absolute inset-0 h-full w-full scale-125 blur-2xl saturate-[1.25] lg:hidden" />
        <video ref={video} src={src} poster={imageUrl} muted playsInline preload="auto" aria-hidden className="[mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] lg:[mask-image:none] lg:[-webkit-mask-image:none] absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full aspect-video object-cover lg:inset-0 lg:top-0 lg:translate-y-0 lg:h-full lg:aspect-auto" />
        <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
        <p className="absolute left-1/2 -translate-x-1/2 top-[9svh] lg:top-[12vh] w-[min(56rem,88vw)] text-center text-[25px] md:text-[38px] lg:text-[46px] font-[300] leading-[1.3] lg:leading-[1.35] tracking-[0.015em] text-white [text-shadow:0_1px_18px_rgba(0,0,0,0.45)] [font-family:var(--font-heading)]">
          {words.map((w, i) => (
            <span key={i} data-word style={{ opacity: 0.16 }} className="inline-block mr-[0.32em]">{w}</span>
          ))}
        </p>
        <div className="absolute left-6 right-6 bottom-[7svh] lg:left-12 lg:right-auto lg:bottom-10 h-16 lg:h-8 text-white/85 text-[20px] font-semibold tracking-[0.2em] lg:tracking-[0.3em] uppercase text-center lg:text-left [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
          {seasons.map((s, i) => (
            <span key={s.label} className={`absolute bottom-0 left-0 right-0 lg:right-auto lg:whitespace-nowrap transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== idx}>
              {s.label} <span className="hidden lg:inline opacity-60">/ </span><br className="lg:hidden" />{s.service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
