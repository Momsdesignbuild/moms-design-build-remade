'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const awards = [
  {
    src: 'https://cdn.sanity.io/images/wavk40jo/production/9192ddc536a686c836b89ab2f815d00be444d919-1024x986.jpg',
    alt: 'Best of Twin Cities Readers Choice Award 2026',
  },
  {
    src: 'https://cdn.sanity.io/images/wavk40jo/production/87a0243f7b2a2f5312cb8fb2477c4c4b8bb9c750-1024x885.jpg',
    alt: 'Best of 2026 Award Winner',
  },
  {
    src: 'https://cdn.sanity.io/images/wavk40jo/production/45aa3f7afb73803d332d6ec45b1c64dfa20abb87-1024x733.png',
    alt: 'Midwest Design Awards 2025 - 1st Place',
  },
  {
    src: 'https://cdn.sanity.io/images/wavk40jo/production/7a35619e845fb0b39d9c56eef931fed94baf248a-600x513.png',
    alt: 'NARI Remodeler of the Year Minnesota 2025',
  },
  {
    src: 'https://cdn.sanity.io/images/wavk40jo/production/a607f7a1a0ec6aa83084f29b212a3f4a353a8187-218x223.png',
    alt: 'MNLA Industry Award Winner',
  },
]

export default function HomeAwards() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand mb-4">
            Recognized By
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-[#1C1C1A]">
            The Most Award-Winning in the Midwest
          </h2>
        </div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {awards.map((award) => (
            <motion.div
              key={award.alt}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
              }}
              className="flex items-center justify-center"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32">
                <Image
                  src={award.src}
                  alt={award.alt}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-[#808285]">
          + HGTV, Rivard Stone, &amp; Others
        </p>
      </div>
    </section>
  )
}
