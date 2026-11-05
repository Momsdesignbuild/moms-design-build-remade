'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import GuideForm, { type GuideCopy } from '@/components/guide/GuideForm'
import { SERIF, SIZE_BOOK_SM, GUIDE_TAB_CSS } from "@/components/areas/fonts";

/**
 * Side-tab lead magnet on every page of the main site (Josh 11/5; first built 8/11,
 * archived 8/17). Not a load popup: a small tab rests on the right edge, nudges once,
 * and the guide card opens only on click. Words and the cover photo come from the
 * Studio ("guide" text document); the layout passes them in.
 */
export default function GuideCTA({ c }: { c: GuideCopy }) {
  const [open, setOpen] = useState(false)


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
      <style>{GUIDE_TAB_CSS}</style>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={c.tab}
        className="gh group fixed right-0 bottom-28 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-40 flex flex-col items-center justify-center overflow-hidden bg-brand text-white rounded-l-[14px] w-[28px] md:w-[32px] h-[170px] md:h-[200px]"
      >
        <svg className="gh-arrow shrink-0 w-5 h-5 md:w-6 md:h-6" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10.5 2.5 5 8l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="gh-label block overflow-hidden whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[13px] md:text-[16px] font-[600] tracking-[0.26em] uppercase">{c.tab}</span>
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
              <Image src={c.image.url} alt={c.image.alt ?? ''} width={1445} height={1870} className="w-[130px] md:w-full h-auto shadow-[0_24px_44px_-20px_rgba(28,28,26,0.55)]" sizes={SIZE_BOOK_SM} />
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center text-center">
              <p className="text-[16px] font-semibold tracking-[0.3em] uppercase text-brand mb-3">{c.kicker}</p>
              <h2 className="text-[28px] lg:text-[34px] leading-tight text-ink mb-4" style={{ fontFamily: SERIF }}>
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
