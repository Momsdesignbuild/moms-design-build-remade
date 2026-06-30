'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

export default function HomeBuildertrendSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative aspect-square lg:aspect-[4/3] overflow-hidden"
          >
            <Image
              src="https://cdn.sanity.io/images/wavk40jo/production/f13860fcab42f6bb5feef2c1f01a83c84d293eff-1600x1600.jpg"
              alt="Buildertrend project management at Mom's Design Build"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand mb-5">
              Client Experience
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-[#1C1C1A] mb-6">
              Buildertrend at Mom&apos;s
            </h2>
            <p className="text-sm text-[#53565A] leading-relaxed mb-6">
              Buildertrend is the project management program we use to communicate important
              information about your project, from the design phase throughout its completion.
            </p>
            <p className="text-sm text-[#53565A] leading-relaxed mb-8">
              Stay connected to every phase of your project — view schedules, approve
              selections, review documents, and communicate directly with your design team.
              Transparency and collaboration, every step of the way.
            </p>
            <Link
              href="/homeowner-portal"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1C1C1A] hover:text-brand transition-colors duration-200 group"
            >
              Learn More
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
