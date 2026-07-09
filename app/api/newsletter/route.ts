import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";

// Newsletter capture — their WP site has NO signup at all; ours stores
// subscribers as Sanity docs (visible to Summer in Studio). Swap in
// Mailchimp/etc. post-launch without changing the form.
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    const id = "subscriber-" + createHash("sha1").update(email.toLowerCase().trim()).digest("hex");
    await client.createIfNotExists({
      _id: id,
      _type: "subscriber",
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString(),
      source: "blog",
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
