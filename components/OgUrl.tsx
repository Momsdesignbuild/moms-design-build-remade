'use client'

import { usePathname } from 'next/navigation'

// og:url = this page's own address, same as its canonical (live Yoast does this
// on every page). Next's openGraph metadata replaces the layout's object
// wholesale, so per-page og:url went missing on 278 pages (audit 9/29) — one
// tag here instead of 17 generateMetadata edits. trailingSlash is on, so paths
// end in "/" exactly like the WP canonicals.
export default function OgUrl() {
  const path = usePathname() || '/'
  const withSlash = path.endsWith('/') ? path : `${path}/`
  return <meta property="og:url" content={`https://momsdesignbuild.com${withSlash}`} />
}
