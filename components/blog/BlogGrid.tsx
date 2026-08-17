'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import { motion, type Variants } from 'framer-motion'

export interface BlogCard {
  title: string
  slug: string
  imageUrl: string | null
  alt: string
  date: string | null
  excerpt: string | null
  categories: string[]
}

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

const PAGE = 24

/** editorial card grid with incremental Load More (205 posts — DOM stays sane) */
export default function BlogGrid({ cards: cardsRaw }: { cards: BlogCard[] }) {
  const [shown, setShown] = useState(PAGE)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<string | null>(null)

  // In draft mode (Studio preview) stega watermarks every string PER SOURCE
  // DOCUMENT — 205 posts' identical category names become 205 distinct keys
  // and the pill dedupe explodes (July 11). Clean categories before counting.
  const cards = cardsRaw.map((c) => ({ ...c, categories: (c.categories ?? []).map((k) => stegaClean(k)) }))

  // category pills, largest first (their real Yoast categories)
  const counts = new Map<string, number>()
  for (const c of cards) for (const k of c.categories) counts.set(k, (counts.get(k) ?? 0) + 1)
  const cats = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k)

  const q = query.trim().toLowerCase()
  const filtered = cards.filter((c) =>
    (!cat || c.categories.includes(cat)) &&
    (!q || c.title.toLowerCase().includes(q) || (c.excerpt ?? '').toLowerCase().includes(q))
  )
  const visible = filtered.slice(0, shown)

  return (
    <>
      {/* search + category filter */}
      <div className="max-w-[1400px] mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div className="flex flex-wrap gap-2">
            {[null, ...cats].map((c) => (
              <button
                key={c ?? 'all'}
                type="button"
                onClick={() => { setCat(c); setShown(PAGE) }}
                className={`text-[20px] font-[500] tracking-[0.18em] uppercase px-4 py-2 border transition-colors duration-200 ${
                  cat === c ? 'bg-ink text-white border-ink' : 'border-ink/20 text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {c ?? 'All'}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShown(PAGE) }}
            placeholder="Search the blog…"
            className="w-full md:w-72 border-b border-ink/20 bg-transparent px-1 py-2 text-[20px] font-[300] tracking-[0.04em] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink"
            aria-label="Search blog posts"
          />
        </div>
        {(q || cat) && (
          <p className="mt-4 text-[20px] font-[300] tracking-[0.15em] uppercase text-muted">
            {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}{cat ? ` in ${cat}` : ''}{q ? ` matching “${query}”` : ''}
          </p>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {visible.map((post, i) => (
          <motion.div
            key={post.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '100px' }}
            variants={itemVariants}
          >
            <Link href={`/${post.slug}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 mb-5">
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt={post.alt}
                    fill
                    loading={i < 6 ? 'eager' : 'lazy'}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                )}
              </div>
              {post.date && (
                <p className="text-[20px] font-[500] tracking-[0.25em] uppercase text-muted mb-2">{post.date}</p>
              )}
              <h2 className="text-[20px] md:text-[22px] font-[300] tracking-[0.04em] leading-snug text-ink group-hover:underline underline-offset-4 decoration-ink/30">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-[20px] font-[300] leading-relaxed text-brand-mid line-clamp-2">{post.excerpt}</p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {shown < filtered.length && (
        <div className="text-center mt-16">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="inline-block border border-ink text-ink text-[20px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
          >
            Load More ({filtered.length - shown} more)
          </button>
        </div>
      )}
    </>
  )
}
