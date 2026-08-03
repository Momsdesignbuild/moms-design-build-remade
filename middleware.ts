import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Host-based indexability: only the real domain may be indexed. Any other
// host serving this app (vercel.app prod/preview URLs, future test domains)
// gets a response-header noindex on every page, permanently — no SITE_LIVE
// env flip to remember on launch day, and no way for a staging URL to leak
// into Google. localhost is left alone for dev.
const INDEXABLE_HOSTS = new Set([
  "momsdesignbuild.com",
  "www.momsdesignbuild.com",
  "localhost",
]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!INDEXABLE_HOSTS.has(request.nextUrl.hostname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}
