import wpRedirects from "./wp-redirects.json";
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
    // Every redirect from live WordPress's Redirection plugin (export 2026-10-06, 251 rules):
    // wp-redirects.json, minus the 16 already listed below, one junk rule and one duplicate.
    // 19 pointed at pages dead on live too; those go to the nearest real page (see the PR).
    const fromWordPress = wpRedirects.map((r) => ({ source: r.source, destination: r.destination, permanent: true }));
    // WP's 342 auto-generated /tag/* archives and the /author/* archive are
    // thin-content pages we deliberately don't rebuild (flagged for Jim's SEO
    // sign-off in the handoff, July 9) — permanent-redirect them to the blog
    // so their link equity and any bookmarks land somewhere real.
    return [
      ...fromWordPress,
      { source: "/tag/:path*", destination: "/blog", permanent: true },
      { source: "/author/:path*", destination: "/blog", permanent: true },
      // old (Squarespace-era) addresses live WordPress's Redirection plugin sends on — found by crawling 10/5.
      // The full list lives in WP admin → Tools → Redirection; export it before the DNS flip.
      { source: "/blog/pickingoutfixtures/", destination: "/pro-spotlight-picking-the-right-fixtures-and-finishes-for-your-new-kitchen/", permanent: true },
      { source: "/blog/cambria/", destination: "/design-product-we-cant-get-enough-of-cambria-natural-stone/", permanent: true },
      { source: "/blog/5-landscaping-trends-to-watch-for-in-2020/", destination: "/the-year-of-the-simplicity-5-landscaping-trends-to-watch-for-in-2020/", permanent: true },
      { source: "/becca-bastyr/", destination: "/team/becca-bastyr/", permanent: true },
      { source: "/heather-sweeney/", destination: "/team/heather-sweeney/", permanent: true },
      { source: "/jim-sweeney/", destination: "/team/jim-sweeney/", permanent: true },
      { source: "/craig-weckman/", destination: "/team/craig-weckman/", permanent: true },
      { source: "/blog/bee-garden/", destination: "/5-tips-for-a-buzz-worthy-garden-for-minnesota-bees/", permanent: true },
      { source: "/blog/2020/3/30/does-my-home-need-a-refresh-or-a-full-renovation/", destination: "/does-my-home-need-a-refresh-or-a-full-renovation/", permanent: true },
      { source: "/blog/2020/2/27/garden-planning-creating-a-garden-that-fits-your-lifestyle-amp-personality/", destination: "/garden-planning-creating-a-garden-that-fits-your-lifestyle-personality/", permanent: true },
      { source: "/portfolio/lakeside-luxury/", destination: "/portfolio/", permanent: true },
      { source: "/blog/2017/11/30/moms-extends-nari-coty-award-winning-streak/", destination: "/moms-extends-nari-coty-award-winning-streak/", permanent: true },
      { source: "/blog/2018/2/2/moms-scores-most-2018-nari-regional-contractor-of-the-year-awards/", destination: "/moms-scores-most-2018-nari-regional-contractor-of-the-year-awards/", permanent: true },
      { source: "/beachside-haven/", destination: "/portfolio/beachside-haven/", permanent: true },
      { source: "/blog/basement-mancave/", destination: "/the-basement-you-wished-you-owned/", permanent: true },
      { source: "/blog/springcurbappeal/", destination: "/turn-your-home-into-the-envy-of-your-neighborhood/", permanent: true },

    ];
  },
};

export default nextConfig;
