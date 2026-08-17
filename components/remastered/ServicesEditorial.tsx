'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Same four divisions as the June homepage — re-dressed in the Bria language:
// framed photos, white overlap caption cards, teal rule.
const SERVICES = [
  {
    title: 'Landscape Architecture',
    description: 'Award-winning outdoor transformations — from intimate garden escapes to expansive estates.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/91a3dc352a3048eeb485a752e8a5a2878e9835c1-2400x1600.jpg',
    alt: "Mom's Design Build - Landscape Architecture in Minnesota",
    href: '/services/landscape-architecture',
  },
  {
    title: 'Interior Design & Remodeling',
    description: 'Kitchens, bathrooms, basements, and whole-home remodels crafted with intention.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/e8a89a12d85b1b115c9966e277c9c37745ba9c70-2400x1600.jpg',
    alt: "Mom's Design Build - Interior Design and Remodeling in Minnesota",
    href: '/services/interior-design-and-remodeling',
  },
  {
    title: 'Fine Gardening',
    description: 'Seasonal garden management that keeps the landscapes you love thriving year-round.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/2b676c97864f32cff4980c8853a778bfa40b206b-2400x1601.jpg',
    alt: "Mom's Fine Gardening - Garden Maintenance in Minnesota",
    href: '/services/garden-management',
  },
  {
    title: 'Commercial Maintenance',
    description: 'Reliable, consistent, beautiful commercial landscapes — every season.',
    image: 'https://cdn.sanity.io/images/wavk40jo/production/7e8c32c76b3b3b28bd00417af8d40b405a6f1275-1500x1124.jpg',
    alt: "Mom's Commercial Maintenance - Commercial Landscape in Minnesota",
    href: '/services/commerical-maintenance',
  },
]

export default function ServicesEditorial() {
  return (
    <section className="bg-[#F7F5F2] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">Service Offerings</p>
          <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-ink">
            Four Crafts, One Roof
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: 'easeOut' }}
            >
              <Link href={s.href} className="group block">
                {/* the PORTFOLIO tile treatment — no caption box (Josh 7/14 pm):
                    grayed photo, centered title, hover clears text + reveals */}
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-mid">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 330px"
                    className="object-cover opacity-60 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="text-white text-[20px] lg:text-[21px] font-[300] tracking-[0.14em] uppercase leading-snug [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                      {s.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-[20px] font-[300] leading-relaxed text-brand-mid pr-4">
                  {s.description}
                </p>
                <span className="mt-3 inline-block text-[20px] font-semibold tracking-[0.24em] uppercase text-ink border-b border-ink/20 pb-0.5 group-hover:border-ink transition-colors">
                  Explore
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
