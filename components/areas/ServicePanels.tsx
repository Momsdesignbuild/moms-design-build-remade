'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Photo } from '@/sanity/lib/areas'
import { SERIF } from "@/components/areas/fonts";
import { SIZE_HALF } from "@/components/areas/fonts";

export type Panel = { label: string; text: string; photo: Photo }

/** Expanding panels (pools, decks, living, interiors). Hover or tap opens one; phones stack them. */
export default function ServicePanels({ panels, hint }: { panels: Panel[]; hint: string }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <p className="lg:hidden text-[14px] tracking-[0.2em] uppercase text-muted mb-3">{hint}</p>
      <div className="flex flex-col lg:flex-row gap-2 lg:h-[72vh] lg:min-h-[520px]">
        {panels.map((p, i) => {
          const on = i === active
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => window.matchMedia('(pointer: fine)').matches && setActive(i)}
              onFocus={() => setActive(i)}
              aria-expanded={on}
              className={`relative overflow-hidden text-left text-white bg-ink transition-[flex-grow,height] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]
                ${on ? 'h-[56vh] lg:h-auto lg:flex-[4]' : 'h-[16vh] lg:h-auto lg:flex-[1]'}`}
            >
              <Image src={p.photo.url} alt={p.photo.alt} fill sizes={SIZE_HALF} className={`object-cover transition-transform duration-[1400ms] ${on ? 'scale-100' : 'scale-110'}`} />
              <div className={`absolute inset-0 transition-opacity duration-500 ${on ? 'bg-gradient-to-t from-black/70 via-transparent to-transparent' : 'bg-black/35'}`} aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className={`text-[26px] lg:text-[34px] leading-tight !text-white !font-normal !tracking-normal transition-all duration-500 ${on ? '' : 'lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-[26px]'}`} style={{ fontFamily: SERIF }}>{p.label}</h3>
                <p className={`text-[18px] font-[300] leading-relaxed max-w-[420px] overflow-hidden transition-all duration-500 ${on ? 'mt-3 opacity-100 max-h-40' : 'opacity-0 max-h-0'}`}>{p.text}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
