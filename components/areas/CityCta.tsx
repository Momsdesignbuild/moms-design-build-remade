import Link from 'next/link'

export default function CityCta({ heading, body, primary, call, phone, phoneHref }: { heading: string; body: string; primary: string; call: string; phone: string; phoneHref: string }) {
  return (
    <section className="bg-ink text-white px-6 py-24 lg:py-32 text-center">
      <style>{`@keyframes shimmerSweep{0%{transform:translateX(-120%)}60%,100%{transform:translateX(220%)}} @media (prefers-reduced-motion:reduce){.shim{display:none}}`}</style>
      <h2 className="text-[clamp(38px,6vw,84px)] leading-[1.05] mb-6 !text-white !font-normal !tracking-normal" style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}>{heading}</h2>
      <p className="text-[20px] font-[300] text-white/80 max-w-[560px] mx-auto mb-10">{body}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/contact" className="relative overflow-hidden bg-brand text-white text-[18px] font-[600] tracking-[0.24em] uppercase px-10 py-5 hover:bg-brand-dark transition-colors">
          <span className="shim absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-18deg]" style={{ animation: 'shimmerSweep 3.4s ease-in-out infinite' }} aria-hidden="true" />
          <span className="relative">{primary}</span>
        </Link>
        <a href={phoneHref} className="text-[20px] tracking-[0.14em] border-b border-white/40 pb-1 hover:border-white transition-colors">{call} {phone}</a>
      </div>
    </section>
  )
}
