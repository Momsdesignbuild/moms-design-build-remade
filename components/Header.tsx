"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, CaretDown } from "@phosphor-icons/react";

const NAV_ITEMS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  {
    label: "Process",
    href: "/process",
    children: [
      { label: "Homeowner Portal", href: "/homeowner-portal" },
      { label: "The Mom's Way", href: "/process" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Landscape Architecture",
        href: "/services/landscape-architecture",
      },
      {
        label: "Interior Design & Remodeling",
        href: "/services/interior-design-and-remodeling",
      },
      {
        label: "Residential Fine Gardening",
        href: "/services/garden-management",
      },
      {
        label: "Commercial Maintenance",
        href: "/services/commercial-maintenance",
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Mom's Design Build — Home">
          <Image
            src="https://momsdesignbuild.com/wp-content/uploads/2023/05/MDB-logo-horizontal-color_RGB_20-220x53.png"
            alt="Mom's Design Build"
            width={176}
            height={43}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-[11.5px] font-[500] tracking-[0.12em] uppercase text-ink hover:text-brand transition-colors duration-200"
              >
                {item.label}
                {item.children && (
                  <CaretDown size={10} weight="bold" className="mt-px" />
                )}
              </Link>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 w-60 bg-white shadow-lg border border-gray-100 py-2 z-50"
                    role="menu"
                  >
                    {item.children.map((child) => (
                      <li key={child.label} role="none">
                        <Link
                          href={child.href}
                          role="menuitem"
                          className="block px-5 py-3 text-[11px] tracking-[0.1em] uppercase text-ink hover:text-brand hover:bg-gray-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Contact CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center justify-center bg-brand text-white text-[11px] font-[600] tracking-[0.18em] uppercase px-6 py-3 hover:bg-brand-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Contact
          </Link>

          <button
            className="lg:hidden p-2 text-ink hover:text-brand transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <List size={24} weight="regular" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-gray-100">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                aria-label="Mom's Design Build — Home"
              >
                <Image
                  src="https://momsdesignbuild.com/wp-content/uploads/2023/05/MDB-logo-horizontal-color_RGB_20-220x53.png"
                  alt="Mom's Design Build"
                  width={158}
                  height={38}
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-ink hover:text-brand transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav Items */}
            <nav
              className="flex-1 overflow-y-auto px-6 py-8 flex flex-col"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-gray-100">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 text-[12px] font-[500] tracking-[0.14em] uppercase text-ink hover:text-brand transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 pb-3 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="py-2 text-[11px] tracking-[0.1em] uppercase text-muted hover:text-brand transition-colors block"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                className="mt-8 bg-brand text-white text-[12px] font-[600] tracking-[0.18em] uppercase px-6 py-4 text-center hover:bg-brand-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
