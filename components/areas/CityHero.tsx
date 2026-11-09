'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Photo } from '@/sanity/lib/areas'
import { SERIF } from '@/components/areas/fonts'

export type HeroSlide = { photo: Photo; title?: string; place?: string; href?: string }

/**
 * City page opener, centered like the home page hero. One headline (what we build and where) carries the page;
 * photos from this city's work crossfade slowly. Desktop adds a quiet proof line;
 * phones keep only the headline and the two buttons.
 */
export default function CityHero({ headline, facts, primary, secondary, slides }: {
  headline: string; facts: string[]; primary: string; secondary: string
  slides: HeroSlide[]
}) {
  const rm = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (rm || slides.length < 2) return
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [rm, slides.length])
  const { scrollY } = useScroll()
  const lift = useTransform(scrollY, [0, 600], rm ? [0, 0] : [0, -60])
  const sink = useTransform(scrollY, [0, 600], rm ? [0, 0] : [0, 90])
  const s = slides[i]
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white min-h-[600px] h-[88svh] lg:h-[92svh]">
      <motion.div style={{ y: sink }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div key={s.photo.url} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: 'easeInOut' }} className="absolute inset-0">
            <motion.div initial={{ scale: rm ? 1 : 1.12 }} animate={{ scale: 1 }} transition={{ duration: 7, ease: 'easeOut' }} className="absolute inset-0">
              <Image src={s.photo.url} alt={s.photo.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" aria-hidden="true" />

      <motion.div style={{ y: lift }} className="relative z-20 h-full max-w-[1100px] mx-auto px-6 flex flex-col items-center justify-center text-center pt-16 pb-10">
        <h1 className="mb-10 max-w-[1000px] text-[clamp(34px,4.8vw,70px)] leading-[1.06] !text-white !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>
          {headline.split(' ').map((w, k) => (
            <span key={k}>
              <motion.span initial={{ opacity: 0.2, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 + k * 0.07, ease: [0.2, 0.7, 0.2, 1] }} className="inline-block">{w}</motion.span>{' '}
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link href="/contact" className="w-full sm:w-auto text-center bg-brand text-white text-[17px] font-[600] tracking-[0.22em] uppercase px-8 py-4 hover:bg-brand-dark transition-colors">{primary}</Link>
          <Link href="/portfolio" className="w-full sm:w-auto text-center border border-white/70 text-white text-[17px] font-[600] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white hover:text-ink transition-colors">{secondary}</Link>
        </motion.div>

        {/* desktop only: one quiet proof line, hairlines above and below like the home hero */}
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.9 }} className="hidden lg:flex items-center justify-between gap-8 w-full max-w-[920px] mt-14 py-3 border-y border-white/40 text-[13px] xl:text-[14px] tracking-[0.2em] uppercase text-white/90">
          {facts.map((f) => <li key={f} className="whitespace-nowrap">{f}</li>)}
        </motion.ul>
      </motion.div>

      {slides.length > 1 && (
        <div className="absolute z-20 inset-x-0 bottom-5 flex justify-center gap-2" aria-hidden="true">
          {slides.map((_, k) => <span key={k} className={`h-[3px] w-14 transition-colors duration-500 ${k === i ? 'bg-white' : 'bg-white/30'}`} />)}
        </div>
      )}
    </section>
  )
}
