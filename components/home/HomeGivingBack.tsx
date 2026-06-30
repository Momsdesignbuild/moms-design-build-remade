'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

export default function HomeGivingBack() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#1C1C1A] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="https://cdn.sanity.io/images/wavk40jo/production/29ea708ab7e0e65d0d063b4ca2e1484a6c40fb74-1601x2400.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand mb-5">
              Community Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-white mb-8">
              Giving Back
            </h2>
            <blockquote className="text-lg md:text-xl text-white/80 font-light italic leading-relaxed mb-8 border-l-2 border-brand pl-6">
              &ldquo;Love our community. We give generously to impact people in need.&rdquo;
            </blockquote>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              From this foundational value grew our Giving Back Initiative — where all
              consultation fees are donated to a community organization. We are honored to
              share the story of our partners.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white hover:text-brand transition-colors duration-200 group"
            >
              Connect With Us
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <div className="border border-white/10 p-12 text-center">
              <p className="text-6xl font-extrabold text-white mb-3">100%</p>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand">
                Of Consultation Fees
              </p>
              <p className="text-xs font-normal tracking-widest uppercase text-white/50 mt-2">
                Donated to Community
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
