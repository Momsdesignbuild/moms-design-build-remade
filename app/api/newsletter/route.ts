import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";

// Newsletter sign-up: every email is saved in Sanity (Studio > Subscribers) AND added
// to the Brevo list "Website newsletter". Either one working is enough for the visitor;
// if one fails it is logged, never shown to them.
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID || 7);

async function saveToSanity(email: string) {
  const id = "subscriber-" + createHash("sha1").update(email).digest("hex");
  await client.createIfNotExists({
    _id: id,
    _type: "subscriber",
    email,
    subscribedAt: new Date().toISOString(),
    source: "blog",
  });
}

async function addToBrevo(email: string) {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error("BREVO_API_KEY is not set");
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ email, listIds: [BREVO_LIST_ID], updateEnabled: true }),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const raw = body?.email;
    if (typeof raw !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(raw)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    const email = raw.toLowerCase().trim();
    const [sanity, brevo] = await Promise.allSettled([saveToSanity(email), addToBrevo(email)]);
    if (sanity.status === "rejected") console.error("newsletter: Sanity save failed", sanity.reason);
    if (brevo.status === "rejected") console.error("newsletter: Brevo add failed", brevo.reason);
    if (sanity.status === "rejected" && brevo.status === "rejected") {
      return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
