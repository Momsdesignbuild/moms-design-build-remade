'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin teal reading-progress line pinned under the header — article pages only. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-brand origin-left z-[60]"
      style={{ scaleX }}
    />
  )
}
