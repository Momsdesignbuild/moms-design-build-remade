'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * THE tile treatment, used identically across portfolio / services / careers
 * (Summer, draft-1 audit 7/14): image grayed to ~75% opacity over the Astra
 * gray, title centered on it; hover → text fades away and the photo reveals
 * at 100%, exactly like the live WP site. Tiles fade in over 0.9s, lazy-loaded.
 */
export default function OverlayTile({
  href,
  img,
  title,
  subtitle,
  alt,
  sizes,
  aspect = 'aspect-[4/3]',
  eager = false,
}: {
  href: string
  img: string | null
  title: string
  subtitle?: string
  alt?: string
  sizes?: string
  aspect?: string
  eager?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className={`group relative block ${aspect} overflow-hidden bg-brand-mid`}
      >
        {img && (
          <Image
            src={img}
            alt={alt || title}
            fill
            loading={eager ? 'eager' : 'lazy'}
            className="object-cover opacity-60 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
            sizes={sizes || '(max-width: 1024px) 100vw, 50vw'}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 group-hover:opacity-0">
          <p className="text-white text-[22px] md:text-[26px] font-[300] tracking-[0.2em] uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
            {title}
          </p>
          {subtitle && (
            <p className="mt-2 text-white/85 text-[15px] md:text-[20px] font-[300] tracking-[0.18em] uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
              {subtitle}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
