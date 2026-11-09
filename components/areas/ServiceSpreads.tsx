'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Photo } from '@/sanity/lib/areas'
import { SERIF, SIZE_HALF, SIZE_RAIL } from '@/components/areas/fonts'

export type Spread = { title: string; text: string; photos: Photo[]; href?: string; linkLabel?: string }

const OUTLINE = '[-webkit-text-stroke:1.5px_rgba(28,28,28,0.2)] text-transparent' // ui-label: css

/** One photo that wipes open from the bottom as it scrolls in, with the picture drifting inside the frame. */
function Frame({ photo, p, reveal, drift, sizes, className, edge }: { photo: Photo; p: ReturnType<typeof useScroll>['scrollYProgress']; reveal: ReturnType<typeof useScroll>['scrollYProgress']; drift: [number, number]; sizes: string; className: string; edge?: boolean }) {
  const rm = useReducedMotion()
  const clip = useTransform(reveal, [0, 1], rm ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(22% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const y = useTransform(p, [0, 1], rm ? [0, 0] : drift)
  const scale = useTransform(p, [0, 0.5, 1], rm ? [1, 1, 1] : [1.16, 1.06, 1])
  return (
    <motion.div style={{ clipPath: clip, y }} className={`relative overflow-hidden ${edge ? 'bg-white' : 'bg-ink'} ${className}`}>
      <motion.div style={{ scale }} className={`absolute ${edge ? 'inset-[6px] overflow-hidden' : 'inset-0'}`}>
        <Image src={photo.url} alt={photo.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:scale-[1.04]" />
      </motion.div>
    </motion.div>
  )
}

function Row({ s, i }: { s: Spread; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const rm = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const { scrollYProgress: reveal } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.35'] })
  const num = useTransform(p, [0, 1], rm ? [0, 0] : [90, -90])
  const flip = i % 2 === 1
  const [a, b, c] = s.photos
  const words = s.title.split(' ')
  return (
    <div ref={ref} id={`build-${i + 1}`} className="relative overflow-hidden px-6 py-16 lg:py-28 scroll-mt-24">
      <motion.p aria-hidden="true" style={{ y: num, fontFamily: SERIF }} className={`pointer-events-none select-none absolute top-6 ${flip ? 'left-4 lg:left-10' : 'right-4 lg:right-10'} text-[clamp(120px,20vw,300px)] leading-none ${OUTLINE}`}>
        {String(i + 1).padStart(2, '0')}
      </motion.p>
      <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* photos */}
        <div className={`relative lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          {a && <Frame photo={a} p={p} reveal={reveal} drift={[50, -50]} sizes={SIZE_HALF} className="aspect-[4/3] w-full lg:w-[86%]" />}
          <div className="grid grid-cols-2 gap-3 mt-3 lg:mt-0 lg:block">
            {b && <div className={`lg:absolute lg:w-[38%] lg:-bottom-12 ${flip ? 'lg:left-[-6%]' : 'lg:right-0'}`}><Frame edge photo={b} p={p} reveal={reveal} drift={[-30, 70]} sizes={SIZE_RAIL} className="aspect-[4/5] w-full" /></div>}
            {c && <div className={`lg:absolute lg:w-[30%] lg:-top-10 ${flip ? 'lg:right-[4%]' : 'lg:left-[-5%]'}`}><Frame edge photo={c} p={p} reveal={reveal} drift={[80, -20]} sizes={SIZE_RAIL} className="aspect-square w-full" /></div>}
          </div>
        </div>
        {/* words */}
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''} lg:py-10`}>
          <h3 className="text-[clamp(34px,4.2vw,58px)] leading-[1.05] mb-6 !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }} aria-label={s.title}>
            {words.map((w, k) => (
              <motion.span key={k} aria-hidden="true" initial={rm ? false : { opacity: 0.15, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.7, delay: k * 0.07, ease: [0.2, 0.7, 0.2, 1] }} className="inline-block mr-[0.26em]">{w}</motion.span>
            ))}
          </h3>
          <motion.p initial={rm ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }} className="text-[19px] lg:text-[21px] font-[300] leading-relaxed text-muted">{s.text}</motion.p>
          {s.href && s.linkLabel && <Link href={s.href} className="inline-block mt-5 text-[18px] tracking-[0.12em] text-brand border-b border-brand/40 hover:border-brand">{s.linkLabel} →</Link>}
        </div>
      </div>
    </div>
  )
}

/** The "what we build" section: every service in view at once (jump chips), then one spread per service with layered photos that wipe open and drift as you scroll. */
export default function ServiceSpreads({ heading, spreads, foot }: { heading: string; spreads: Spread[]; foot?: React.ReactNode }) {
  const rm = useReducedMotion()
  const words = heading.split(' ')
  return (
    <section className="bg-white">
      <div className="px-6 pt-20 lg:pt-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[clamp(40px,6.4vw,92px)] leading-[1.02] mb-10 !text-ink !font-normal !tracking-normal" style={{ fontFamily: SERIF }} aria-label={heading}>
            {words.map((w, k) => (
              <motion.span key={k} aria-hidden="true" initial={rm ? false : { opacity: 0.12, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.8, delay: k * 0.08, ease: [0.2, 0.7, 0.2, 1] }} className="inline-block mr-[0.24em]">{w}</motion.span>
            ))}
          </h2>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 border-t border-b border-ink/15 py-5">
            {spreads.map((s, i) => (
              <a key={s.title} href={`#build-${i + 1}`} className="group flex items-baseline gap-3 text-[18px] lg:text-[20px] text-ink hover:text-brand transition-colors">
                <span className="text-[14px] tracking-[0.2em] text-brand">{String(i + 1).padStart(2, '0')}</span>
                <span className="border-b border-transparent group-hover:border-brand">{s.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      {spreads.map((s, i) => <Row key={s.title} s={s} i={i} />)}
      {foot && <div className="px-6 pb-20 lg:pb-28"><div className="max-w-[1400px] mx-auto">{foot}</div></div>}
    </section>
  )
}
