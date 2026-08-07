'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * "Join the List" — homepage email capture above the footer (marketing 8/7,
 * modeled on Bria Hammel's guide tile: photo left, serif headline, one-line
 * pitch, email field, quiet button). Posts to the existing /api/newsletter
 * lane — same subscriber list as the blog capture.
 */
export default function JoinTheList({ img, imgAlt }: { img: string; imgAlt: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === 'busy') return
    setState('busy')
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setState(r.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="bg-[#F7F5F2] px-6 py-16 lg:py-20">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 bg-white shadow-[0_30px_60px_-40px_rgba(28,28,26,0.35)]">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px]">
          <Image src={img} alt={imgAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
        </div>
        <div className="p-10 lg:p-14 flex flex-col justify-center text-center">
          <p className="text-[14px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">Join the List</p>
          <h2
            className="text-[26px] lg:text-[30px] italic leading-snug text-ink mb-4"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
          >
            Design stories, delivered
          </h2>
          <p className="text-[16px] font-[300] leading-relaxed text-muted mb-8">
            Project reveals, seasonal ideas, and what we&apos;re building next — straight from the Mom&apos;s
            Design Build studio.
          </p>
          {state === 'done' ? (
            <p className="text-[16px] font-[400] tracking-[0.08em] text-brand">
              You&apos;re on the list — welcome!
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
                className="bg-brand text-white text-[13px] font-[600] tracking-[0.28em] uppercase px-8 py-3.5 hover:bg-brand-dark transition-colors disabled:opacity-60"
              >
                {state === 'busy' ? 'Joining…' : 'Join the List'}
              </button>
              {state === 'error' && (
                <p className="text-[14px] text-[#C0564F]">Something went wrong — try again?</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
