'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export type AnatomyStep = { label: string; title: string; blurb: string; image: string; alt: string }

/**
 * Anatomy of a project — pinned sticky-scroll. Steps advance as you scroll;
 * the photo crossfades from plan → rendering → build → reveal. One real
 * project, start to finish. (Sticky-scroll-reveal language, MDB story.)
 */
export default function AnatomyClient({ steps }: { steps: AnatomyStep[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Marketing 8/3: the pinned section must not trap users in a long scroll —
  // steps are also buttons. Jump lands mid-band for step i so the scroll
  // handler below agrees about which step is active.
  const jumpTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((i + 0.5) / steps.length) * scrollable, behavior: 'smooth' })
  }

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)))
  })

  return (
    <section ref={ref} className="relative bg-[#F7F5F2]" style={{ height: `${steps.length * 45 + 40}vh` }}>
      {/* 100svh + pt clears the fixed header; everything below is sized so the
          full story (photo + heading + 4 steps + link) fits ONE phone frame */}
      <div className="sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden pt-16 lg:pt-0">
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20 items-center">
            {/* step list — active step breathes, others recede */}
            <div className="order-2 lg:order-1 space-y-3 lg:space-y-8">
              <div className="mb-4 lg:mb-10">
                <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-2 lg:mb-4">The Moms Way</p>
                <h2 className="text-[22px] md:text-4xl font-[300] tracking-[0.06em] uppercase text-ink">
                  Anatomy of a Project
                </h2>
              </div>
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => jumpTo(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jumpTo(i) } }}
                  className="transition-opacity duration-500 cursor-pointer"
                  style={{ opacity: i === active ? 1 : 0.28 }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[20px] font-semibold tracking-[0.26em] uppercase text-brand shrink-0">
                      {s.label}
                    </span>
                    <div>
                      <h3 className="text-[20px] md:text-2xl font-[300] tracking-[0.1em] uppercase text-ink mb-1 lg:mb-1.5">
                        {s.title}
                      </h3>
                      <p
                        className="text-[20px] font-[300] leading-snug lg:leading-relaxed text-muted max-w-md transition-all duration-500 overflow-hidden"
                        style={{ maxHeight: i === active ? 150 : 0, opacity: i === active ? 1 : 0 }}
                      >
                        {s.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* no border-b here: iOS smears borders inside pinned sticky
                  containers into stacked ghost lines during scroll */}
              <Link
                href="/process"
                className="inline-block mt-1 lg:mt-2 text-[20px] font-semibold tracking-[0.24em] uppercase text-ink hover:text-brand transition-colors"
              >
                See the Full Process&ensp;&rarr;
              </Link>
            </div>

            {/* the photo — square frame on the cream mat, crossfading */}
            <div className="order-1 lg:order-2 relative aspect-square w-full max-w-[min(340px,34svh)] lg:max-w-[min(520px,72vh)] mx-auto lg:ml-auto bg-white p-2 lg:p-3 shadow-[0_30px_60px_-30px_rgba(28,28,26,0.25)]">
              <div className="relative w-full h-full overflow-hidden">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{ opacity: i === active ? 1 : 0, scale: i === active ? '1' : '1.04' }}
                  >
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      quality={90}
                      priority={i === 0}
                      loading="eager"
                      sizes="(max-width: 1024px) 92vw, 560px"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="absolute right-3 bottom-3 bg-white/92 px-3 py-1.5">
                  <span className="text-[20px] font-semibold tracking-[0.22em] uppercase text-ink">
                    Serene Shores · {active + 1} / {steps.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
