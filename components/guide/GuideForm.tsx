'use client'

import { useState } from 'react'

export type GuideCopy = {
  tab: string
  kicker: string
  heading: string
  body: string
  placeholder: string
  button: string
  sending: string
  success: string
  error: string
  note: string
  close: string
  image: { url: string; alt?: string }
}

/** Email field + button for the free guide. Posts to /api/newsletter (Sanity + Brevo list 6). */
export default function GuideForm({ c, source }: { c: GuideCopy; source: 'home' | 'blog' | 'guide-download' }) {
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
        body: JSON.stringify({ email, source }),
      })
      setState(r.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') return <p className="text-[20px] font-[400] tracking-[0.04em] text-brand">{c.success}</p>

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={c.placeholder}
        aria-label={c.placeholder}
        className="border border-ink/20 bg-white px-5 py-3.5 text-[20px] font-[300] text-ink text-center placeholder:text-muted/70 focus:outline-none focus:border-brand transition-colors"
      />
      <button
        type="submit"
        disabled={state === 'busy'}
        className="bg-brand text-white text-[16px] md:text-[20px] font-[600] tracking-[0.18em] md:tracking-[0.24em] uppercase px-6 md:px-8 py-3.5 hover:bg-brand-dark transition-colors disabled:opacity-60"
      >
        {state === 'busy' ? c.sending : c.button}
      </button>
      {state === 'error' && <p className="text-[20px] text-[#C0564F]">{c.error}</p>}
      <p className="text-[14px] font-[300] tracking-[0.04em] text-muted">{c.note}</p>
    </form>
  )
}
