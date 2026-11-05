'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const a = i / n, b = Math.min(1, (i + 1.6) / n)
  const opacity = useTransform(p, [a, b], [0.16, 1])
  const blur = useTransform(p, [a, b], ['blur(5px)', 'blur(0px)'])
  return <motion.span style={{ opacity, filter: blur }} className="inline-block mr-[0.28em]">{w}</motion.span>
}

/** Paragraph that sharpens word by word as it crosses the screen. No pinning, no extra scroll length. */
export default function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
    </p>
  )
}
