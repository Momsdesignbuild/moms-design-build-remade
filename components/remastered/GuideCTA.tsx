'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import GuideForm, { type GuideCopy } from '@/components/guide/GuideForm'

/**
 * Side-tab lead magnet on every page of the main site (Josh 11/5; first built 8/11,
 * archived 8/17). Not a load popup: a small tab rests on the right edge, nudges once,
 * and the guide card opens only on click. Words and the cover photo come from the
 * Studio ("guide" text document); the layout passes them in.
 */
export default function GuideCTA({ c }: { c: GuideCopy }) {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)

  // one gentle nudge after the visitor has settled in
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 4000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setNudge(false) }}
        aria-label={c.tab}
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 bg-ink text-white flex items-center gap-2
          px-[8px] py-[13px] text-[13px] md:px-3 md:py-5 md:text-[20px] font-[500] tracking-[0.22em] uppercase
          [writing-mode:vertical-rl] rotate-180
          shadow-[-4px_0_16px_rgba(0,0,0,0.18)] hover:bg-brand transition-all duration-300
          ${nudge ? '-translate-x-2' : ''}`}
      >
        {c.tab}
        <svg className="w-3 h-3 md:w-4 md:h-4 -rotate-90" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 10l5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-[2px] px-4" onClick={() => setOpen(false)}>
          <div
            className="relative w-full max-w-[780px] max-h-[92vh] overflow-y-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border border-ink/15 bg-white hover:border-brand transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2 2 14" stroke="#1C1C1C" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative bg-[#F7F5F2] flex items-center justify-center p-8 md:p-10">
              <Image src={c.image.url} alt={c.image.alt ?? ''} width={1445} height={1870} className="w-[130px] md:w-full h-auto shadow-[0_24px_44px_-20px_rgba(28,28,26,0.55)]" sizes="(max-width: 768px) 200px, 300px" />
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center text-center">
              <p className="text-[16px] font-semibold tracking-[0.3em] uppercase text-brand mb-3">{c.kicker}</p>
              <h2 className="text-[28px] lg:text-[34px] leading-tight text-ink mb-4" style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}>
                {c.heading}
              </h2>
              <p className="text-[18px] font-[300] leading-relaxed text-muted mb-7">{c.body}</p>
              <GuideForm c={c} source="guide-download" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
