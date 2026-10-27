import Link from "next/link";
import Image from "next/image";
import type { COPY } from "@/sanity/copy/defaults";

type Cm = (typeof COPY)["cm"];
type Item = { label: string; href: string };

const linkCls = "cm-tl text-[20px] font-[500] tracking-[0.12em] uppercase text-ink hover:text-[#5EAD4F] transition-colors";
const subCls = "block px-5 py-3 text-[15px] tracking-[0.1em] uppercase text-ink hover:text-[#5EAD4F] hover:bg-gray-50 transition-colors";
const mobLabel = "pt-5 pb-2 text-[20px] tracking-[0.14em] uppercase text-muted";
const mobSub = "py-2.5 pl-4 text-[20px] tracking-[0.1em] uppercase text-ink border-b border-gray-100";

// A top-level item whose list opens on hover/focus. Pure CSS, so every link is in the HTML.
function Menu({ label, href, items, extraHeading, extraItems = [], twoCols = false }: { label: string; href: string; items: Item[]; extraHeading?: string; extraItems?: Item[]; twoCols?: boolean }) {
  return (
    <div className="relative group">
      <Link href={href} className={`${linkCls} flex items-center gap-1`}>
        {label} <span aria-hidden className="text-[12px]">▾</span>
      </Link>
      <div className={`absolute top-full left-0 ${twoCols ? "w-[34rem]" : "w-72"} pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity`}>
        <ul className={`bg-white shadow-lg border border-gray-100 py-2 ${twoCols ? "grid grid-flow-col" : "divide-y divide-gray-100"}`} style={twoCols ? { gridTemplateRows: `repeat(${Math.ceil(items.length / 2)}, auto)` } : undefined}>
          {items.map((s) => (
            <li key={s.href}><Link href={s.href} className={subCls}>{s.label}</Link></li>
          ))}
          {extraHeading && <li className="px-5 pt-4 pb-1 text-[15px] tracking-[0.1em] uppercase text-muted">{extraHeading}</li>}
          {extraItems.map((s) => (
            <li key={s.href}><Link href={s.href} className={subCls}>{s.label}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// CM's own header. Server-rendered: the menus are pure CSS hover/focus and the
// phone menu is a <details>, so every link is in the HTML for crawlers with no client JS.
export default function CmHeader({ cm }: { cm: Cm }) {
  const services = cm.services.map((s) => ({ label: s.title, href: `/commercial/${s.slug}` }));
  const areas = cm.cities.map((c) => ({ label: c.name, href: `/commercial/service-areas/${c.slug}` }));
  return (
    <header className="cm-header sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
        <Link href="/commercial" className="flex-shrink-0" aria-label={cm.logo.alt}>
          <Image src={cm.logo.url} alt={cm.logo.alt} width={250} height={49} priority className="cm-logo" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Commercial navigation">
          <Menu label={cm.servicesLabel} href="/commercial#services" items={services} extraHeading={cm.otherServicesHeading} extraItems={cm.otherServices} />
          <Menu label={cm.propertiesLabel} href="/commercial#properties" items={areas} twoCols />
          <Link href="/commercial/about" className={linkCls}>{cm.aboutLabel}</Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/" className="cm-tl hidden xl:block text-[20px] tracking-[0.1em] uppercase text-muted hover:text-ink transition-colors">
            {cm.residentialSiteLabel}
          </Link>
          <Link
            href="/contact"
            className="hidden lg:inline-flex bg-[#5EAD4F] text-white text-[20px] font-[600] tracking-[0.18em] uppercase whitespace-nowrap px-6 py-3 hover:bg-[#4d9340] transition-colors"
          >
            {cm.ctaLabel}
          </Link>

          <details className="lg:hidden group/m">
            <summary className="cm-tl list-none cursor-pointer p-2 text-[20px] tracking-[0.14em] uppercase text-ink" aria-label="Open navigation menu">
              Menu
            </summary>
            <nav className="fixed left-0 right-0 top-[72px] bottom-0 overflow-y-auto bg-white px-6 py-6 flex flex-col" aria-label="Commercial mobile navigation">
              <p className="pb-2 text-[20px] tracking-[0.14em] uppercase text-muted">{cm.servicesLabel}</p>
              {services.map((s) => (
                <Link key={s.href} href={s.href} className={mobSub}>{s.label}</Link>
              ))}
              <p className={mobLabel}>{cm.otherServicesHeading}</p>
              {cm.otherServices.map((s) => (
                <Link key={s.href} href={s.href} className={mobSub}>{s.label}</Link>
              ))}
              <p className={mobLabel}>{cm.propertiesLabel}</p>
              {areas.map((s) => (
                <Link key={s.href} href={s.href} className={mobSub}>{s.label}</Link>
              ))}
              <Link href="/commercial/about" className="mt-2 py-4 text-[20px] tracking-[0.14em] uppercase text-ink border-b border-gray-100">{cm.aboutLabel}</Link>
              <Link href="/" className="py-4 text-[20px] tracking-[0.14em] uppercase text-muted">{cm.residentialSiteLabel}</Link>
              <Link href="/contact" className="mt-4 bg-[#5EAD4F] text-white text-[20px] font-[600] tracking-[0.18em] uppercase px-6 py-4 text-center">{cm.ctaLabel}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
