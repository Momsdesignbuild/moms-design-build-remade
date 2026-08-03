import type { Metadata } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import "./globals.css";

// MDB style guide (Jim, July 8 meeting): Futura PT for headings, Proxima Nova
// for body — the EXACT self-hosted files their WP site serves (from the mirror).
const proximaNova = localFont({
  src: [
    { path: "../public/fonts/proxima-nova_light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/ProximaNova-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
const futuraPT = localFont({
  src: [{ path: "../public/fonts/futura-pt_light.woff2", weight: "300", style: "normal" }],
  variable: "--font-heading",
  display: "swap",
});

const OG_IMAGE =
  "https://cdn.sanity.io/images/wavk40jo/production/3a444706d6cb6fc9db85c7643c064d0cbe993d9c-2400x1348.jpg?w=1200&h=630&fit=crop&auto=format";
const DEFAULT_LOGO =
  "https://cdn.sanity.io/images/wavk40jo/production/8c90cd8a507f30403ce2194fa8a1a5eee1eaf1c1-1000x242.png";

// Go-live checklist: the siteSettings singleton (sanity/schemaTypes/siteSettings.ts)
// existed as a schema with nothing reading it. This wires up the fields it
// already defines — every value falls back to today's hardcoded default, so
// an empty/missing doc changes nothing. Structured address/geo/social links
// stay hardcoded on purpose: local-SEO NAP consistency is worth a code
// review, not a quick Sanity text-field edit.
async function getSiteSettings() {
  const s = await client.fetch<{
    siteName?: string;
    phone?: string;
    email?: string;
    defaultMetaTitle?: string;
    defaultMetaDescription?: string;
    logoUrl?: string;
  } | null>(
    `*[_type == "siteSettings"][0]{siteName, phone, email, defaultMetaTitle, defaultMetaDescription, "logoUrl": logo.asset->url}`
  );
  return {
    siteName: s?.siteName || "Mom's Design Build",
    phone: s?.phone || "952-277-6667",
    email: s?.email || "hello@momsdesignbuild.com",
    defaultMetaTitle: s?.defaultMetaTitle || "Mom's Design Build - Landscape & Interior Designers In Minnesota",
    defaultMetaDescription:
      s?.defaultMetaDescription ||
      "Mom's Design Build creates beautiful, thoughtful outdoor and indoor living spaces through award-winning landscape architecture, interior design, and remodeling in Minnesota.",
    logoUrl: s?.logoUrl || DEFAULT_LOGO,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL("https://momsdesignbuild.com"),
    // Indexability is decided per-request by host, not by env: middleware.ts
    // stamps X-Robots-Tag noindex on any host that isn't momsdesignbuild.com,
    // so *.vercel.app can never leak into Google and the real domain is
    // indexable the moment DNS points at it. No launch-day flip to forget.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    title: {
      default: settings.defaultMetaTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultMetaDescription,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://momsdesignbuild.com",
      siteName: settings.siteName,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${settings.siteName} — Award-Winning Landscape & Interior Design in Minnesota`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://momsdesignbuild.com/#organization",
        name: settings.siteName,
        url: "https://momsdesignbuild.com",
        description:
          "Minnesota's most award-winning design-build firm specializing in landscape architecture, interior design & remodeling, fine gardening, and commercial maintenance.",
        telephone: settings.phone,
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "12275 Weckman Road",
          addressLocality: "Shakopee",
          addressRegion: "MN",
          postalCode: "55379",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "44.7974",
          longitude: "-93.5278",
        },
        areaServed: [
          "Twin Cities",
          "Minneapolis",
          "Saint Paul",
          "Minnetonka",
          "Edina",
          "Minnesota",
        ],
        priceRange: "$$$",
        image: OG_IMAGE,
        logo: settings.logoUrl,
        sameAs: [
          "https://www.instagram.com/momsdesignbuild",
          "https://www.facebook.com/momsdesignbuild",
          "https://www.houzz.com/professionals/landscape-architects-and-landscape-designers/moms-design-build",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://momsdesignbuild.com/#website",
        url: "https://momsdesignbuild.com",
        name: settings.siteName,
        description: "Award-Winning Landscaping and Remodeling in Minnesota",
        publisher: { "@id": "https://momsdesignbuild.com/#organization" },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en" className={`${proximaNova.variable} ${futuraPT.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
