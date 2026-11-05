import Image from 'next/image'
import Link from 'next/link'
import type { Photo } from '@/sanity/lib/areas'
import { SERIF } from "@/components/areas/fonts";

/**
 * City page opener. The pool photo and the H1 are readable at once: two ink doors
 * slide apart in 0.8s with pure CSS (no JavaScript, so they can never get stuck shut).
 */
export default function CityHero({ city, kicker, tagline, primary, secondary, photo }: {
  city: string; kicker: string; tagline: string; primary: string; secondary: string; photo: Photo
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white h-[88svh] min-h-[560px]">
      <style>{`
        @keyframes doorL{to{transform:translateX(-101%)}}
        @keyframes doorR{to{transform:translateX(101%)}}
        @keyframes heroUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        @keyframes heroZoom{from{transform:scale(1.08)}to{transform:scale(1)}}
        .door-l{animation:doorL .8s .05s cubic-bezier(.76,0,.24,1) forwards}
        .door-r{animation:doorR .8s .05s cubic-bezier(.76,0,.24,1) forwards}
        .hero-up{animation:heroUp .8s .35s cubic-bezier(.2,.7,.2,1) both}
        .hero-zoom{animation:heroZoom 2.4s cubic-bezier(.2,.7,.2,1) both}
        @media (prefers-reduced-motion:reduce){.door-l,.door-r{display:none}.hero-up,.hero-zoom{animation:none}}
      `}</style>
      <Image src={photo.url} alt={photo.alt} fill priority sizes="100vw" className="object-cover hero-zoom" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" aria-hidden="true" />
      <div className="door-l absolute inset-y-0 left-0 w-1/2 bg-ink z-10" aria-hidden="true" />
      <div className="door-r absolute inset-y-0 right-0 w-1/2 bg-ink z-10" aria-hidden="true" />
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-end pb-16 lg:pb-24">
        <p className="hero-up text-[18px] font-semibold tracking-[0.34em] uppercase text-white/85 mb-4">{kicker}</p>
        <h1 className="hero-up text-[clamp(56px,11vw,168px)] leading-[0.92] mb-5 !text-white !font-normal !tracking-normal" style={{ fontFamily: SERIF }}>
          {city}
        </h1>
        <p className="hero-up text-[20px] lg:text-[24px] font-[300] tracking-[0.03em] max-w-[640px] text-white/90 mb-9">{tagline}</p>
        <div className="hero-up flex flex-wrap gap-3">
          <Link href="/contact" className="bg-brand text-white text-[18px] font-[600] tracking-[0.22em] uppercase px-8 py-4 hover:bg-brand-dark transition-colors">{primary}</Link>
          <Link href="/portfolio" className="border border-white/70 text-white text-[18px] font-[600] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white hover:text-ink transition-colors">{secondary}</Link>
        </div>
      </div>
    </section>
  )
}
