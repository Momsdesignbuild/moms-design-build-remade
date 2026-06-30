import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contact Mom's Design Build - Landscape & Interior Design" },
  description:
    "Mom's Design Build offers custom luxury landscaping, remodeling & gardening services to the Twin Cities, MN and surrounding areas. Let's chat!",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">
          Contact Us
        </h1>
        <p className="mt-4 text-[14px] font-[300] leading-relaxed text-muted max-w-md mx-auto">
          Ready to start your project? We&apos;d love to hear from you.
        </p>
      </section>

      {/* ── Contact Layout ── */}
      <section className="px-6 pb-20 bg-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-[14px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">
              Get in Touch
            </h2>

            <address className="not-italic space-y-6 text-[14px] font-[300] leading-relaxed text-muted">
              <div>
                <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  Address
                </p>
                <a
                  href="https://www.google.com/maps/search/12275+Weckman+Road+Shakopee+MN+55379"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors"
                >
                  12275 Weckman Road
                  <br />
                  Shakopee, MN 55379
                </a>
              </div>

              <div>
                <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  Phone
                </p>
                <a href="tel:+19522776667" className="hover:text-brand transition-colors">
                  952.277.6667
                </a>
              </div>

              <div>
                <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-1.5">
                  Email
                </p>
                <a
                  href="mailto:hello@momsdesignbuild.com"
                  className="hover:text-brand transition-colors"
                >
                  hello@momsdesignbuild.com
                </a>
              </div>
            </address>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-[10.5px] font-[500] tracking-[0.18em] uppercase text-ink mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                {[
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/momsdesignbuild/",
                  },
                  {
                    label: "Facebook",
                    href: "http://www.facebook.com/momsdesignbuild",
                  },
                  {
                    label: "Houzz",
                    href: "http://www.houzz.com/pro/momsdesignbuild",
                  },
                  {
                    label: "Pinterest",
                    href: "https://www.pinterest.com/momsdesignbuild/",
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/momsdesignbuild",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-[400] tracking-[0.08em] uppercase text-muted hover:text-brand transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-[14px] font-[300] tracking-[0.2em] uppercase text-ink mb-8">
              Send a Message
            </h2>
            <form
              action="https://formspree.io/f/hello@momsdesignbuild.com"
              method="POST"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-[10.5px] font-[500] tracking-[0.15em] uppercase text-ink"
                >
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="border border-gray-200 px-4 py-3 text-[14px] font-[300] text-ink placeholder:text-gray-300 focus:outline-none focus:border-brand transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-[10.5px] font-[500] tracking-[0.15em] uppercase text-ink"
                >
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="border border-gray-200 px-4 py-3 text-[14px] font-[300] text-ink placeholder:text-gray-300 focus:outline-none focus:border-brand transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-[10.5px] font-[500] tracking-[0.15em] uppercase text-ink"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="border border-gray-200 px-4 py-3 text-[14px] font-[300] text-ink placeholder:text-gray-300 focus:outline-none focus:border-brand transition-colors"
                  placeholder="(952) 555-0000"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="service"
                  className="text-[10.5px] font-[500] tracking-[0.15em] uppercase text-ink"
                >
                  Service of Interest
                </label>
                <select
                  id="service"
                  name="service"
                  className="border border-gray-200 px-4 py-3 text-[14px] font-[300] text-ink bg-white focus:outline-none focus:border-brand transition-colors appearance-none"
                >
                  <option value="">Select a service</option>
                  <option value="landscape-architecture">
                    Landscape Architecture
                  </option>
                  <option value="interior-design-remodeling">
                    Interior Design &amp; Remodeling
                  </option>
                  <option value="fine-gardening">
                    Residential Fine Gardening
                  </option>
                  <option value="commercial-maintenance">
                    Commercial Maintenance
                  </option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-[10.5px] font-[500] tracking-[0.15em] uppercase text-ink"
                >
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="border border-gray-200 px-4 py-3 text-[14px] font-[300] text-ink placeholder:text-gray-300 focus:outline-none focus:border-brand transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="self-start bg-brand text-white text-[11.5px] font-[600] tracking-[0.22em] uppercase px-9 py-4 hover:bg-brand-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
