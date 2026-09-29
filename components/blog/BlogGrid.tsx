'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { stegaClean } from '@sanity/client/stega'
import CATEGORY_SEO from '@/app/(site)/category/category-seo.json'

export interface BlogCard {
  title: string
  slug: string
  imageUrl: string | null
  alt: string
  date: string | null
  publishedAt: string | null
  readMinutes: number
  excerpt: string | null
  categories: string[]
}

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

const PAGE = 24

// Topics = their real WP categories only. Posts also carry Yoast tags in
// `categories` ("plants", "custom bar"…) — those never become filters.
const TOPICS = Object.values(CATEGORY_SEO as Record<string, { name: string }>)
  .map((c) => c.name)
  .filter((n) => n !== 'Uncategorized')

const SORTS = [
  { key: 'newest', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'az', label: 'A – Z' },
  { key: 'quick', label: 'Quick reads first' },
] as const
type SortKey = (typeof SORTS)[number]['key']

/**
 * Blog grid (Josh 9/29): the editorial card — 4:5 photo, then date, title,
 * excerpt underneath — three across. A few quick topic pills up top; the
 * Filters panel holds every topic (one at a time) and the sort.
 */
export default function BlogGrid({ cards: cardsRaw }: { cards: BlogCard[] }) {
  const [shown, setShown] = useState(PAGE)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('newest')
  const [panel, setPanel] = useState(false)

  // Draft mode stega-tags every string per document; clean before comparing (July 11).
  const cards = cardsRaw.map((c) => ({ ...c, categories: (c.categories ?? []).map((k) => stegaClean(k)) }))

  const counts = new Map<string, number>()
  for (const c of cards) for (const k of c.categories) counts.set(k, (counts.get(k) ?? 0) + 1)
  const topics = TOPICS.filter((t) => counts.get(t)).sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0))
  const quick = topics.slice(0, 3)

  const q = query.trim().toLowerCase()
  const filtered = cards
    .filter((c) =>
      (!cat || c.categories.includes(cat)) &&
      (!q || c.title.toLowerCase().includes(q) || (c.excerpt ?? '').toLowerCase().includes(q)))
    .sort((a, b) => {
      if (sort === 'oldest') return (a.publishedAt ?? '').localeCompare(b.publishedAt ?? '')
      if (sort === 'az') return a.title.localeCompare(b.title)
      if (sort === 'quick') return a.readMinutes - b.readMinutes
      return (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
    })
  const visible = filtered.slice(0, shown)
  const active = (cat ? 1 : 0) + (sort !== 'newest' ? 1 : 0)

  const pick = (c: string | null) => { setCat(c); setShown(PAGE) }

  useEffect(() => {
    if (!panel) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanel(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [panel])

  const pill = (on: boolean) =>
    `text-[20px] font-[500] tracking-[0.18em] uppercase px-4 py-2 border transition-colors duration-200 ${
      on ? 'bg-ink text-white border-ink' : 'border-ink/20 text-muted hover:border-ink hover:text-ink'
    }`
  const option = (on: boolean) =>
    `w-full flex items-center justify-between text-left px-4 py-3 text-[20px] font-[300] tracking-[0.04em] transition-colors ${
      on ? 'bg-ink text-white' : 'text-ink hover:bg-[#F6F6F4]'
    }`

  return (
    <>
      {/* quick topics + Filters + search */}
      <div className="max-w-[1400px] mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => pick(null)} className={pill(!cat)}>All</button>
            {quick.map((t) => (
              <button key={t} type="button" onClick={() => pick(t)} className={pill(cat === t)}>{t}</button>
            ))}
            {cat && !quick.includes(cat) && (
              <button type="button" onClick={() => pick(null)} className={pill(true)} aria-label={`Clear ${cat}`}>
                {cat} ✕
              </button>
            )}
            <button
              type="button"
              onClick={() => setPanel(true)}
              aria-haspopup="dialog"
              className="text-[20px] font-[500] tracking-[0.18em] uppercase px-4 py-2 border border-brand text-brand hover:bg-brand hover:text-white transition-colors duration-200"
            >
              Filters{active ? ` · ${active}` : ''}
            </button>
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
        {(q || cat || sort !== 'newest') && (
          <p className="mt-4 text-[20px] font-[300] tracking-[0.15em] uppercase text-muted">
            {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}{cat ? ` in ${cat}` : ''}
            {q ? ` matching “${query}”` : ''}{sort !== 'newest' ? ` · ${SORTS.find((s) => s.key === sort)!.label}` : ''}
          </p>
        )}
      </div>

      {/* editorial cards: 4:5 photo, then the words underneath */}
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
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-5">
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
                <p className="text-[20px] font-[500] tracking-[0.25em] uppercase text-muted mb-2">
                  {post.date}{sort === 'quick' ? ` · ${post.readMinutes} min read` : ''}
                </p>
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

      {/* Filters side panel */}
      <AnimatePresence>
        {panel && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[80] bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanel(false)}
            />
            <motion.aside
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Filter stories"
              className="fixed top-0 right-0 bottom-0 z-[81] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
                <p className="text-[20px] font-[500] tracking-[0.2em] uppercase text-ink">Filter Stories</p>
                <button type="button" onClick={() => setPanel(false)} aria-label="Close filters" className="p-2 text-[22px] leading-none text-ink/60 hover:text-ink">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-10">
                <section>
                  <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-3">Topic</p>
                  <div className="space-y-1" role="radiogroup" aria-label="Topic">
                    <button type="button" role="radio" aria-checked={!cat} onClick={() => pick(null)} className={option(!cat)}>
                      <span>All topics</span><span className="opacity-60">{cards.length}</span>
                    </button>
                    {topics.map((t) => (
                      <button key={t} type="button" role="radio" aria-checked={cat === t} onClick={() => pick(t)} className={option(cat === t)}>
                        <span>{t}</span><span className="opacity-60">{counts.get(t)}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-3">Sort by</p>
                  <div className="space-y-1" role="radiogroup" aria-label="Sort by">
                    {SORTS.map((s) => (
                      <button key={s.key} type="button" role="radio" aria-checked={sort === s.key} onClick={() => { setSort(s.key); setShown(PAGE) }} className={option(sort === s.key)}>
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div className="flex gap-3 px-6 py-5 border-t border-ink/10">
                <button
                  type="button"
                  onClick={() => { pick(null); setSort('newest') }}
                  className="flex-1 border border-ink/25 text-ink text-[20px] font-[500] tracking-[0.18em] uppercase py-3 hover:border-ink transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setPanel(false)}
                  className="flex-[2] bg-ink text-white text-[20px] font-[500] tracking-[0.18em] uppercase py-3 hover:bg-brand transition-colors"
                >
                  Show {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
