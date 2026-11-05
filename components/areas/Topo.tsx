'use client'

import { motion, useReducedMotion, useAnimationFrame, useMotionValue, useTransform, type MotionValue } from 'framer-motion'

const build = (k: number, p: number) => {
  const pts: string[] = []
  for (let a = 0; a <= 56; a++) {
    const t = (a / 56) * Math.PI * 2
    const r = 42 * k * (1 + 0.1 * Math.sin(3 * t + k * 0.55 + p * 1.6) + 0.06 * Math.sin(5 * t - k * 0.8 - p * 1.1) + 0.04 * Math.sin(2 * t + k + p * 0.9))
    pts.push(`${(900 + r * 1.55 * Math.cos(t)).toFixed(1)},${(520 + r * 0.9 * Math.sin(t)).toFixed(1)}`)
  }
  return 'M' + pts.join('L') + 'Z'
}

/** Contour lines, teal on cream. Static; nothing moves them. */
export default function Topo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1800 1040" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 11 }, (_, i) => <path key={i} d={build(i + 1, 0)} fill="none" stroke="#00AEC7" strokeOpacity={0.1 + (i % 4) * 0.018} strokeWidth="1.2" />)}
    </svg>
  )
}
