'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

interface PortfolioItem {
  title: string
  slug: { current: string }
  heroImageUrl: string | null
}

interface Props {
  items: PortfolioItem[]
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function HomePortfolioGrid({ items }: Props) {
  if (!items.length) return null

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand mb-4">
              Featured Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-[#1C1C1A]">
              Our Work
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1C1C1A] hover:text-brand transition-colors duration-200 group"
          >
            View All Projects
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {items.map((item) => (
            <motion.div key={item.slug.current} variants={itemVariants}>
              <Link href={`/portfolio/${item.slug.current}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.heroImageUrl ? (
                    <Image
                      src={item.heroImageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F7F5F2]" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-end p-6">
                    <p className="text-white text-sm font-bold tracking-widest uppercase translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {item.title}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold tracking-widest uppercase text-[#53565A] group-hover:text-brand transition-colors duration-200">
                  {item.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
