"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const SLIDES = [
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/21420-Excelsior-Blvd_083.jpg",
    alt: "Mom's Design Build landscape design project — Excelsior Blvd, Minnesota",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/16918-Stratus-Ct_006.jpg",
    alt: "Mom's Design Build exterior design — Stratus Court project, Minnesota",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/07/Moms-Design-Build_Warwick-St_002-1.jpg",
    alt: "Mom's Design Build landscape architecture — Warwick St project, Minnesota",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/Moms-Design-Build_W-Lake-St_Twilight_002.jpg",
    alt: "Mom's Design Build outdoor living space — West Lake St twilight project",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2023/11/400_Dakota_Ave_S_010-1.webp",
    alt: "Mom's Design Build landscape design — Dakota Ave project, Minnesota",
  },
  {
    src: "https://momsdesignbuild.com/wp-content/uploads/2024/09/Photographer-Spacecrafting.jpg",
    alt: "Mom's Design Build interior design — award-winning remodel in Minnesota",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [isPlaying, next]);

  return (
    <div
      className="relative w-full min-h-[120svh] md:min-h-[100svh] overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${SLIDES[current].src}')` }}
          role="img"
          aria-label={SLIDES[current].alt}
        />
      </AnimatePresence>

      {/* Subtle bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Prev button */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <CaretLeft size={17} weight="bold" />
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <CaretRight size={17} weight="bold" />
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
        role="tablist"
        aria-label="Slide navigation"
      >
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${slide.alt}`}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
