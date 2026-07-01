import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const OG_IMAGE =
  "https://cdn.sanity.io/images/wavk40jo/production/3a444706d6cb6fc9db85c7643c064d0cbe993d9c-2400x1348.jpg?w=1200&h=630&fit=crop&auto=format";

const isLive = process.env.SITE_LIVE === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://momsdesignbuild.com"),
  robots: isLive
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : "noindex, nofollow",
  title: {
    default: "Mom's Design Build - Landscape & Interior Designers In Minnesota",
    template: "%s | Mom's Design Build",
  },
  description:
    "Mom's Design Build creates beautiful, thoughtful outdoor and indoor living spaces through award-winning landscape architecture, interior design, and remodeling in Minnesota.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://momsdesignbuild.com",
    siteName: "Mom's Design Build",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mom's Design Build — Award-Winning Landscape & Interior Design in Minnesota",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://momsdesignbuild.com/#organization",
      name: "Mom's Design Build",
      url: "https://momsdesignbuild.com",
      description:
        "Minnesota's most award-winning design-build firm specializing in landscape architecture, interior design & remodeling, fine gardening, and commercial maintenance.",
      telephone: "952-377-6667",
      email: "hello@momsdesignbuild.com",
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
      logo: "https://cdn.sanity.io/images/wavk40jo/production/97ace4cc39b91a89ff41889263269dd8b690ad4e-220x53.png",
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
      name: "Mom's Design Build",
      description: "Award-Winning Landscaping and Remodeling in Minnesota",
      publisher: { "@id": "https://momsdesignbuild.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
