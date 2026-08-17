'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import BeforeAfterSlider from './BeforeAfterSlider'

export interface GalleryImage {
  thumbUrl: string
  fullUrl: string
  alt: string
  /** visible caption from WP's figcaption ("2d plan", "before", "ta-da!") */
  caption?: string
  /** true rendered dimensions — reserves the correct aspect ratio before load */
  width?: number
  height?: number
}

// gentle fade only — a y-translate on dense masonry items reads as "snapping"
const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.35, ease: 'easeOut' } },
}

/**
 * Masonry gallery with scroll-reveal + full-screen lightbox.
 * Same images, same order, same alt text as the WP gallery — alt doubles
 * as the lightbox caption.
 */
export default function LightboxGallery({
  images,
  title,
  compact = false,
  offset = 0,
  total,
}: {
  images: GalleryImage[]
  /** project name — shown as the lightbox caption (alt stays on the img for SEO) */
  title: string
  compact?: boolean
  /** position of this gallery's first photo within the whole page's photo count */
  offset?: number
  /** the page's true total photo count (multi-gallery pages span groups) */
  total?: number
}) {
  const pageTotal = total ?? images.length
  const [open, setOpen] = useState<number | null>(null)

  const step = useCallback(
    (dir: 1 | -1) => setOpen((o) => (o === null ? o : (o + dir + images.length) % images.length)),
    [images.length]
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    // warm the neighbors so arrowing is instant
    for (const d of [1, -1]) {
      const n = new window.Image()
      n.src = images[(open + d + images.length) % images.length].fullUrl
    }
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, step, images])

  return (
    <>
      {/* compact (inline body galleries): uniform aligned grid, full photo in lightbox.
          full (page gallery): masonry for uncaptioned photos; CAPTIONED photos are a
          narrative sequence (2d plan → rendering → before → ta-da!) and render as a
          full-width stack in exact order — masonry columns would scramble the story. */}
      {compact ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {images.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className="relative aspect-[4/3] overflow-hidden block w-full group cursor-zoom-in"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={itemVariants}
              aria-label={img.alt ? `View: ${img.alt}` : `View photo ${i + 1}`}
            >
              <Image
                data-gi="g"
                src={img.thumbUrl}
                alt={img.alt}
                fill
                loading={i < 2 ? 'eager' : 'lazy'}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </motion.button>
          ))}
        </div>
      ) : (
        (() => {
          type GI = GalleryImage & { idx: number }
          const indexed: GI[] = images.map((im, i) => ({ ...im, idx: i }))
          // split into segments: captioned photos are story beats (stack);
          // uncaptioned runs become masonry ONLY when long enough to be a real
          // gallery (4+). Short uncaptioned runs between story beats stay in the
          // story flow — otherwise scattered captions shatter the page into
          // alternating orphan blocks.
          const raw: Array<{ stack: boolean; start: number; items: GI[] }> = []
          for (let i = 0; i < indexed.length; i++) {
            const stack = !!indexed[i].caption
            const last = raw[raw.length - 1]
            if (last && last.stack === stack) last.items.push(indexed[i])
            else raw.push({ stack, start: i, items: [indexed[i]] })
          }
          const anyCaptions = raw.some((r) => r.stack)
          // ── finished photos belong in the TA-DA masonry, not the story section ──
          // (Josh's rule: only plans / renderings / construction shots stay above it)
          const finalMasonry = [...raw].reverse().find((r) => !r.stack && r.items.length >= 4)
          const AFTERISH = /ta-?da|after|final/i
          const PAIRLEFT = /before|rendering/i
          const PROCESS = /plan|render|construction/i
          if (finalMasonry) {
            // a) trailing TA-DA!/After-captioned stack photos → head of the masonry
            //    (unless they form a drag-slider pair with the item before them)
            for (let ri = raw.indexOf(finalMasonry) - 1; ri >= 0; ri--) {
              const seg = raw[ri]
              if (!seg.stack) break
              const moved: GI[] = []
              while (seg.items.length > 1) {
                const last = seg.items[seg.items.length - 1]
                const prevItem = seg.items[seg.items.length - 2]
                if (AFTERISH.test(last.caption ?? '') && !PAIRLEFT.test(prevItem?.caption ?? '')) moved.unshift(seg.items.pop()!)
                else break
              }
              finalMasonry.items.unshift(...moved)
              if (moved.length) (finalMasonry as { gotTada?: boolean }).gotTada = true
              break
            }
            // b) uncaptioned opener beauty shots before a PROCESS sequence → masonry
            const firstStack = raw.find((r) => r.stack)
            if (raw[0] && !raw[0].stack && raw[0] !== finalMasonry && raw[0].items.length < 4
                && firstStack && PROCESS.test(firstStack.items[0]?.caption ?? '')) {
              finalMasonry.items.unshift(...raw[0].items.splice(0))
            }
          }
          const segments: typeof raw = []
          for (const seg of raw) {
            if (!seg.items.length) continue
            const shortRun = !seg.stack && seg.items.length < 4 && anyCaptions && seg !== finalMasonry
            const prev = segments[segments.length - 1]
            if (shortRun && prev?.stack) { prev.items.push(...seg.items); continue }
            if (seg.stack && prev && !prev.stack && prev.items.length < 4 && anyCaptions && segments.length === 1 && prev.start === 0) {
              // short uncaptioned opener joins the story flow as full-width shots
              prev.stack = true
              prev.items.push(...seg.items)
              continue
            }
            segments.push(Object.assign({ ...seg, items: [...seg.items] }, { gotTada: (seg as { gotTada?: boolean }).gotTada }))
          }
          const hasSliderPair = (seg: { items: GalleryImage[] }) =>
            seg.items.some((im, k) => im.caption && /before|rendering/i.test(im.caption) &&
              seg.items[k + 1]?.caption && /ta-?da|after|final/i.test(seg.items[k + 1].caption!))
          return segments.map((seg, s) =>
            seg.stack ? (
              // story beats render THEIR way: compact aligned rows (2-3 up) with
              // captions under each photo; a true before→after pair becomes the
              // drag slider. No more full-width monster stacks.
              (() => {
                type Chunk = { kind: 'slider'; a: GI; b: GI; reversed?: boolean } | { kind: 'row'; items: GI[] }
                const chunks: Chunk[] = []
                let row: GI[] = []
                const flushRow = () => { if (row.length) { chunks.push({ kind: 'row', items: row }); row = [] } }
                for (let k = 0; k < seg.items.length; k++) {
                  const img = seg.items[k]
                  const nxt = seg.items[k + 1]
                  const nxt2 = seg.items[k + 2]
                  // full journey triplet: BEFORE → 3D RENDERING → TA-DA! reads as one row
                  if (nxt && nxt2 && /before/i.test(img.caption ?? '') && /rendering/i.test(nxt.caption ?? '') && /ta-?da|after|final/i.test(nxt2.caption ?? '')) {
                    flushRow()
                    chunks.push({ kind: 'row', items: [img, nxt, nxt2] })
                    k += 2
                    continue
                  }
                  if (nxt && /before|rendering/i.test(img.caption ?? '') && /ta-?da|after|final/i.test(nxt.caption ?? '')) {
                    flushRow()
                    chunks.push({ kind: 'slider', a: img, b: nxt })
                    k++
                    continue
                  }
                  // reversed source order: finished shot first, BEFORE second
                  if (nxt && /ta-?da|after|final/i.test(img.caption ?? '') && /before/i.test(nxt.caption ?? '') && !/rendering/i.test(nxt.caption ?? '')) {
                    flushRow()
                    chunks.push({ kind: 'slider', a: nxt, b: img, reversed: true })
                    k++
                    continue
                  }
                  if (row.length && !!row[row.length - 1].caption !== !!img.caption) flushRow()
                  row.push(img)
                  // capped at 2 (Josh, 8/16): TA-DA sections read as two-column
                  // photos, matching their live site — the only 3-across case is
                  // the deliberate before/rendering/ta-da triplet above, which
                  // bypasses this generic row entirely.
                  if (row.length === 2) flushRow()
                }
                flushRow()
                return (
                  <div key={s} className="max-w-4xl mx-auto px-4 md:px-0 space-y-10 my-10">
                    {chunks.map((c, ci) =>
                      c.kind === 'slider' ? (
                        <div key={ci} className="max-w-3xl mx-auto">
                          <BeforeAfterSlider
                            beforeUrl={c.a.fullUrl}
                            afterUrl={c.b.fullUrl}
                            beforeAlt={c.a.alt}
                            afterAlt={c.b.alt}
                            beforeLabel={c.a.caption}
                            afterLabel={c.b.caption}
                            reverseDom={c.reversed}
                            tagAsGallery
                          />
                          <p className="text-center text-[10px] font-[300] tracking-[0.2em] uppercase text-muted mt-4">
                            Drag to compare
                          </p>
                        </div>
                      ) : (
                        <div key={ci} className={c.items.length === 1
                          ? "max-w-2xl mx-auto"
                          : c.items.length === 2
                          ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                          : "grid grid-cols-1 sm:grid-cols-3 gap-3"}>
                          {c.items.map((img, k) => (
                            <motion.button
                              key={k}
                              type="button"
                              onClick={() => setOpen(img.idx)}
                              className="block w-full group cursor-zoom-in"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: '-40px' }}
                              variants={itemVariants}
                              aria-label={img.alt ? `View: ${img.alt}` : `View photo ${img.idx + 1}`}
                            >
                              <div className={c.items.length === 1 ? "" : "relative aspect-[4/3] overflow-hidden"}>
                                <Image
                                  data-gi="g"
                                  src={img.thumbUrl}
                                  alt={img.alt}
                                  {...(c.items.length === 1
                                    ? { width: img.width ?? 900, height: img.height ?? 600, className: "w-full h-auto" }
                                    : { fill: true, className: "object-cover transition-transform duration-700 group-hover:scale-[1.03]" })}
                                  sizes={c.items.length === 1 ? "(max-width: 768px) 100vw, 672px" : "(max-width: 640px) 100vw, 300px"}
                                />
                              </div>
                              {img.caption && (
                                <p className="pt-2 text-[10px] font-[500] tracking-[0.24em] uppercase text-muted text-center">
                                  {img.caption}
                                </p>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )
              })()
            ) : (
              <div key={s}>
                {/* transition into the finished-photos gallery after a slider story */}
                {((s > 0 && segments[s - 1].stack && hasSliderPair(segments[s - 1])) || (seg as { gotTada?: boolean }).gotTada) && (
                  <div className="my-12 flex items-center justify-center gap-6 max-w-3xl mx-auto">
                    <div className="h-px flex-1 bg-ink/10" />
                    <p className="text-[16px] md:text-[20px] font-[300] tracking-[0.4em] uppercase text-ink">TA-DA!</p>
                    <div className="h-px flex-1 bg-ink/10" />
                  </div>
                )}
                <div className={seg.items.length === 1
                  ? "max-w-3xl mx-auto my-3"
                  : seg.items.length === 2
                  ? "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 my-3"
                  : "max-w-4xl mx-auto columns-1 md:columns-2 gap-3 space-y-3 my-3"}>
                {seg.items.map((img, k) => (
                  <motion.button
                    key={k}
                    type="button"
                    onClick={() => setOpen((img as GI).idx)}
                    className="break-inside-avoid overflow-hidden block w-full group cursor-zoom-in"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={itemVariants}
                    aria-label={img.alt ? `View: ${img.alt}` : `View photo ${(img as GI).idx + 1}`}
                  >
                    <Image
                      data-gi="g"
                      src={img.thumbUrl}
                      alt={img.alt}
                      width={img.width ?? 900}
                      height={img.height ?? 600}
                      loading={(img as GI).idx < 3 ? 'eager' : 'lazy'}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </motion.button>
                ))}
                </div>
              </div>
            )
          )
        })()
      )}

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-5 right-6 text-white/70 hover:text-white text-[28px] leading-none z-10"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="absolute left-3 md:left-8 text-white/60 hover:text-white text-[34px] z-10 px-3 py-6"
            onClick={(e) => { e.stopPropagation(); step(-1) }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-3 md:right-8 text-white/60 hover:text-white text-[34px] z-10 px-3 py-6"
            onClick={(e) => { e.stopPropagation(); step(1) }}
            aria-label="Next photo"
          >
            ›
          </button>

          <figure className="max-w-[92vw] max-h-[88vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* thumb (already in browser cache) shows instantly; full-res replaces it on load */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[open].thumbUrl}
                alt=""
                aria-hidden="true"
                className="max-w-[92vw] max-h-[80vh] object-contain"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={images[open].fullUrl}
                src={images[open].fullUrl}
                alt={images[open].alt}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <figcaption className="mt-4 text-white/60 text-[11px] font-[300] tracking-[0.15em] uppercase text-center px-6">
              {images[open].caption ? `${title} — ${images[open].caption}` : title}
              <span className="text-white/35 ml-3">{offset + open + 1} / {pageTotal}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
