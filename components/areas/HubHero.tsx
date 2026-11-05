'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { serifBlack } from './fonts'
import { motion, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion'
import { SERIF } from "@/components/areas/fonts";

/** Headline cut out of a pool photo: the photo drifts inside the letters as the page scrolls. */
export function MaskedHeading({ lines, photo }: { lines: string[]; photo: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['30%', '80%'])
  return (
    <motion.h1
      ref={ref}
      style={{ backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPositionX: '60%', backgroundPositionY: y, fontWeight: 900 }}
      className={`${serifBlack.className} text-[clamp(30px,13vw,230px)] md:text-[clamp(60px,14vw,230px)] leading-[0.92] uppercase !tracking-[-0.01em] text-transparent bg-clip-text bg-[#1c1c1c]`}
    >
      {lines.map((l) => (
        <span key={l} className="block whitespace-nowrap">
          {l}
        </span>
      ))}
    </motion.h1>
  )
}

type City = { name: string; slug: string }

function Row({ cities, base, outline }: { cities: City[]; base: number; outline?: boolean }) {
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
  const run = [...cities, ...cities]
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div ref={ref} style={{ x }} className="inline-flex items-center">
        {run.map((c, i) => (
          <span key={i} className="inline-flex items-center">
            <Link
              href={`/service-areas/${c.slug}/`}
              tabIndex={i < cities.length ? 0 : -1}
              className={`text-[clamp(40px,7vw,104px)] leading-[1.15] transition-colors hover:text-brand ${outline ? 'text-transparent [-webkit-text-stroke:1.2px_#1c1c1c] hover:[-webkit-text-stroke-color:#00AEC7]' : 'text-ink italic'}`}
              style={{ fontFamily: SERIF }}
            >
              {c.name}
            </Link>
            <span className="mx-10 text-[clamp(28px,4vw,56px)] text-brand not-italic [-webkit-text-stroke:0]" aria-hidden="true">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/** Two rows of city names drifting in opposite directions; they surge when you scroll. Every name links to its city page. */
export function CityMarquee({ cities }: { cities: City[] }) {
  const half = Math.ceil(cities.length / 2)
  return (
    <div className="py-6 select-none motion-reduce:[&_*]:!transform-none">
      <Row cities={cities.slice(0, half)} base={-0.6} />
      <Row cities={cities.slice(half)} base={0.6} outline />
    </div>
  )
}
