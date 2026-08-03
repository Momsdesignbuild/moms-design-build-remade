import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Their WP serves every URL with a trailing slash and that's what Google
  // has indexed (and what every carbon-copied canonical already says). Serve
  // the same shape so launch swaps content under the exact known URLs instead
  // of 308ing all ~700 of them. (Added 8/3 pre-launch; full sweep re-run after.)
  trailingSlash: true,
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
