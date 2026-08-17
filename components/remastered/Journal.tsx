import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'

type Post = { title: string; slug: string; publishedAt?: string; cats?: string[]; img?: string }

// Designer names never appear on the homepage (founders' rule) — posts whose
// titles name designers are skipped, not scrubbed (blog content itself is a
// pending Jim/Owen decision).
const DESIGNER_RE = /bastyr|sweeney|mlejnek|udenberg|birkenbeuel|wiebusch|woodhead|denman/i

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''

export default async function Journal() {
  const posts = await client.fetch<Post[]>(
    `*[_type == "post" && defined(heroImage)] | order(publishedAt desc) [0...8] {
      title, "slug": slug.current, publishedAt, "cats": categories, "img": heroImage.asset->url
    }`
  )
  const picks = posts.filter((p) => !DESIGNER_RE.test(p.title)).slice(0, 3)
  if (picks.length < 3) return null

  return (
    <section className="bg-[#F7F5F2] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[16px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">The Journal</p>
            <h2 className="text-3xl md:text-5xl font-[300] tracking-[0.06em] uppercase text-ink">
              On Our Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-block text-[16px] font-semibold tracking-[0.24em] uppercase text-ink border-b border-ink/25 pb-1 hover:border-ink transition-colors"
          >
            All Stories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {picks.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-5">
                {p.img && (
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 92vw, 430px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                )}
              </div>
              <p className="text-[16px] font-semibold tracking-[0.24em] uppercase text-muted mb-2.5">
                {(p.cats ?? [])[0] ?? 'Journal'} · {fmt(p.publishedAt)}
              </p>
              <h3 className="text-[17px] md:text-[18px] font-[300] tracking-[0.06em] leading-snug text-ink group-hover:text-brand transition-colors duration-300">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="md:hidden mt-10 inline-block text-[16px] font-semibold tracking-[0.24em] uppercase text-ink border-b border-ink/25 pb-1"
        >
          All Stories
        </Link>
      </div>
    </section>
  )
}
