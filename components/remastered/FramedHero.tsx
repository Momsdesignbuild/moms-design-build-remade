'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * "Build Your Legacy" hero, inverted container-scroll: opens FULL-BLEED
 * (impact, white navbar reads correctly), then scrolling shrinks the video
 * into a matted print on the cream page — the site "becomes editorial"
 * as you enter it. Title rides the film out; no dead runway after release.
 */

// VERIFIED framer-motion 12.x bug (traced into node_modules/framer-motion's
// use-transform.mjs + motion-dom's interpolate.mjs): array-form
// useTransform(scrollYProgress, [...], [...]) silently opts into a "hardware
// accelerated" native CSS scroll-timeline animation whenever the input is a
// useScroll()-derived value — a real, separate rendering path from the JS
// interpolator, with different (broken, for a long pinned scroll-through)
// out-of-range semantics: past this pinned section's relevant range, the
// title's opacity was measurably un-fading back toward 1 in a perfect
// mirror-V around the curve's last breakpoint (reproduced identically in
// dev AND production builds — not a dev-mode artifact). Passing a FUNCTION
// as the second argument instead of an array (per that same source) skips
// the accelerated path entirely and always runs the correct plain-JS
// interpolator. This reimplements the array curve as a function, so it's a
// drop-in replacement with identical behavior in-range, correct behavior
// out-of-range, everywhere this file has a scroll-derived opacity or scale.
function useSettledTransform(value: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(value, (v) => {
    if (v <= input[0]) return output[0]
    if (v >= input[input.length - 1]) return output[output.length - 1]
    for (let i = 0; i < input.length - 1; i++) {
      if (v <= input[i + 1]) {
        const t = (v - input[i]) / (input[i + 1] - input[i])
        return output[i] + (output[i + 1] - output[i]) * t
      }
    }
    return output[output.length - 1]
  })
}

// Shared with Header.tsx, which derives its own transparent/solid threshold
// from these same two numbers — computed synchronously from raw scroll
// position against the static section below, NOT by reading this file's
// animated elements. Reading an animated element's rendered position from
// another component raced against Framer's own scroll-driven render pass
// (confirmed 8/19: scrolling back up could momentarily/permanently strand
// the header solid white over the hero). Tune the curve here; Header
// follows automatically.
export const HERO_INSET_PROGRESS_RANGE: [number, number] = [0.12, 0.82]
export const HERO_INSET_MAX_REM = { mobile: 4.5, desktop: 5.5 }

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
  const inset = useTransform(
    scrollYProgress,
    HERO_INSET_PROGRESS_RANGE,
    ['0rem', `${isMobile ? HERO_INSET_MAX_REM.mobile : HERO_INSET_MAX_REM.desktop}rem`]
  )
  const insetX = useTransform(scrollYProgress, [0.12, 0.82], ['0rem', isMobile ? '1.25rem' : '6.5rem'])
  const veil = useSettledTransform(scrollYProgress, [0, 0.5], [0.32, 0.14])
  // The whole title block shrinks together as one unit (Josh, July 17: "just
  // shrink slightly" — pushed further than the original 0.94 so it reads).
  const contentScale = useSettledTransform(scrollYProgress, [0, 0.6], [1, 0.75])
  // The eyebrow + CTA row vanish fully, and earlier — clearing the frame
  // before the mat fully forms instead of lingering semi-transparent (and
  // still clickable) through the whole transition.
  const supportOpacity = useSettledTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0])
  // opacity:0 alone doesn't stop clicks/keyboard focus from reaching an
  // invisible element — this is what actually makes the faded CTAs
  // unclickable once they're gone, not just unseen.
  const supportPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.4 ? 'none' : 'auto'))
  // The H1 alone recedes to a whisper rather than vanishing — it's the
  // caption of the framed piece by the time the mat settles, never a blank
  // gap above the video.
  const titleOpacity = useSettledTransform(scrollYProgress, [0, 0.3, 0.55], [1, 1, 0.35])
  // the frame's caption fades in as the mat forms

  return (
    <section ref={ref} id="home-hero-section" className="relative h-[195vh] bg-[#F7F5F2]">
      {/* 100svh: iOS Safari's collapsing toolbar makes 100vh overshoot and jitter */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#F7F5F2]">
        <motion.div
          className="absolute overflow-hidden"
          style={{ top: inset, bottom: inset, left: insetX, right: insetX }}
        >
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
            style={{ scale: contentScale }}
          >
            {/* Two separate scroll-driven opacity wrappers, not one shared
                with the parent's scale — a MotionValue in `style` and a
                framer `animate` can't both drive the same element's
                opacity, so each entrance-animated child below keeps its
                own initial/animate on a dedicated wrapper. */}
            <motion.div style={{ opacity: supportOpacity, pointerEvents: supportPointerEvents }}>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                className="text-[19px] md:text-[31px] font-semibold tracking-[0.3em] uppercase text-white/85 mb-6"
              >
                Minnesota&rsquo;s Most Awarded Design-Build Firm
              </motion.p>
            </motion.div>
            <motion.div style={{ opacity: titleOpacity }}>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.45, ease: 'easeOut' }}
                className="text-5xl md:text-7xl lg:text-8xl font-[300] tracking-[0.08em] uppercase text-white"
              >
                Build Your Legacy
              </motion.h1>
            </motion.div>
            <motion.div style={{ opacity: supportOpacity, pointerEvents: supportPointerEvents }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
                className="mt-10 flex flex-col sm:flex-row items-center gap-4"
              >
                <Link
                  href="/portfolio"
                  className="border border-white/90 text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-9 py-3.5 hover:bg-white hover:text-ink transition-colors duration-300"
                >
                  Explore Our Work
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-brand bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-transparent hover:text-brand transition-colors duration-300"
                >
                  Meet With Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
