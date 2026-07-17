'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * "Build Your Legacy" hero, inverted container-scroll: opens FULL-BLEED
 * (impact, white navbar reads correctly), then scrolling shrinks the video
 * into a matted print on the cream page — the site "becomes editorial"
 * as you enter it. Title rides the film out; no dead runway after release.
 */
export default function FramedHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // desktop mat insets squeeze a 390px phone into a ~180px sliver — on
  // mobile the frame keeps slim sides and mats mostly top/bottom instead
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // full-bleed → matted frame
  const inset = useTransform(scrollYProgress, [0.12, 0.82], ['0rem', isMobile ? '4.5rem' : '5.5rem'])
  const insetX = useTransform(scrollYProgress, [0.12, 0.82], ['0rem', isMobile ? '1.25rem' : '6.5rem'])
  const veil = useTransform(scrollYProgress, [0, 0.5], [0.32, 0.14])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.55], [1, 1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94])
  // the frame's caption fades in as the mat forms
  const captionOpacity = useTransform(scrollYProgress, [0.62, 0.85], [0, 1])

  return (
    <section ref={ref} className="relative h-[195vh] bg-[#F7F5F2]">
      {/* 100svh: iOS Safari's collapsing toolbar makes 100vh overshoot and jitter */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#F7F5F2]">
        <motion.div
          className="absolute overflow-hidden"
          style={{ top: inset, bottom: inset, left: insetX, right: insetX }}
        >
          {/* Header sync sentinel — inherits this div's own animated `top`,
              so its on-screen position IS the live inset value, no matter
              how the scroll-progress curve above is tuned. Header watches
              this (not a fixed scroll offset) to know the instant the
              video's top edge retreats behind the header band, i.e. when
              the header stops floating over video and needs to go solid. */}
          <div id="home-hero-sentinel" aria-hidden className="absolute top-0 left-0 w-full h-px pointer-events-none" />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/video/hero-poster.jpg"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: veil }} />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: titleOpacity, scale: titleScale }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-white/75 mb-6"
            >
              Minnesota&rsquo;s Most Awarded Design-Build Firm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: 'easeOut' }}
              className="text-5xl md:text-7xl lg:text-8xl font-[300] tracking-[0.08em] uppercase text-white"
            >
              Build Your Legacy
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/portfolio"
                className="border border-white/90 text-white text-[11px] font-[600] tracking-[0.22em] uppercase px-9 py-3.5 hover:bg-white hover:text-ink transition-colors duration-300"
              >
                Explore Our Work
              </Link>
              <Link
                href="/contact"
                className="border border-transparent text-white/80 text-[11px] font-[600] tracking-[0.22em] uppercase px-9 py-3.5 hover:text-white transition-colors duration-300"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* gallery-label caption under the settled frame */}
        <motion.p
          className="absolute bottom-7 inset-x-0 text-center text-[10px] font-semibold tracking-[0.3em] uppercase text-muted"
          style={{ opacity: captionOpacity }}
        >
          Minnetonka Area &middot; Pool &amp; Outdoor Living Transformation
        </motion.p>
      </div>
    </section>
  )
}
