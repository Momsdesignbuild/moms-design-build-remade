'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

const services = [
  {
    title: 'Landscape Architecture',
    description:
      'Award-winning outdoor transformations — from intimate garden escapes to expansive estate designs that redefine your relationship with the outdoors.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/04e8d131adca65ec9a98361a52ab66ed44f4e409-768x431.jpg',
    alt: "Mom's Design Build - Landscape Architecture in Minnesota",
    href: '/services/landscape-architecture',
  },
  {
    title: 'Interior Design & Remodeling',
    description:
      'Thoughtful interior transformations that blend beauty with livability — kitchens, bathrooms, basements, and whole-home remodels crafted with intention.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/91c34d378586d02a69723e86369183298f13df30-768x512.jpg',
    alt: "Mom's Design Build - Interior Design and Remodeling in Minnesota",
    href: '/services/interior-design-and-remodeling',
  },
  {
    title: 'Fine Gardening',
    description:
      'Seasonal garden management that keeps your outdoor spaces thriving year-round. Expert care for the landscapes you love.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/955df2aa9dba1df55b7259322038aca03f43ef6d-768x512.jpg',
    alt: "Mom's Fine Gardening - Garden Maintenance in Minnesota",
    href: '/services/garden-management',
  },
  {
    title: 'Commercial Maintenance',
    description:
      'Professional commercial landscape maintenance for businesses and communities. Reliable, consistent, and beautiful — every season.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/76b6e92d3cbfa29d0db6230a4f610adec8971951-768x512.jpg',
    alt: "Mom's Commercial Maintenance - Commercial Landscape in Minnesota",
    href: '/services/commercial-maintenance',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HomeServices() {
  return (
    <section className="py-24 lg:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-[#1C1C1A]">
            Service Offerings
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((service) => (
            <motion.div key={service.href} variants={cardVariants}>
              <Link href={service.href} className="group block">
                <div className="relative aspect-square overflow-hidden mb-5">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-[#1C1C1A] mb-3 group-hover:text-brand transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-[#53565A] leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand">
                  Learn More
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
