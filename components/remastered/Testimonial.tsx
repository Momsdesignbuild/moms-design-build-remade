'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

// Rotating client voices (Summer, 7/14: "a rotation of different quotes").
// Every quote is REAL, verbatim from their live pages — nothing invented,
// no staff names (founders' rule). Auto-advances, dots to jump.
const QUOTES: Array<{ text: string; who: string; href?: string; hrefLabel?: string }> = [
  {
    text:
      'Mom’s Design Build remodeled our backyard pool and outdoor kitchen. They did such a beautiful job! Our family loves to spend time in our new space… and I continue to work with their Fine Gardening team as they also do beautiful work.',
    who: 'Homeowners · Edina, MN',
    href: '/portfolio/azure-grand',
    hrefLabel: 'Azure Grand',
  },
  {
    text:
      'The entire Mom’s team has exceeded our expectations! Their team is exceptionally organized and professional. We had zero stress throughout this project, which for anyone who has done home renovations or landscaping knows that’s not always the case.',
    who: 'Erin G.',
  },
  {
    text:
      'Every Mom’s employee was professional and friendly. We are so happy with the landscaping design and results. We are enjoying our backyard more than we ever imagined. It’s now an extension of our home!',
    who: 'Beth K.',
  },
  {
    text:
      'From start to finish, Mom’s had our best interests at heart. Sometimes you don’t truly know what you want until someone shows it to you… Their design team took the time to get to know our family’s needs and desires, so we could truly make our house a home.',
    who: 'The Casby Family',
  },
  {
    text:
      'I partnered with Mom’s and the results far exceeded my expectations! They thought of design and function elements that I hadn’t even considered. We’ve loved working with Mom’s!',
    who: 'Renee W.',
  },
]

const HOLD_MS = 7000

export default function Testimonial() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), HOLD_MS)
    return () => clearInterval(t)
  }, [])

  const q = QUOTES[i]

  return (
    <section className="bg-white py-28 lg:py-36 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="block text-brand text-5xl leading-none mb-8" aria-hidden="true">
          &ldquo;
        </span>
        {/* fixed stage so the page doesn't jump between quote lengths */}
        <div className="relative min-h-[240px] md:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <blockquote
                className="text-[20px] md:text-[26px] font-[300] leading-[1.5] tracking-[0.01em] text-ink"
                style={{ fontFamily: 'var(--font-heading, "Futura PT", sans-serif)' }}
              >
                {q.text}
              </blockquote>
              <p className="mt-8 text-[20px] font-semibold tracking-[0.28em] uppercase text-muted">
                {q.who}
                {q.href && (
                  <>
                    {' · '}
                    <Link href={q.href} className="text-ink hover:text-brand transition-colors">
                      {q.hrefLabel}
                    </Link>
                  </>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {QUOTES.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Show testimonial ${k + 1}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                k === i ? 'bg-brand scale-125' : 'bg-ink/15 hover:bg-ink/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
