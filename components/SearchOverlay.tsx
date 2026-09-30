'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Item = {
  type: 'Portfolio' | 'Blog' | 'Careers' | 'Services' | 'Team'
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

type Photo = { src: string; alt: string; w: number; h: number; page: string; href: string; type: string }
const PHOTO_IDEAS = ['Pool', 'Fire pit', 'Kitchen', 'Patio', 'Pergola', 'Garden', 'Hot tub', 'Basement']

/**
 * Site-wide search (marketing 8/7 — Jim's ask): magnifier in the header opens
 * this overlay; results across portfolio, blog, and careers show a thumbnail
 * + a one-liner. Index is one cached JSON fetch; filtering is instant and
 * client-side.
 */
export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [index, setIndex] = useState<Item[] | null>(null)
  // Photo catalog (Josh 9/29): search the photos themselves, by their alt text
  const [mode, setMode] = useState<'pages' | 'photos'>('pages')
  const [photos, setPhotos] = useState<Photo[] | null>(null)
  const [zoom, setZoom] = useState<Photo | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open || mode !== 'photos' || photos) return
    fetch('/api/photo-index/')
      .then((r) => r.json())
      .then(setPhotos)
      .catch(() => setPhotos([]))
  }, [open, mode, photos])

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
      if (e.key === 'Escape') (zoom ? setZoom(null) : onClose())
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, onClose, zoom])

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

  const photoResults =
    terms.length === 0 || !photos
      ? []
      : photos
          .map((ph) => {
            const alt = ph.alt.toLowerCase()
            const page = ph.page.toLowerCase()
            let score = 0
            for (const t of terms) {
              if (has(alt, t)) score += 2
              else if (has(page, t)) score += 1
              else return null
            }
            return { ph, score }
          })
          .filter((x): x is { ph: Photo; score: number } => x !== null)
          .sort((a, b) => b.score - a.score)
          .slice(0, 60)
          .map((x) => x.ph)

  const tab = (on: boolean) =>
    `whitespace-nowrap text-[20px] font-[500] tracking-[0.1em] md:tracking-[0.18em] uppercase px-3 md:px-4 py-2 border transition-colors duration-200 ${
      on ? 'bg-ink text-white border-ink' : 'border-ink/20 text-muted hover:border-ink hover:text-ink'
    }`

  return (
    <div className="fixed inset-0 z-[90] bg-white overflow-y-auto" role="dialog" aria-modal="true" aria-label="Search the site">
      <div className={`${mode === 'photos' ? 'max-w-6xl' : 'max-w-3xl'} mx-auto px-6 pt-24 pb-20`}>
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
          placeholder={mode === 'photos' ? 'Search photos — pool, fire pit, kitchen…' : 'Search projects, services, stories, people…'}
          aria-label="Search"
          className="w-full border-b-2 border-ink/15 focus:border-brand bg-transparent py-4 text-[22px] md:text-[28px] font-[300] text-ink placeholder:text-muted/60 focus:outline-none transition-colors"
        />
        <div className="mt-5 flex gap-2" role="tablist" aria-label="Search in">
          <button type="button" role="tab" aria-selected={mode === 'pages'} onClick={() => setMode('pages')} className={tab(mode === 'pages')}>
            Pages{q && index ? ` · ${results.length}` : ''}
          </button>
          <button type="button" role="tab" aria-selected={mode === 'photos'} onClick={() => setMode('photos')} className={tab(mode === 'photos')}>
            Photos{q && photos ? ` · ${photoResults.length}` : ''}
          </button>
        </div>

        {mode === 'photos' && (
          <div className="mt-8">
            {!q && (
              <div className="flex flex-wrap gap-2">
                <p className="w-full text-[20px] font-[300] text-muted mb-2">Browse our photo catalog — try:</p>
                {PHOTO_IDEAS.map((idea) => (
                  <button key={idea} type="button" onClick={() => setQ(idea)} className="text-[20px] font-[300] px-4 py-2 bg-[#F6F6F4] text-ink hover:bg-brand hover:text-white transition-colors">
                    {idea}
                  </button>
                ))}
              </div>
            )}
            {q && photos && photoResults.length === 0 && (
              <p className="text-[20px] font-[300] text-muted py-8 text-center">No photos of &ldquo;{q}&rdquo; yet — try &ldquo;patio&rdquo; or &ldquo;pergola&rdquo;.</p>
            )}
            {q && !photos && <p className="text-[20px] font-[300] text-muted py-8 text-center">Loading photos…</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {photoResults.map((ph) => (
                <button
                  key={ph.src}
                  type="button"
                  onClick={() => setZoom(ph)}
                  className="group relative aspect-square overflow-hidden bg-brand-mid/15 text-left"
                  aria-label={`${ph.alt} — from ${ph.page}`}
                >
                  <Image src={`${ph.src}?w=600&h=600&fit=crop&auto=format`} alt={ph.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-[20px] font-[300] leading-snug opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {ph.page}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {zoom && (
          <div className="fixed inset-0 z-[95] bg-black/90 flex flex-col items-center justify-center p-4 md:p-10" onClick={() => setZoom(null)} role="dialog" aria-modal="true" aria-label={zoom.alt}>
            <button type="button" onClick={() => setZoom(null)} aria-label="Close photo" className="absolute top-5 right-5 p-3 text-white/70 hover:text-white text-[22px] leading-none">✕</button>
            <div className="relative w-full max-w-6xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
              <Image src={`${zoom.src}?w=2000&auto=format`} alt={zoom.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="mt-5 max-w-3xl text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-white/85 text-[20px] font-[300] leading-relaxed">{zoom.alt}</p>
              <Link href={zoom.href} onClick={() => { setZoom(null); onClose() }} className="inline-block mt-3 text-[20px] font-semibold tracking-[0.2em] uppercase text-white border-b border-white/40 hover:border-white pb-0.5">
                See it on {zoom.page} &rarr;
              </Link>
            </div>
          </div>
        )}

        {mode === 'pages' && (
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
        )}
      </div>
    </div>
  )
}
