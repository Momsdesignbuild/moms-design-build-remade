'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const build = (k: number, p: number) => {
  const pts: string[] = []
  for (let a = 0; a <= 56; a++) {
    const t = (a / 56) * Math.PI * 2
    const r = 42 * k * (1 + 0.1 * Math.sin(3 * t + k * 0.55 + p * 1.6) + 0.06 * Math.sin(5 * t - k * 0.8 - p * 1.1) + 0.04 * Math.sin(2 * t + k + p * 0.9))
    pts.push(`${(900 + r * 1.55 * Math.cos(t)).toFixed(1)},${(520 + r * 0.9 * Math.sin(t)).toFixed(1)}`)
  }
  return 'M' + pts.join('L') + 'Z'
}

function Ring({ k, phase }: { k: number; phase: MotionValue<number> }) {
  const d = useTransform(phase, (p) => build(k, p))
  return <motion.path d={d} fill="none" stroke="#00AEC7" strokeOpacity={0.1 + (k % 4) * 0.018} strokeWidth="1.2" strokeLinejoin="round" />
}

/** Contour lines, teal on cream. They ripple and drift as the page scrolls; nothing follows the mouse. */
export default function Topo({ className = '' }: { className?: string }) {
  const { scrollY } = useScroll()
  const calm = useReducedMotion()
  const phase = useTransform(scrollY, (y) => (calm ? 0 : Math.round(y / 24) * 24 * 0.0035))
  return (
    <svg style={{ transform: "translateZ(0)", willChange: "transform" }} className={className} viewBox="0 0 1800 1040" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 11 }, (_, i) => <Ring key={i} k={i + 1} phase={phase} />)}
    </svg>
  )
}
