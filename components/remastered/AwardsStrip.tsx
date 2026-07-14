'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// Receipts for the hero's "most awarded" claim — the FIVE badges from the live
// WP homepage, self-hosted (wp-content dies at launch). Summer (7/14): NARI is
// only ONE org — these span Best of Twin Cities, Midwest Design Awards, MNLA,
// NARI and more, and the line reads "most award-winning in the Midwest".
// Rendered grayscale ("I don't like how these are so colorful"), color on hover.
const BADGES = [
  { url: '/images/awards/Best-of-2026-Award-Winner-Business-Rate-Moms-Design-Build-1024x885.webp', alt: 'Best of 2026 Award Winner' },
  { url: '/images/awards/Best-of-Twin-Cities-Readers-Choice-Award-2026-Moms-Design-Build-1024x986.webp', alt: "Best of Twin Cities Readers' Choice Award 2026" },
  { url: '/images/awards/Midwest-Design-Awards-2025-1st-Place-1024x733.webp', alt: 'Midwest Design Awards 2025 — 1st Place' },
  { url: '/images/awards/MNLA-Industry-Award-Winner-Moms-Design-Build-e1775482345107.webp', alt: 'MNLA Industry Award Winner' },
  { url: '/images/awards/PNG2025-NARI_RotY-MINNESOTA-WinnerMultipleAwards_CLR.webp', alt: '2025 NARI Remodeler of the Year — Minnesota, Multiple Awards' },
]

export default function AwardsStrip() {
  return (
    <section className="bg-[#F7F5F2] pb-20 lg:pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* live WP homepage H2, verbatim — SEO heading parity */}
        <h2 className="text-center text-[17px] md:text-[20px] font-[300] tracking-[0.26em] uppercase text-brand mb-10">
          The Most Award-Winning in the Midwest
        </h2>
        <div className="flex items-center justify-center gap-10 md:gap-14 flex-wrap">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.url}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="relative h-20 md:h-24 w-24 md:w-28 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 mix-blend-multiply"
            >
              <Image src={b.url} alt={b.alt} fill sizes="112px" className="object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
