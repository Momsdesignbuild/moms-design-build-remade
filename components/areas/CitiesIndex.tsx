'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { SERIF } from '@/components/areas/fonts'

export type IndexCity = { slug: string; name: string; region: string; count: number; photos: { url: string; alt: string; ratio: number }[] }

/**
 * The full list: huge serif names, region chips, search. Filtering reflows the rows with a
 * layout animation. On desktop a photo slides out of the hovered row and the others soften
 * to 45% (never black); on phones each row simply shows its photo.
 */
export default function CitiesIndex({ cities, regions, allRegions, placeholder, noMatch, one, many, view }: {
  cities: IndexCity[]; regions: string[]; allRegions: string; placeholder: string; noMatch: string; one: string; many: string; view: string
}) {
  const [open, setOpen] = useState('')
  const fine = () => window.matchMedia('(pointer: fine)').matches
  const [region, setRegion] = useState('')
  const [q, setQ] = useState('')
  const shown = useMemo(
    () => cities.filter((c) => (!region || c.region === region) && c.name.toLowerCase().includes(q.trim().toLowerCase())),
    [cities, region, q],
  )
  const chip = (on: boolean) => `shrink-0 px-5 py-2.5 text-[16px] tracking-[0.16em] uppercase border transition-colors ${on ? 'bg-ink text-white border-ink' : 'border-ink/20 text-ink hover:border-ink'}`
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between mb-10">
        <div className="flex gap-2 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 pb-1 [scrollbar-width:none]">
          <button type="button" className={chip(!region)} onClick={() => setRegion('')}>{allRegions}</button>
          {regions.map((r) => <button key={r} type="button" className={chip(region === r)} onClick={() => setRegion(r === region ? '' : r)}>{r}</button>)}
        </div>
        <input
          type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder}
          className="w-full lg:w-[340px] bg-white border border-ink/20 px-5 py-3 text-[20px] font-[300] focus:outline-none focus:border-brand"
        />
      </div>

      <ul className="group/list [@media(pointer:fine)]:[&:hover>li:not(:hover)]:opacity-45">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((c) => (
            <motion.li
              key={c.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              className="transition-opacity duration-300 [@media(pointer:fine)]:hover:!opacity-100"
            >
              <div onMouseEnter={() => fine() && setOpen(c.slug)} onMouseLeave={() => fine() && setOpen('')} onFocus={() => fine() && setOpen(c.slug)}>
                <Link
                  href={`/service-areas/${c.slug}/`}
                  onClick={(e) => { if (!fine()) { e.preventDefault(); setOpen(open === c.slug ? '' : c.slug) } }}
                  aria-expanded={open === c.slug}
                  className="group/row flex items-center gap-4 lg:gap-8 py-3 lg:py-4"
                >
                  <span className="min-w-0">
                    <span className="block text-[clamp(28px,6vw,84px)] leading-[1.05] text-ink" style={{ fontFamily: SERIF }}>{c.name}</span>
                    {c.count > 0 && <span className="block sm:hidden text-[13px] tracking-[0.18em] uppercase text-brand">{c.count} {c.count === 1 ? one : many}</span>}
                  </span>
                  <span className="hidden sm:block ml-auto text-right text-[16px] tracking-[0.18em] uppercase text-muted">
                    <span className="block">{c.region}</span>
                    {c.count > 0 && <span className="block text-brand">{c.count} {c.count === 1 ? one : many}</span>}
                  </span>
                  <span aria-hidden="true" className={`ml-auto sm:ml-0 text-[28px] text-brand transition-transform duration-300 ${open === c.slug ? 'rotate-90 sm:rotate-0 sm:translate-x-1.5' : ''}`}>→</span>
                </Link>
                {/* the row grows downward into a strip of mini photos */}
                <div className={`grid transition-[grid-template-rows] duration-[650ms] ease-[cubic-bezier(.2,.7,.2,1)] ${open === c.slug ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="flex gap-2 overflow-x-auto pb-5 pt-1 [scrollbar-width:none]">
                      {c.photos.map((ph, k) => (
                        <span
                          key={ph.url}
                          className={`relative shrink-0 h-[108px] lg:h-[160px] overflow-hidden bg-ink transition-all duration-[700ms] ease-[cubic-bezier(.2,.7,.2,1)] ${open === c.slug ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'}`}
                          style={{ aspectRatio: ph.ratio, transitionDelay: open === c.slug ? `${120 + k * 70}ms` : '0ms' }}
                        >
                          <Image src={ph.url} alt={ph.alt} fill sizes="320px" className="object-cover" />
                        </span>
                      ))}
                      <Link href={`/service-areas/${c.slug}/`} className="shrink-0 self-center px-6 text-[16px] tracking-[0.2em] uppercase text-brand border-b border-brand/40 hover:border-brand whitespace-nowrap">{view} →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {!shown.length && <p className="text-[22px] font-[300] text-muted py-10">{noMatch}</p>}
    </div>
  )
}
