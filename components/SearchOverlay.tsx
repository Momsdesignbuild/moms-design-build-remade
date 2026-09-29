'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Item = {
  type: 'Portfolio' | 'Blog' | 'Careers' | 'Services'
  title: string
  href: string
  img: string | null
  desc: string
  tags: string
  alts: string[]
}

// "pools" should find "pool" and vice versa — match the word or its singular
const variants = (t: string) => {
  const v = [t]
  if (t.length > 4 && t.endsWith('es')) v.push(t.slice(0, -2))
  if (t.length > 3 && t.endsWith('s')) v.push(t.slice(0, -1))
  return v
}
const has = (hay: string, t: string) => variants(t).some((v) => hay.includes(v))

/**
 * Site-wide search (marketing 8/7 — Jim's ask): magnifier in the header opens
 * this overlay; results across portfolio, blog, and careers show a thumbnail
 * + a one-liner. Index is one cached JSON fetch; filtering is instant and
 * client-side.
 */
export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [index, setIndex] = useState<Item[] | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    if (!index) {
      fetch('/api/search-index')
        .then((r) => r.json())
        .then(setIndex)
        .catch(() => setIndex([]))
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, onClose])

  if (!open) return null

  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  const results =
    terms.length === 0 || !index
      ? []
      : index
          .map((it) => {
            // title > description/tags > photo alt text; every term must hit somewhere
            const title = it.title.toLowerCase()
            const text = `${it.desc} ${it.tags}`.toLowerCase()
            const alts = it.alts.map((a) => a.toLowerCase())
            let score = 0
            let viaPhotoOnly = true
            for (const t of terms) {
              if (has(title, t)) { score += 6; viaPhotoOnly = false }
              else if (has(text, t)) { score += 3; viaPhotoOnly = false }
              else if (alts.some((a) => has(a, t))) score += 1 + Math.min(2, alts.filter((a) => has(a, t)).length * 0.25)
              else return null
            }
            // a result found only through its photos says which photo
            const photo = viaPhotoOnly ? it.alts.find((a) => terms.every((t) => has(a.toLowerCase(), t))) ?? it.alts.find((a) => has(a.toLowerCase(), terms[0])) : undefined
            return { it, score, photo }
          })
          .filter((x): x is { it: Item; score: number; photo: string | undefined } => x !== null)
          .sort((a, b) => b.score - a.score)
          .slice(0, 30)

  return (
    <div className="fixed inset-0 z-[90] bg-white/[0.98] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Search the site">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <button
          onClick={onClose}
          aria-label="Close search"
          className="absolute top-6 right-6 p-3 text-ink/60 hover:text-ink transition-colors text-[22px] leading-none"
        >
          ✕
        </button>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects, services, stories, careers…"
          aria-label="Search"
          className="w-full border-b-2 border-ink/15 focus:border-brand bg-transparent py-4 text-[22px] md:text-[28px] font-[300] text-ink placeholder:text-muted/60 focus:outline-none transition-colors"
        />
        <div className="mt-8 space-y-2">
          {q && index && results.length === 0 && (
            <p className="text-[20px] font-[300] text-muted py-8 text-center">
              Nothing found for &ldquo;{q}&rdquo; — try a project name, city, service, or something in the photos like “pool” or “fire pit”.
            </p>
          )}
          {results.map(({ it: r, photo }) => (
            <Link
              key={`${r.type}-${r.href}`}
              href={r.href}
              onClick={onClose}
              className="flex items-center gap-5 p-3 -mx-3 hover:bg-[#F6F6F4] transition-colors group"
            >
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-brand-mid/15">
                {r.img && (
                  <Image src={r.img} alt="" fill sizes="64px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[20px] font-semibold tracking-[0.24em] uppercase text-brand mb-0.5">{r.type}</p>
                <p className="text-[20px] font-[400] text-ink truncate group-hover:text-brand transition-colors">
                  {r.title}
                </p>
                <p className="text-[20px] font-[300] text-muted truncate">{photo ? `In a photo: ${photo}` : r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
