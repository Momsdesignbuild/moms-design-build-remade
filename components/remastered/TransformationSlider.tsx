'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BeforeAfterSlider from '@/components/portfolio/BeforeAfterSlider'

// The most visceral proof a design-build firm can offer: one real backyard,
// dragged from mud to legacy. Urban Oasis (St. Paul) — their own captioned
// BEFORE/AFTER pair from the WP gallery.
const BEFORE = 'https://cdn.sanity.io/images/wavk40jo/production/2e4413df61bc1f93e588cbd43a80ff9269a14da9-1080x1080.jpg?w=1600&auto=format&q=85'
const AFTER = 'https://cdn.sanity.io/images/wavk40jo/production/312b09e263fb8652c0d52d205900290256cd288b-1080x1080.jpg?w=1600&auto=format&q=85'

export default function TransformationSlider() {
  return (
    <section className="bg-white py-24 lg:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-[14px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">The Transformation</p>
          <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-ink">
            Same Backyard
          </h2>
          <p className="mt-4 text-[13px] md:text-[14px] font-[300] tracking-[0.04em] text-muted">
            Drag the line. St. Paul&rsquo;s{' '}
            <Link href="/portfolio/urban-oasis" className="underline underline-offset-4 decoration-ink/25 hover:decoration-ink transition-colors">
              Urban Oasis
            </Link>
            , before and after.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="bg-white p-3 shadow-[0_30px_60px_-30px_rgba(28,28,26,0.3)]"
        >
          <BeforeAfterSlider
            beforeUrl={BEFORE}
            afterUrl={AFTER}
            beforeAlt="Urban Oasis backyard before construction"
            afterAlt="Urban Oasis finished backyard"
          />
        </motion.div>
      </div>
    </section>
  )
}
