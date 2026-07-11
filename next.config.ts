import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is the portfolio hero tier — full-bleed photography; 75 everywhere else
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    // WP's 342 auto-generated /tag/* archives and the /author/* archive are
    // thin-content pages we deliberately don't rebuild (flagged for Jim's SEO
    // sign-off in the handoff, July 9) — permanent-redirect them to the blog
    // so their link equity and any bookmarks land somewhere real.
    return [
      { source: "/tag/:path*", destination: "/blog", permanent: true },
      { source: "/author/:path*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
