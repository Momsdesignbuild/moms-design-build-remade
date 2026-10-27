import Link from "next/link";
import type { COPY } from "@/sanity/copy/defaults";

type Cm = (typeof COPY)["cm"];
type Nav = (typeof COPY)["nav"];

const linkCls = "text-[20px] tracking-[0.1em] uppercase font-[300] hover:text-white transition-colors";

// CM's own footer: its seven services and the shared company contact details. Careers
// and the residential site are the only links that leave the section, and say so.
export default function CmFooter({ cm, nav }: { cm: Cm; nav: Nav }) {
  return (
    <footer className="bg-[#3C3C3C] text-white/75">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <address className="not-italic flex flex-col gap-3 text-[20px] font-[300] leading-relaxed">
          <a href={nav.addressLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {nav.addressLines.map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            ))}
          </a>
          <a href={`mailto:${nav.email}`} className="hover:text-white transition-colors">{nav.email}</a>
          <a href={nav.phoneHref} className="hover:text-white transition-colors tracking-[0.12em]">{nav.phone}</a>
        </address>

        <nav aria-label="Commercial footer navigation">
          <ul className="flex flex-col items-center gap-2.5">
            {cm.services.map((s) => (
              <li key={s.slug}><Link href={`/commercial/${s.slug}`} className={linkCls}>{s.title}</Link></li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col md:items-end gap-2.5">
          <li><Link href="/commercial/about" className={linkCls}>{cm.aboutLabel}</Link></li>
          <li><Link href="/contact" className={linkCls}>{cm.ctaLabel}</Link></li>
          <li><Link href="/careers" className={linkCls}>{cm.careersLabel}</Link></li>
          <li><Link href="/" className={linkCls}>{cm.residentialSiteLabel}</Link></li>
          {nav.footerLinks.filter((l) => l.href === "/privacy-policy").map((l) => (
            <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-[20px] font-[300]">
        © {new Date().getFullYear()} {nav.copyright}
      </div>
    </footer>
  );
}
