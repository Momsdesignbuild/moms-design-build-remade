'use client'

import { useRef } from 'react'
import { serifBlack } from './fonts'
import { motion, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion'
import { SERIF } from "@/components/areas/fonts";

/** Headline cut out of a pool photo: the photo drifts inside the letters as the page scrolls. */
export function MaskedHeading({ lines, photo }: { lines: string[]; photo: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['30%', '80%'])
  return (
    <div ref={ref}>
      {lines.map((l, i) => (
        <motion.h1
          key={l}
          style={{ backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPositionX: i ? '30%' : '70%', backgroundPositionY: y, fontWeight: 900 }}
          className={`${serifBlack.className} text-[clamp(38px,10.6vw,230px)] md:text-[clamp(60px,14vw,230px)] leading-[0.92] uppercase !tracking-[-0.01em] text-transparent bg-clip-text bg-[#1c1c1c]`}
        >
          {l}
        </motion.h1>
      ))}
    </div>
  )
}

function Row({ names, base, outline }: { names: string[]; base: number; outline?: boolean }) {
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(v, [-2000, 0, 2000], [-4, 0, 4], { clamp: false })
  const ref = useRef<HTMLDivElement>(null)
  useAnimationFrame((_, dt) => {
    const w = (ref.current?.scrollWidth ?? 2) / 2
    let next = x.get() + (base + boost.get() * Math.sign(base)) * (dt / 1000) * 60
    if (next <= -w) next += w
    if (next > 0) next -= w
    x.set(next)
  })
  const run = [...names, ...names]
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div ref={ref} style={{ x }} className="inline-flex">
        {run.map((n, i) => (
          <span key={i} className={`mr-10 text-[clamp(40px,7vw,104px)] leading-[1.15] ${outline ? 'text-transparent [-webkit-text-stroke:1.2px_#1c1c1c]' : 'text-ink italic'}`} style={{ fontFamily: SERIF }}>
            {n}<span className="ml-10 text-brand not-italic" aria-hidden="true">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/** Two rows of city names drifting in opposite directions; they surge when you scroll. */
export function CityMarquee({ names }: { names: string[] }) {
  const half = Math.ceil(names.length / 2)
  return (
    <div aria-hidden="true" className="py-6 select-none motion-reduce:[&_*]:!transform-none">
      <Row names={names.slice(0, half)} base={-0.6} />
      <Row names={names.slice(half)} base={0.6} outline />
    </div>
  )
}
