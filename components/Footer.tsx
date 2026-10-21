import Link from "next/link";
import Image from "next/image";
import { getCopy } from "@/sanity/lib/copy";
import { socialIcon } from "@/components/SocialIcon";

export default async function Footer() {
  const nav = await getCopy("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3C3C3C] text-white/75">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* NAP */}
        <address className="not-italic flex flex-col gap-3 text-[20px] font-[300] leading-relaxed">
          <a
            href={nav.addressLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            {nav.addressLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </a>
          <span className="w-8 h-px bg-white/25 block" aria-hidden="true" />
          <a
            href={`mailto:${nav.email}`}
            className="hover:text-white transition-colors"
          >
            {nav.email}
          </a>
          <span className="w-8 h-px bg-white/25 block" aria-hidden="true" />
          <a
            href={nav.phoneHref}
            className="hover:text-white transition-colors tracking-[0.12em]"
          >
            {nav.phone}
          </a>
        </address>

        {/* Nav + Logo */}
        <div className="flex flex-col items-center gap-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col items-center gap-2.5">
              {nav.footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[20px] tracking-[0.1em] uppercase font-[300] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/" aria-label="Mom's Design Build — Home">
            <Image
              src="https://cdn.sanity.io/images/wavk40jo/production/d3036e0363c0c79d395ebe0bd644402afc7e3aa6-260x260.png"
              alt="Mom's Design Build - Luxury Landscape and Interior Design and Build in Minnesota"
              width={180}
              height={44}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        {/* Social */}
        <div className="flex md:justify-end">
          <div className="flex flex-row md:flex-col gap-5">
            {nav.socials.map(({ label, href }) => {
              const Icon = socialIcon(label);
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4 text-center text-[20px] text-white/35 tracking-wider">
          &copy; {year} {nav.copyright}
        </div>
      </div>
    </footer>
  );
}
