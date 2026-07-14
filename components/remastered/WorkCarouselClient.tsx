'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

export type WorkCard = { title: string; slug: string; location?: string; image: string }

/**
 * Our Work — tall story cards in a drag/snap rail (Apple carousel language),
 * each with a Bria-style white caption card overlapping the photo's foot.
 */
export default function WorkCarouselClient({ projects }: { projects: WorkCard[] }) {
  const rail = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    const el = rail.current
    if (!el) return
    setCanPrev(el.scrollLeft > 24)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 24)

    // mobile wheel: the centered card stands proud, neighbors recede —
    // scale/opacity fall off with distance from the rail's midpoint
    const cards = el.querySelectorAll<HTMLElement>('[data-wheel-card]')
    if (window.innerWidth >= 640) {
      cards.forEach((c) => {
        c.style.transform = ''
        c.style.opacity = ''
      })
      return
    }
    const mid = el.scrollLeft + el.clientWidth / 2
    cards.forEach((c) => {
      const d = Math.min(1, Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) / el.clientWidth)
      c.style.transform = `scale(${1 - d * 0.1})`
      c.style.opacity = `${1 - d * 0.4}`
    })
  }, [])
  useEffect(() => {
    update()
    const el = rail.current
    el?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const nudge = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector('a')
    const w = card ? card.getBoundingClientRect().width + 24 : 420
    el.scrollBy({ left: dir * w * 2, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">Our Work</p>
          <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-ink">
            Legacies We&rsquo;ve Built
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => nudge(-1)}
            disabled={!canPrev}
            aria-label="Previous projects"
            className="w-12 h-12 border border-ink/15 flex items-center justify-center text-ink hover:border-ink transition-colors disabled:opacity-25 disabled:hover:border-ink/15"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => nudge(1)}
            disabled={!canNext}
            aria-label="More projects"
            className="w-12 h-12 border border-ink/15 flex items-center justify-center text-ink hover:border-ink transition-colors disabled:opacity-25 disabled:hover:border-ink/15"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={rail}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 lg:px-10 scroll-pl-6 lg:scroll-pl-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.07, 0.35), ease: 'easeOut' }}
            className="snap-center sm:snap-start shrink-0"
          >
            {/* wheel transform lives on the Link so it never fights framer's wrapper animation */}
            <Link
              href={`/portfolio/${p.slug}`}
              data-wheel-card
              className="group relative block w-[72vw] sm:w-[420px] aspect-[3/4] overflow-hidden bg-brand-light transition-[transform,opacity] duration-200 ease-out"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                quality={90}
                sizes="(max-width: 640px) 72vw, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
              {/* Bria caption card, overlapping the photo's foot */}
              <div className="absolute left-0 bottom-0 bg-white pr-8 pt-5 pb-4 pl-0 max-w-[85%]">
                <div className="pl-6 border-l-2 border-brand">
                  {p.location && (
                    <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-muted mb-1.5">
                      {p.location}
                    </p>
                  )}
                  <h3 className="text-[17px] md:text-[19px] font-[300] tracking-[0.1em] uppercase text-ink">
                    {p.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* rail endcap → all 70 */}
        <Link
          href="/portfolio"
          data-wheel-card
          className="snap-center sm:snap-start shrink-0 w-[60vw] sm:w-[320px] aspect-[3/4] border border-ink/12 flex flex-col items-center justify-center gap-4 text-ink hover:border-ink transition-colors"
        >
          <span className="text-[12px] font-semibold tracking-[0.28em] uppercase">All 70 Projects</span>
          <ArrowRight size={22} />
        </Link>
      </div>
    </section>
  )
}
