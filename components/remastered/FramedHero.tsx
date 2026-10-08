import Link from 'next/link'
import { withDefaults, type HomeContent } from '@/sanity/lib/homeContent'

/**
 * "Build Your Legacy" hero: full-bleed video, one viewport tall, static.
 *
 * 2026-10-08 (Josh): the entrance stagger and the scroll-driven
 * container-shrink (full-bleed video squeezing into a matted print over a
 * 195vh pinned section) are both gone — the staggered fade-ins read as the
 * site loading slowly, and he doesn't want the frame shrinking on scroll.
 * That took framer-motion, useScroll, the isMobile inset split and the
 * sticky pin with it, so this is a server component now: zero client JS.
 * Removing the sticky h-[100svh] pin also kills the mobile bug where the
 * collapsing browser toolbar left an empty band above the hero.
 *
 * Header.tsx still finds this section by id to decide when to turn solid —
 * it now just asks whether the section is still behind the header, no
 * shared inset curve to keep in sync.
 */

const HERO = {
  kicker: 'Minnesota’s Most Awarded Design-Build Firm',
  title: 'Build Your Legacy',
  videoUrl: '/video/hero.mp4',
  posterUrl: '/video/hero-poster.jpg',
  primaryCta: { label: 'Explore Our Work', href: '/portfolio' },
  secondaryCta: { label: 'Meet With Us', href: '/contact' },
}

export default function FramedHero({ content }: { content?: HomeContent['hero'] }) {
  const c = withDefaults(HERO, content)
  const cta1 = withDefaults(HERO.primaryCta, c.primaryCta)
  const cta2 = withDefaults(HERO.secondaryCta, c.secondaryCta)

  return (
    // 100svh: iOS Safari's collapsing toolbar makes 100vh overshoot and jitter
    <section id="home-hero-section" className="relative h-[100svh] overflow-hidden bg-[#F7F5F2]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={c.posterUrl}
      >
        <source src={c.videoUrl} type="video/mp4" />
      </video>
      {/* the veil used to lift from 0.32 to 0.14 on scroll; holds at its opening value */}
      <div className="absolute inset-0 bg-black opacity-[0.32]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-[19px] md:text-[31px] font-semibold tracking-[0.3em] uppercase text-white/85 mb-6">
          {c.kicker}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-[300] tracking-[0.08em] uppercase text-white">
          {c.title}
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={cta1.href}
            className="border border-white/90 text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-9 py-3.5 hover:bg-white hover:text-ink transition-colors duration-300"
          >
            {cta1.label}
          </Link>
          <Link
            href={cta2.href}
            className="border-2 border-brand bg-brand text-white text-[20px] font-[600] tracking-[0.22em] uppercase px-10 py-4 hover:bg-transparent hover:text-brand transition-colors duration-300"
          >
            {cta2.label}
          </Link>
        </div>
        {/* "Issue line" from the editorial concept (Summer 10/7): small
            spaced caps between two thin white rules. Just Est. 1993 and
            Shakopee on every screen size (Summer 10/7). */}
        <div className="mt-12 mx-auto w-[min(420px,80vw)] text-white/85">
          <i className="block h-px bg-[#F7F5F2]/55" />
          <div className="flex justify-between gap-4 py-2.5 text-[11px] md:text-[13px] font-semibold tracking-[0.2em] uppercase">
            <span>Est. 1993</span>
            <span>Shakopee, Minnesota</span>
          </div>
          <i className="block h-px bg-[#F7F5F2]/55" />
        </div>
      </div>
    </section>
  )
}
