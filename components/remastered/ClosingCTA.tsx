'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// The bookend: the page opened with "Build Your Legacy" — it closes with it.
// Cedar & Stone's nighttime drone shot (pool house, pool, hot tub, landscape
// lighting) carries the exit — Summer's pick over the old Charleston Meadows
// photo (7/14: "we pretty much just did those stairs"). Final crop = hers.
// Entrance mirrors FramedHero's own opening stagger (Josh, July 17) so the
// close reads as an echo of the open, not just a repeated line of text.
export default function ClosingCTA() {
  const img =
    "https://cdn.sanity.io/images/wavk40jo/production/1964576dae251ea1193a83f5276f98265bbcd2ea-2400x1800.jpg"

  return (
    <section className="bg-[#F7F5F2] py-24 lg:py-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
          {!!img && (
            <Image
              src={img}
              alt="Mom's Design Build — pool and pool house at dusk with landscape lighting"
              fill
              quality={90}
              sizes="(max-width: 1400px) 96vw, 1340px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-[16px] font-semibold tracking-[0.3em] uppercase text-white/70 mb-5"
            >
              Your Turn
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-[300] tracking-[0.08em] uppercase text-white mb-10"
            >
              Build Your Legacy
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            >
              <Link
                href="/contact"
                className="border-2 border-brand bg-brand text-white text-sm font-[600] tracking-[0.22em] uppercase px-11 py-4.5 hover:bg-transparent hover:text-white transition-colors duration-300"
              >
                Meet with Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
