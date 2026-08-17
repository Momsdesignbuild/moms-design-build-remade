'use client'

import { motion } from 'framer-motion'
import BeforeAfterSlider from '@/components/portfolio/BeforeAfterSlider'

// 8/11 marketing swap (Josh, via call transcript): replaced the Urban Oasis
// pair with the backyard photos she sent directly (her "Hamill project").
// No matching portfolio page for this project, so served from /public
// rather than Sanity; filenames + caption stay client-name-free per the
// no-client-identifying-info rule (public URL paths count).
const BEFORE = '/images/homepage-transformation/backyard-before.jpg'
const AFTER = '/images/homepage-transformation/backyard-after.jpg'

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
          <p className="text-[16px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">The Transformation</p>
          <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-ink">
            Same Backyard
          </h2>
          <p className="mt-4 text-[16px] font-[300] tracking-[0.04em] text-muted">
            Drag the line. One real backyard, before and after.
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
            beforeAlt="Backyard before construction"
            afterAlt="Finished backyard transformation"
          />
        </motion.div>
      </div>
    </section>
  )
}
