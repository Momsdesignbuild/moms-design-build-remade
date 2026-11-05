import Image from 'next/image'
import { getCopy } from '@/sanity/lib/copy'
import GuideForm from './GuideForm'

/** The free-guide band above the footer: replaces the old newsletter signup on the home, blog and post pages. */
export default async function GuideBand({ source }: { source: 'home' | 'blog' }) {
  const c = await getCopy('guide')
  return (
    <section className="bg-[#F7F5F2] px-6 py-16 lg:py-24">
      <div className="max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 md:gap-16 items-center">
        <div className="mx-auto w-full max-w-[300px] md:max-w-[360px] md:-rotate-2 shadow-[0_40px_70px_-30px_rgba(28,28,26,0.55)]">
          <Image src={c.image.url} alt={c.image.alt ?? ''} width={1445} height={1870} className="w-full h-auto" sizes="(max-width: 768px) 300px, 360px" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-[20px] font-semibold tracking-[0.3em] uppercase text-brand mb-4">{c.kicker}</p>
          <h2
            className="text-[34px] lg:text-[46px] leading-[1.08] text-ink mb-5"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
          >
            {c.heading}
          </h2>
          <p className="text-[20px] font-[300] leading-relaxed text-muted mb-8 max-w-[520px] mx-auto md:mx-0">{c.body}</p>
          <div className="max-w-[460px] mx-auto md:mx-0">
            <GuideForm c={c} source={source} />
          </div>
        </div>
      </div>
    </section>
  )
}
