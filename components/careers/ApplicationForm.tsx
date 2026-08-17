'use client'

import { useState } from 'react'

const field =
  'w-full border border-ink/20 bg-white px-4 py-3 text-[20px] font-[300] tracking-[0.04em] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink'

/** working replacement for their WP job-application form — submissions → Sanity */
export default function ApplicationForm() {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'busy') return
    setState('busy')
    const f = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          phone: f.get('phone'),
          position: f.get('position'),
          message: f.get('message'),
          resumeUrl: f.get('resumeUrl'),
        }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="text-center py-16">
        <p className="text-[20px] font-[300] tracking-[0.1em] uppercase text-ink mb-3">Application received</p>
        <p className="text-[20px] font-[300] text-muted">
          Thank you — our team will be in touch if there&rsquo;s a fit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input name="name" required placeholder="Full name *" className={field} />
        <input name="email" type="email" required placeholder="Email *" className={field} />
        <input name="phone" type="tel" placeholder="Phone" className={field} />
        <input name="position" placeholder="Position you're applying for" className={field} />
      </div>
      <input name="resumeUrl" type="url" placeholder="Link to your resume (Google Drive, Dropbox, LinkedIn…)" className={field} />
      <textarea
        name="message"
        rows={6}
        placeholder="Tell us about yourself — experience, what draws you to Mom's…"
        className={field}
      />
      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={state === 'busy'}
          className="border border-ink bg-ink text-white text-[20px] font-[500] tracking-[0.2em] uppercase px-10 py-3 hover:bg-white hover:text-ink transition-colors duration-300 disabled:opacity-60"
        >
          {state === 'busy' ? 'Submitting…' : 'Submit Application'}
        </button>
        {state === 'error' && (
          <p className="mt-3 text-[20px] text-red-700/80">Something went wrong — try again or email hello@momsdesignbuild.com</p>
        )}
      </div>
    </form>
  )
}
