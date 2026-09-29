// Types + fallback helper for the homepage content. No server imports here —
// the client-side homepage sections import this file.

type Link = { label?: string; href?: string }
export type HomeContent = {
  hero?: { kicker?: string; title?: string; videoUrl?: string; posterUrl?: string; primaryCta?: Link; secondaryCta?: Link }
  statement?: { kicker?: string; text?: string }
  awards?: { heading?: string; badges?: { url: string; alt?: string }[] }
  work?: { kicker?: string; heading?: string }
  anatomy?: { kicker?: string; heading?: string; linkLabel?: string; steps?: { label?: string; title?: string; blurb?: string }[] }
  transformation?: { kicker?: string; heading?: string; subline?: string; beforeUrl?: string; beforeAlt?: string; afterUrl?: string; afterAlt?: string }
  services?: { kicker?: string; heading?: string; items?: { title: string; description?: string; href: string; image: string; alt?: string }[] }
  testimonials?: { quotes?: { text: string; who: string; linkLabel?: string; linkHref?: string }[] }
  journal?: { kicker?: string; heading?: string; linkLabel?: string }
  givingBack?: { kicker?: string; heading?: string; quote?: string; body?: string; statNumber?: string; statLabel?: string; image?: string; imageAlt?: string; partners?: { name: string; href: string; logo: string }[] }
  closing?: { kicker?: string; heading?: string; cta?: Link; image?: string; imageAlt?: string }
  joinList?: { kicker?: string; heading?: string; body?: string; image?: string; imageAlt?: string }
}

/** Fill any empty field from the component's baked-in defaults. Empty arrays count as empty. */
export function withDefaults<T extends object>(defaults: T, content?: object | null): T {
  const out = { ...defaults } as Record<string, unknown>
  for (const [k, v] of Object.entries(content ?? {})) {
    if (v === null || v === undefined || v === '') continue
    if (Array.isArray(v) && v.length === 0) continue
    out[k] = v
  }
  return out as T
}
