'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Giving Back, re-dressed: same dark room and same facts as the June section,
// but with the mat/overlap language — a white-matted garden photo carrying
// the 100% stat card at its corner. Partner logos link out to each
// organization exactly like the live homepage carousel (Summer, 7/14:
// "we wanna honor these companies — these actually link to their website").
const PARTNERS = [
  { name: 'Bella Goose Coffee — Freedom Coffee', href: 'https://www.bellagoosecoffee.com/freedomcoffee', logo: '/images/partners/Bella-Goose-N.webp' },
  { name: 'Connected Families', href: 'https://connectedfamilies.org/about/', logo: '/images/partners/450.webp' },
  { name: 'Folds of Honor', href: 'https://foldsofhonor.org/about-us/', logo: '/images/partners/star-50.webp' },
  { name: "Faith's Lodge", href: 'https://faithslodge.org/', logo: '/images/partners/Faiths-Lodge-N.webp' },
  { name: 'Grief Club of Minnesota', href: 'https://griefclubmn.org/', logo: '/images/partners/Grief-Club-of-MN-N.webp' },
]

export default function GivingBackEditorial() {
  return (
    <section className="bg-[#1C1C1A] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-[14px] font-semibold tracking-[0.3em] uppercase text-brand mb-5">
              Community Impact
            </p>
            <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-white mb-8">
              Giving Back
            </h2>
            <blockquote
              className="text-[19px] md:text-[23px] font-[300] leading-[1.5] text-white/85 mb-8"
              style={{ fontFamily: 'var(--font-heading, "Futura PT", sans-serif)' }}
            >
              &ldquo;Love our community. We give generously to impact people in need.&rdquo;
            </blockquote>
            <p className="text-[16px] font-[300] leading-relaxed text-white/60 max-w-md mb-9">
              From this foundational value grew our Giving Back Initiative — where all
              consultation fees are donated to a community organization. We are honored to
              share the story of our partners.
            </p>

            {/* the organizations we give to — each links to their site.
                White cards, object-contain: no circle mask, nothing cropped
                (Josh 7/14: forced circles were clipping several logos) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              {PARTNERS.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  title={p.name}
                  className="relative h-16 w-16 md:h-20 md:w-20 bg-white p-2 opacity-85 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image src={p.logo} alt={p.name} fill sizes="80px" className="object-contain p-1.5" />
                </a>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-block border border-white/80 text-white text-[13px] font-[600] tracking-[0.22em] uppercase px-8 py-3 hover:bg-white hover:text-ink transition-colors duration-300"
            >
              Connect With Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
            className="relative max-w-[520px] w-full mx-auto lg:ml-auto"
          >
            <div className="bg-white p-3">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://cdn.sanity.io/images/wavk40jo/production/29ea708ab7e0e65d0d063b4ca2e1484a6c40fb74-1601x2400.jpg"
                  alt="Mom's Design Build garden"
                  fill
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>
            {/* the stat, riding the frame's corner */}
            <div className="absolute -bottom-6 -left-4 md:-left-10 bg-white px-8 py-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)]">
              <div className="pl-5 border-l-2 border-brand">
                <p className="text-4xl md:text-5xl font-[300] text-ink" style={{ fontFamily: 'var(--font-heading)' }}>
                  100%
                </p>
                <p className="mt-1.5 text-[9px] font-semibold tracking-[0.2em] uppercase text-muted leading-relaxed">
                  Of consultation fees<br />donated to community
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
