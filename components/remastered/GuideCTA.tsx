'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

/**
 * Side-tab lead magnet (marketing 8/11): NOT a load-triggered popup — she was
 * explicit that intrusive popups are off the table. A small tab rests against
 * the edge of the viewport and nudges once; the guide card only opens on
 * click. Card styling copies the Bria Hammel guide tile she pointed to:
 * photo left, boxed close X, serif headline w/ italic "(FREE!)", email
 * field, solid stone-tan button. Posts to /api/newsletter — same subscriber
 * list as Join the List (confirmed same-list on the 8/11 call).
 *
 * PLACEHOLDER: guide doesn't exist yet ("we're creating it" - transcript).
 * Swap `guideTitle`/`guideBody`/`img` for the real guide once it's built —
 * everything below is wired but using Interior Design & Remodeling's stock
 * photo as a stand-in.
 */
export default function GuideCTA({
  img = 'https://cdn.sanity.io/images/wavk40jo/production/e8a89a12d85b1b115c9966e277c9c37745ba9c70-2400x1600.jpg',
  imgAlt = "Mom's Design Build interior project",
  guideTitle = 'Design Guide',
  guideBody = 'our favorite, tried-and-true ideas from our own projects',
}: {
  img?: string
  imgAlt?: string
  guideTitle?: string
  guideBody?: string
}) {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')

  // one gentle nudge after the visitor's settled in, so the tab reads as
  // interactive without acting like a popup
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

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === 'busy') return
    setState('busy')
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'guide-download' }),
      })
      setState(r.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <>
      {/* side tab */}
      <button
        type="button"
        onClick={() => { setOpen(true); setNudge(false) }}
        aria-label="Open free design guide"
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 bg-ink text-white
          px-3 py-5 text-[16px] font-[500] tracking-[0.22em] uppercase
          [writing-mode:vertical-rl] rotate-180
          shadow-[-4px_0_16px_rgba(0,0,0,0.18)] hover:bg-brand transition-all duration-300
          ${nudge ? '-translate-x-2' : ''}`}
      >
        Free Guide
      </button>

      {/* modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-[2px] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[760px] grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border border-ink/15 bg-white hover:border-brand transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2 2 14" stroke="#1C1C1C" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
              <Image src={img} alt={imgAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" />
            </div>

            <div className="p-10 lg:p-12 flex flex-col justify-center text-center">
              <h2
                className="text-[24px] lg:text-[28px] leading-snug text-ink mb-5"
                style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
              >
                {guideTitle}
              </h2>
              <p className="text-[16px] font-[300] leading-relaxed text-muted mb-8">
                Download <em className="italic">(FREE!)</em> {guideBody}.
              </p>

              {state === 'done' ? (
                <p className="text-[16px] font-[400] tracking-[0.08em] text-brand">
                  Check your inbox — your guide is on the way!
                </p>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    aria-label="Email address"
                    className="border border-ink/20 px-5 py-3.5 text-[16px] font-[300] text-ink text-center placeholder:text-muted/70 focus:outline-none focus:border-brand transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={state === 'busy'}
                    className="bg-brand-stone text-white text-[16px] font-[600] tracking-[0.28em] uppercase px-8 py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {state === 'busy' ? 'Sending…' : 'Get the Guide'}
                  </button>
                  {state === 'error' && (
                    <p className="text-[16px] text-[#C0564F]">Something went wrong — try again?</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
