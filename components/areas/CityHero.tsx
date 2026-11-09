'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Photo } from '@/sanity/lib/areas'
import { SERIF } from '@/components/areas/fonts'

export type HeroSlide = { photo: Photo; title?: string; place?: string; href?: string }

/**
 * City page opener. Someone who has never heard of Mom's should learn who we are in one glance:
 * what we do, how long, the proof, and a real local project, with a way to act (meet / call).
 * Photos from this city's work crossfade slowly; the headline, line and buttons are readable at once.
 */
export default function CityHero({ city, kicker, tagline, intro, facts, primary, secondary, call, phone, phoneHref, slides, chipLabel, tail }: {
  city: string; kicker: string; tagline: string; intro: string; facts: string[]; primary: string; secondary: string
  call: string; phone: string; phoneHref: string; slides: HeroSlide[]; chipLabel: string; tail: string
}) {
  const rm = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (rm || slides.length < 2) return
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [rm, slides.length])
  const { scrollY } = useScroll()
  const lift = useTransform(scrollY, [0, 600], rm ? [0, 0] : [0, -70])
  const sink = useTransform(scrollY, [0, 600], rm ? [0, 0] : [0, 90])
  const s = slides[i]
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white min-h-[640px] h-[92svh]">
      <motion.div style={{ y: sink }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div key={s.photo.url} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: 'easeInOut' }} className="absolute inset-0">
            <motion.div initial={{ scale: rm ? 1 : 1.12 }} animate={{ scale: 1 }} transition={{ duration: 7, ease: 'easeOut' }} className="absolute inset-0">
              <Image src={s.photo.url} alt={s.photo.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" aria-hidden="true" />

      <motion.div style={{ y: lift }} className="relative z-20 h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-center pt-20 pb-36">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-[18px] font-semibold tracking-[0.34em] uppercase text-white/90 mb-4">{kicker}</motion.p>
        <h1 className="mb-6 !text-white !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>
          <span className="block text-[clamp(64px,12vw,188px)] leading-[0.9]" style={{ fontFamily: SERIF }}>
          {city.split(' ').map((word, wi, arr) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split('').map((ch, k) => (
                <motion.span key={k} initial={{ opacity: 0.2, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 + (k + wi * 5) * 0.045, ease: [0.2, 0.7, 0.2, 1] }} className="inline-block">{ch}</motion.span>
              ))}
              {wi < arr.length - 1 ? <span className="inline-block w-[0.28em]" aria-hidden="true" /> : null}
            </span>
          ))}
          </span>{" "}
          <span className="block mt-3 text-[18px] lg:text-[22px] font-[400] tracking-[0.28em] uppercase text-white/90">{tail}</span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="text-[22px] lg:text-[28px] font-[300] tracking-[0.02em] max-w-[760px] text-white mb-4">{tagline}</motion.p>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="text-[18px] lg:text-[20px] font-[300] leading-relaxed max-w-[640px] text-white/85 mb-9">{intro}</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }} className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="bg-brand text-white text-[18px] font-[600] tracking-[0.22em] uppercase px-8 py-4 hover:bg-brand-dark transition-colors">{primary}</Link>
          <Link href="/portfolio" className="border border-white/70 text-white text-[18px] font-[600] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white hover:text-ink transition-colors">{secondary}</Link>
          <a href={phoneHref} className="text-[19px] tracking-[0.12em] px-3 py-4 border-b border-transparent hover:border-white/70 transition-colors">{call} {phone}</a>
        </motion.div>
      </motion.div>

      {/* proof strip: who we are, at a glance */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent">
        <div className="max-w-[1400px] mx-auto px-6 pb-7 pt-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <ul className="flex flex-wrap gap-x-10 gap-y-2">
            {facts.map((f, k) => (
              <motion.li key={f} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 + k * 0.1 }} className="text-[15px] lg:text-[17px] tracking-[0.18em] uppercase text-white/90 flex items-center gap-3">
                <span className="w-6 h-px bg-brand" aria-hidden="true" />{f}
              </motion.li>
            ))}
          </ul>
          {s.title && (
            <Link href={s.href ?? '/portfolio'} className="group flex items-center gap-4 self-start lg:self-auto border border-white/30 bg-black/35 backdrop-blur-sm px-5 py-3 hover:border-white/70 transition-colors">
              <span className="text-[13px] tracking-[0.28em] uppercase text-white/70">{chipLabel}</span>
              <span className="text-[19px]" style={{ fontFamily: SERIF }}>{s.title}</span>
              {s.place && <span className="text-[13px] tracking-[0.2em] uppercase text-white/70">{s.place}</span>}
              <span aria-hidden="true" className="text-brand group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </div>
        {slides.length > 1 && (
          <div className="flex gap-2 max-w-[1400px] mx-auto px-6 pb-4" aria-hidden="true">
            {slides.map((_, k) => <span key={k} className={`h-[3px] flex-1 max-w-[80px] transition-colors duration-500 ${k === i ? 'bg-white' : 'bg-white/30'}`} />)}
          </div>
        )}
      </div>
    </section>
  )
}
