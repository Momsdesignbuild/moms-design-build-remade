'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const sdVideoRef = useRef<HTMLVideoElement>(null)
  const hdVideoRef = useRef<HTMLVideoElement>(null)
  const [sdPlaying, setSdPlaying] = useState(false)
  const [hdPlaying, setHdPlaying] = useState(false)

  useEffect(() => {
    const hd = hdVideoRef.current
    if (!hd) return
    const t = setTimeout(() => { hd.load() }, 2000)
    return () => clearTimeout(t)
  }, [])

  const onHdCanPlay = () => {
    const sd = sdVideoRef.current
    const hd = hdVideoRef.current
    if (!hd) return
    if (sd) hd.currentTime = sd.currentTime
    hd.play().catch(() => {})
  }

  return (
    <section className="relative min-h-[120svh] md:min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Poster */}
      <div
        className={`absolute transition-opacity duration-700 z-10 ${sdPlaying ? 'opacity-0' : 'opacity-100'}`}
        style={{
          inset: 0,
          backgroundImage: 'url(/video/hero-poster.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 480p base */}
      <video
        ref={sdVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setSdPlaying(true)}
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/video/hero-480p.mp4" type="video/mp4" />
      </video>

      {/* 1080p — syncs timestamp, fades in */}
      <video
        ref={hdVideoRef}
        muted
        loop
        playsInline
        preload="none"
        onCanPlay={onHdCanPlay}
        onPlaying={() => setHdPlaying(true)}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${hdPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-30 text-center text-white px-6 w-full max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
          className="mb-6 md:mb-8"
        >
          <div className="hidden md:flex items-center gap-4 justify-center">
            <span className="flex-1 max-w-[80px] h-px bg-white/50" />
            <span className="text-[15px] font-medium tracking-[0.2em] uppercase text-white/90 whitespace-nowrap [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
              Award-Winning Design-Build &mdash; Minneapolis, Minnesota
            </span>
            <span className="flex-1 max-w-[80px] h-px bg-white/50" />
          </div>
          <div className="md:hidden flex flex-col items-center gap-1">
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
              Award-Winning Design-Build
            </span>
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
              Minneapolis, Minnesota
            </span>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tight leading-none text-white uppercase"
        >
          Build Your Legacy
        </motion.h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.4, ease: 'easeOut' }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-8 py-4 bg-brand text-white text-xs font-bold tracking-widest uppercase hover:bg-brand-dark transition-all duration-200 active:scale-[0.98] text-center"
          >
            View Our Work
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 border border-white/40 text-white/80 text-xs font-semibold tracking-widest uppercase hover:border-white hover:text-white transition-all duration-200 active:scale-[0.98] text-center"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-12 bg-white/30 mx-auto"
        />
      </motion.div>
    </section>
  )
}
