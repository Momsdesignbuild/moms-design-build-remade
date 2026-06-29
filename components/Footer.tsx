import Link from "next/link";
import Image from "next/image";
import {
  InstagramLogo,
  FacebookLogo,
  PinterestLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

// Houzz doesn't have a Phosphor icon — custom SVG
function HouzzIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M48.1 34.4L32 26.6 15.9 34.4V64h14.3V48.4h3.6V64h14.3V34.4z" />
      <path d="M15.9 0v27.1L48.1 11V0z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/momsdesignbuild/",
    Icon: InstagramLogo,
  },
  {
    label: "Facebook",
    href: "http://www.facebook.com/momsdesignbuild",
    Icon: FacebookLogo,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/momsdesignbuild/",
    Icon: PinterestLogo,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/momsdesignbuild",
    Icon: LinkedinLogo,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3C3C3C] text-white/75">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* NAP */}
        <address className="not-italic flex flex-col gap-3 text-[13px] font-[300] leading-relaxed">
          <a
            href="https://www.google.com/maps/search/12275+Weckman+Road+Shakopee+MN+55379"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            12275 Weckman Road
            <br />
            Shakopee, MN 55379
          </a>
          <span className="w-8 h-px bg-white/25 block" aria-hidden="true" />
          <a
            href="mailto:hello@momsdesignbuild.com"
            className="hover:text-white transition-colors"
          >
            hello@momsdesignbuild.com
          </a>
          <span className="w-8 h-px bg-white/25 block" aria-hidden="true" />
          <a
            href="tel:+19522776667"
            className="hover:text-white transition-colors tracking-[0.12em]"
          >
            952.277.6667
          </a>
        </address>

        {/* Nav + Logo */}
        <div className="flex flex-col items-center gap-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col items-center gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[11.5px] tracking-[0.1em] uppercase font-[300] hover:text-white transition-colors"
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
              alt="Mom's Design Build"
              width={180}
              height={44}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        {/* Social */}
        <div className="flex md:justify-end">
          <div className="flex flex-row md:flex-col gap-5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon size={20} weight="regular" />
              </a>
            ))}
            <a
              href="http://www.houzz.com/pro/momsdesignbuild"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Houzz"
              className="text-white/60 hover:text-white transition-colors"
            >
              <HouzzIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4 text-center text-[11px] text-white/35 tracking-wider">
          &copy; {year} Mom&apos;s Design Build. All Rights Reserved. | BC#
          638384
        </div>
      </div>
    </footer>
  );
}
