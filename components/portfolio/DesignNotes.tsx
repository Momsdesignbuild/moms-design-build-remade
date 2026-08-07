'use client'

import { motion } from 'framer-motion'
import type { ProjectNotes } from '@/content/project-notes'

/**
 * Design Notes — the story behind the project, mined from MDB's own award
 * submissions and job records. Renders only for projects with researched
 * notes. Additive: never replaces the WP-carbon body text above it.
 */
export default function DesignNotes({ notes }: { notes: ProjectNotes }) {
  return (
    <section data-addition="design-notes" className="bg-[#F7F5F2] py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-[14px] italic tracking-[0.28em] uppercase text-brand mb-4" style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}>
            Behind the Design
          </p>
          <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-brand">
            Design Notes
          </h2>
        </motion.div>

        {/* The story — before → after, in prose */}
        {notes.story && (
          <div className="mb-16 lg:mb-20 max-w-3xl space-y-10">
            {notes.story.map((ch, i) => (
              <motion.div
                key={ch.kicker}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
              >
                <p className="text-[22px] md:text-[24px] font-[300] tracking-[0.22em] uppercase text-brand mb-3">
                  {ch.kicker}
                </p>
                <p
                  className="text-[17px] md:text-[20px] font-[300] leading-[1.65] text-ink/85"
                  style={{ fontFamily: 'var(--font-heading, "Futura PT", sans-serif)' }}
                >
                  {ch.text}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* The brief — what the clients asked for */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            <h3 className="text-[19px] font-[600] tracking-[0.24em] uppercase text-brand mb-6 pb-3 border-b border-ink/15">
              The Brief
            </h3>
            <ul className="space-y-3.5">
              {notes.brief.map((b) => (
                <li key={b} className="flex gap-3 text-[16px] font-[300] leading-relaxed text-brand-mid">
                  <span className="text-brand mt-[2px] shrink-0">—</span>
                  {b}
                </li>
              ))}
            </ul>

            {notes.materials && (
              <>
                <h3 className="text-[19px] font-[600] tracking-[0.24em] uppercase text-brand mt-10 mb-6 pb-3 border-b border-ink/15">
                  Materials &amp; Craft
                </h3>
                <ul className="space-y-2.5">
                  {notes.materials.map((m) => (
                    <li key={m} className="text-[16px] font-[300] leading-relaxed text-brand-mid">
                      {m}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>

          {/* The moves — numbered, editorial */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-9">
              {notes.moves.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: 'easeOut' }}
                >
                  <p className="text-[13px] font-semibold tracking-[0.26em] uppercase text-brand mb-2.5">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h4 className="text-[17px] md:text-[19px] font-[300] tracking-[0.06em] uppercase text-ink mb-3">
                    {m.title}
                  </h4>
                  <p className="text-[16px] font-[300] leading-relaxed text-brand-mid">{m.detail}</p>
                </motion.div>
              ))}
            </div>

            {notes.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mt-12 bg-white px-8 py-7 shadow-[0_24px_50px_-28px_rgba(28,28,26,0.3)]"
              >
                <div className="pl-5 border-l-2 border-brand">
                  <h4 className="text-[13px] font-semibold tracking-[0.24em] uppercase text-ink mb-3">
                    {notes.challenge.title}
                  </h4>
                  <p className="text-[16px] font-[300] leading-relaxed text-brand-mid">{notes.challenge.detail}</p>
                </div>
              </motion.div>
            )}

            {notes.award && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-10 text-[11px] font-semibold tracking-[0.22em] uppercase text-muted"
              >
                🏆 <span className="text-ink">{notes.award.name}</span> · {notes.award.category}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
