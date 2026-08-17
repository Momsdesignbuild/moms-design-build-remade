'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  beforeUrl: string
  afterUrl: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  /** set when the pair belongs to the page GALLERY (counts toward photo parity) */
  tagAsGallery?: boolean
  /** source order was after-then-before: keep that DOM order for photo parity */
  reverseDom?: boolean
}

/**
 * Drag-to-compare slider. The two images are the SAME content images the WP
 * page shows stacked — same URLs, same alt text — just presented interactively.
 */
export default function BeforeAfterSlider({ beforeUrl, afterUrl, beforeAlt, afterAlt, beforeLabel = 'Before', afterLabel = 'After', tagAsGallery = false, reverseDom = false }: Props) {
  const gi = tagAsGallery ? { 'data-gi': 'g' } : {}
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const touched = useRef(false)

  const move = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  // nudge on first scroll-into-view so people know the line drags (Summer, 7/14);
  // any real interaction cancels it
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return
        io.disconnect()
        const seq: Array<[number, number]> = [[44, 350], [57, 900], [50, 1500]]
        timers = seq.map(([p, t]) => setTimeout(() => { if (!touched.current) setPos(p) }, t))
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] overflow-hidden select-none cursor-ew-resize bg-gray-100"
      onPointerDown={(e) => { touched.current = true; setDragging(true); move(e.clientX); e.currentTarget.setPointerCapture(e.pointerId) }}
      onPointerMove={(e) => dragging && move(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* after (base layer) — DOM order: before first, matching the WP page order */}
      <div className="absolute inset-0">
        {(reverseDom
          ? [
              { src: afterUrl, alt: afterAlt, clip: false },
              { src: beforeUrl, alt: beforeAlt, clip: true },
            ]
          : [
              { src: beforeUrl, alt: beforeAlt, clip: true },
              { src: afterUrl, alt: afterAlt, clip: false },
            ]
        ).map((im) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={im.src}
            src={im.src}
            alt={im.alt}
            {...gi}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            style={im.clip ? { clipPath: `inset(0 ${100 - pos}% 0 0)`, zIndex: 1, transition: dragging ? 'none' : 'clip-path 0.55s cubic-bezier(0.33,1,0.68,1)' } : undefined}
          />
        ))}
      </div>

      {/* divider + handle — eased left so the nudge glides instead of jumping */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)] z-10"
        style={{ left: `${pos}%`, transition: dragging ? 'none' : 'left 0.55s cubic-bezier(0.33,1,0.68,1)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
            <path d="M7 1 2 6l5 5" stroke="#1C1C1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m13 1 5 5-5 5" stroke="#1C1C1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <span className="absolute top-4 left-4 z-10 text-white text-[20px] font-[500] tracking-[0.2em] uppercase bg-black/45 px-3 py-1.5">{beforeLabel}</span>
      <span className="absolute top-4 right-4 z-10 text-white text-[20px] font-[500] tracking-[0.2em] uppercase bg-black/45 px-3 py-1.5">{afterLabel}</span>
    </div>
  )
}
