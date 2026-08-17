'use client'

import { useState } from 'react'

/** editorial newsletter band — capture their WP site never had */
export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state === 'busy') return
    setState('busy')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="bg-[#f7f4ef] py-16 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-[10px] font-[500] tracking-[0.3em] uppercase text-muted mb-3">The Mom&rsquo;s List</p>
        <h2 className="text-[18px] md:text-[22px] font-[300] tracking-[0.15em] uppercase text-ink mb-3">
          Design Stories, Delivered
        </h2>
        <p className="text-[20px] font-[300] tracking-[0.04em] text-muted mb-8">
          Trends, project reveals, and seasonal tips from Minnesota&rsquo;s most award-winning design-build team.
        </p>

        {state === 'done' ? (
          <p className="text-[20px] font-[400] tracking-[0.08em] text-ink">
            You&rsquo;re on the list — welcome. 🌿
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 border border-ink/20 bg-white px-4 py-3 text-[20px] font-[300] tracking-[0.04em] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink"
            />
            <button
              type="submit"
              disabled={state === 'busy'}
              className="border border-ink bg-ink text-white text-[10px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-white hover:text-ink transition-colors duration-300 disabled:opacity-60"
            >
              {state === 'busy' ? 'Joining…' : 'Join'}
            </button>
          </form>
        )}
        {state === 'error' && (
          <p className="mt-3 text-[12px] text-red-700/80">Something went wrong — try again.</p>
        )}
      </div>
    </section>
  )
}
