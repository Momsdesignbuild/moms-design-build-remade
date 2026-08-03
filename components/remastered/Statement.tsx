'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const WORDS =
  `We are a design-build firm with one belief: the experience of a home should be crafted as beautifully as the life lived within it.`.split(' ')

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.32em]">
      {children}
    </motion.span>
  )
}

/** Bria-style statement section — Futura light, words breathe in on scroll. */
export default function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.28'] })

  return (
    <section ref={ref} className="bg-[#F7F5F2] pt-14 lg:pt-20 pb-16 lg:pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[14px] font-semibold tracking-[0.3em] uppercase text-brand mb-10">
          Mom&rsquo;s Design Build · Minneapolis, MN
        </p>
        <p
          className="text-[26px] md:text-[38px] lg:text-[44px] font-[300] leading-[1.35] tracking-[0.015em] text-ink"
          style={{ fontFamily: 'var(--font-heading, "Futura PT", sans-serif)' }}
        >
          {WORDS.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / WORDS.length, Math.min(1, (i + 4) / WORDS.length)]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
