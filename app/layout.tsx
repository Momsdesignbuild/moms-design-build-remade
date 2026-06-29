import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://momsdesignbuild.com"),
  robots: process.env.SITE_LIVE === "true" ? "index, follow" : "noindex, nofollow",
  title: {
    default:
      "Mom's Design Build - Landscape & Interior Designers In Minnesota",
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
        url: "https://cdn.sanity.io/images/wavk40jo/production/4b14ddb15bc917daf03fa928df8f5fd6553bfbb6-500x500.webp",
        width: 1200,
        height: 630,
        alt: "Mom's Design Build — Landscape & Interior Design in Minnesota",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
