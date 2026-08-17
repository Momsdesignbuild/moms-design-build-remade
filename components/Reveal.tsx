'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Viewport fade-in for photos. Marketing 8/7: images were popping in at
 * ~0.3s as they loaded — too abrupt, eased to 0.9s. Marketing 8/16: still
 * too quick, bumped 1.5x to 1.35s. Wraps server-rendered children; no
 * layout shift.
 */
export default function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1350ms] ease-out will-change-[opacity,transform] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      {children}
    </div>
  )
}
