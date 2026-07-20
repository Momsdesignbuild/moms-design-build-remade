import { NextRequest, NextResponse } from "next/server";
import bigMap from "@/scripts/wp-to-sanity-map.json";
import smallMap from "@/scripts/sanity-url-map.json";

// Every page's JSON-LD is a byte-for-byte carbon copy of WP's own Yoast
// schema (go-live checklist item), which means it permanently embeds
// absolute /wp-content/uploads/... image URLs on THIS domain. Once DNS
// points here those requests hit this app directly — this route 301s them
// to the real Sanity-hosted asset instead of 404ing, for crawlers/social
// unfurlers following schema image URLs and any old hotlinks/bookmarks.
// smallMap (team headshots) has 28 entries bigMap doesn't — verified 7/20.
const REDIRECT_MAP: Record<string, string> = { ...bigMap, ...smallMap };

export async function GET(request: NextRequest) {
  const url = `https://momsdesignbuild.com${request.nextUrl.pathname}`;
  const target = REDIRECT_MAP[url];
  if (target) {
    return NextResponse.redirect(target, 301);
  }
  return new NextResponse("Not found", { status: 404 });
}
