import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity publish webhook (go-live checklist). Content is currently on a
 * 1-hour ISR fallback (export const revalidate = 3600 on every Sanity-driven
 * page) — this makes edits appear within seconds instead, without a
 * redeploy. One document changing busts everything under the root layout
 * rather than a per-_type path map: simpler, and a missed case in a manual
 * map means silently stale content nobody notices for up to an hour anyway.
 *
 * Setup in Sanity's dashboard (manage.sanity.io → project → API → Webhooks):
 *   URL: https://momsdesignbuild.com/api/revalidate
 *   Dataset: production · Trigger: Create / Update / Delete
 *   Secret: same value as SANITY_REVALIDATE_SECRET in Vercel env
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Bad request — no _type in payload" }, { status: 400 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, now: Date.now(), type: body._type });
  } catch (err) {
    console.error("[revalidate] error", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
