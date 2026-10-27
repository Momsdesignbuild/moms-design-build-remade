import Link from "next/link";
import Image from "next/image";
import type { COPY } from "@/sanity/copy/defaults";

type Cm = (typeof COPY)["cm"];

const linkCls = "text-[20px] font-[500] tracking-[0.12em] uppercase text-ink hover:text-[#5EAD4F] transition-colors";
const subCls = "block px-5 py-3 text-[15px] tracking-[0.1em] uppercase text-ink hover:text-[#5EAD4F] hover:bg-gray-50 transition-colors";

// CM's own header. Server-rendered: the Services menu is pure CSS hover/focus and the
// phone menu is a <details>, so every link is in the HTML for crawlers with no client JS.
export default function CmHeader({ cm }: { cm: Cm }) {
  const services = cm.services.map((s) => ({ label: s.title, href: `/commercial/${s.slug}` }));
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
        <Link href="/commercial" className="flex-shrink-0" aria-label={cm.logo.alt}>
          <Image src={cm.logo.url} alt={cm.logo.alt} width={250} height={49} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Commercial navigation">
          <div className="relative group">
            <Link href="/commercial#services" className={`${linkCls} flex items-center gap-1`}>
              {cm.servicesLabel} <span aria-hidden className="text-[12px]">▾</span>
            </Link>
            <div className="absolute top-full left-0 w-72 pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity">
              <ul className="bg-white shadow-lg border border-gray-100 py-2 divide-y divide-gray-100">
                {services.map((s) => (
                  <li key={s.href}><Link href={s.href} className={subCls}>{s.label}</Link></li>
                ))}
                <li className="px-5 pt-4 pb-1 text-[15px] tracking-[0.1em] uppercase text-muted">{cm.otherServicesHeading}</li>
                {cm.otherServices.map((s) => (
                  <li key={s.href}><Link href={s.href} className={subCls}>{s.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/commercial#properties" className={linkCls}>{cm.propertiesLabel}</Link>
          <Link href="/commercial/about" className={linkCls}>{cm.aboutLabel}</Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/" className="hidden xl:block text-[20px] tracking-[0.1em] uppercase text-muted hover:text-ink transition-colors">
            {cm.residentialSiteLabel}
          </Link>
          <Link
            href="/contact"
            className="hidden lg:inline-flex bg-[#5EAD4F] text-white text-[20px] font-[600] tracking-[0.18em] uppercase whitespace-nowrap px-6 py-3 hover:bg-[#4d9340] transition-colors"
          >
            {cm.ctaLabel}
          </Link>

          <details className="lg:hidden group/m">
            <summary className="list-none cursor-pointer p-2 text-[20px] tracking-[0.14em] uppercase text-ink" aria-label="Open navigation menu">
              Menu
            </summary>
            <nav className="fixed left-0 right-0 top-[72px] bottom-0 overflow-y-auto bg-white px-6 py-6 flex flex-col" aria-label="Commercial mobile navigation">
              <p className="py-3 text-[20px] tracking-[0.14em] uppercase text-muted">{cm.servicesLabel}</p>
              {services.map((s) => (
                <Link key={s.href} href={s.href} className="py-2.5 pl-4 text-[20px] tracking-[0.1em] uppercase text-ink border-b border-gray-100">{s.label}</Link>
              ))}
              <p className="pt-5 pb-2 text-[20px] tracking-[0.14em] uppercase text-muted">{cm.otherServicesHeading}</p>
              {cm.otherServices.map((s) => (
                <Link key={s.href} href={s.href} className="py-2.5 pl-4 text-[20px] tracking-[0.1em] uppercase text-ink border-b border-gray-100">{s.label}</Link>
              ))}
              <Link href="/commercial#properties" className="py-4 text-[20px] tracking-[0.14em] uppercase text-ink border-b border-gray-100">{cm.propertiesLabel}</Link>
              <Link href="/commercial/about" className="py-4 text-[20px] tracking-[0.14em] uppercase text-ink border-b border-gray-100">{cm.aboutLabel}</Link>
              <Link href="/" className="py-4 text-[20px] tracking-[0.14em] uppercase text-muted">{cm.residentialSiteLabel}</Link>
              <Link href="/contact" className="mt-4 bg-[#5EAD4F] text-white text-[20px] font-[600] tracking-[0.18em] uppercase px-6 py-4 text-center">{cm.ctaLabel}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
