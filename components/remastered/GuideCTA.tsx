'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import GuideForm, { type GuideCopy } from '@/components/guide/GuideForm'
import { SERIF, SIZE_BOOK_SM, GUIDE_TAB_CSS } from '@/components/areas/fonts'

/**
 * Free-guide tab on every page of the main site. A slim teal handle rests on the right edge
 * with just an arrow. Hovering it widens the handle so FREE GUIDE sits next to the arrow, and it
 * stays open while you hover. Every 10 seconds it does the same on its own, then settles back. Clicking opens the guide card, which slides
 * in from the left. Words and the cover come from the Studio ("guide" text document).
 */
export default function GuideCTA({ c }: { c: GuideCopy }) {
  const [open, setOpen] = useState(false)   // card is mounted
  const [shown, setShown] = useState(false) // card is slid in
  const [taunt, setTaunt] = useState(false)

  const hovering = useRef(false)
  // the timed taunt never fights a hover: while the pointer is on the tab it simply stays open
  const play = useCallback(() => { if (!hovering.current) setTaunt(true) }, [])

  // first taunt after the visitor has settled in, then every 10 seconds while the card is closed
  useEffect(() => {
    if (open) return
    const first = setTimeout(play, 3500)
    const every = setInterval(play, 10000)
    return () => { clearTimeout(first); clearInterval(every) }
  }, [open, play])

  const show = () => { setOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setShown(true))) }
  const hide = useCallback(() => { setShown(false); setTimeout(() => setOpen(false), 450) }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, hide])

  return (
    <>
      <style>{GUIDE_TAB_CSS}</style>
      <button
        type="button"
        onClick={show}
        onMouseEnter={() => { hovering.current = true; setTaunt(false) }}
        onMouseLeave={() => { hovering.current = false }}
        onAnimationEnd={(e) => e.target === e.currentTarget && setTaunt(false)}
        aria-label={c.tab}
        className={`gh ${taunt ? 'gh-taunt' : ''} fixed right-0 bottom-28 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-40 flex items-center justify-start overflow-hidden bg-brand text-white rounded-l-[14px] w-[28px] md:w-[32px] h-[150px] md:h-[180px] p-0`}
      >
        <span className="gh-arrow flex shrink-0 w-[28px] md:w-[32px] items-center justify-center">
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10.5 2.5 5 8l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="gh-label whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12px] md:text-[14px] font-[600] tracking-[0.24em] uppercase ml-1">{c.tab}</span>
      </button>

      {open && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-colors duration-[450ms] ${shown ? 'bg-ink/60 backdrop-blur-[2px]' : 'bg-ink/0'}`} onClick={hide}>
          <div
            className={`relative w-full max-w-[780px] max-h-[92vh] overflow-y-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] bg-white shadow-2xl transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] ${shown ? 'translate-x-0' : '-translate-x-[120vw]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={hide}
              aria-label={c.close}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border border-ink/15 bg-white hover:border-brand transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2 2 14" stroke="#1C1C1C" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative bg-[#F7F5F2] flex items-center justify-center p-8 md:p-10">
              <Image src={c.image.url} alt={c.image.alt ?? ''} width={1445} height={1870} className="w-[130px] md:w-full h-auto shadow-[0_24px_44px_-20px_rgba(28,28,26,0.55)]" sizes={SIZE_BOOK_SM} loading="eager" />
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
