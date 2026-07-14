'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// One voice, full width — the Azure Grand homeowners (Edina, 2024).
// Real quote from the project page; designer names never appear (founders' rule).
export default function Testimonial() {
  return (
    <section className="bg-white py-28 lg:py-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="block text-brand text-5xl leading-none mb-8" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote
            className="text-[22px] md:text-[30px] font-[300] leading-[1.5] tracking-[0.01em] text-ink"
            style={{ fontFamily: 'var(--font-heading, "Futura PT", sans-serif)' }}
          >
            Mom&rsquo;s Design Build remodeled our backyard pool and outdoor kitchen. They did
            such a beautiful job! Our family loves to spend time in our new space&hellip; and I
            continue to work with their Fine Gardening team as they also do beautiful work.
          </blockquote>
          <p className="mt-10 text-[10px] font-semibold tracking-[0.28em] uppercase text-muted">
            Homeowners ·{' '}
            <Link href="/portfolio/azure-grand" className="text-ink hover:text-brand transition-colors">
              Azure Grand
            </Link>{' '}
            · Edina, MN
          </p>
        </motion.div>
      </div>
    </section>
  )
}
