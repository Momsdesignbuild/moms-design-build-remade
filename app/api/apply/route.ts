import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Job applications land as Sanity docs (their WP form's replacement) —
// visible in Studio; wire email notification post-launch if wanted.
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const { name, email, phone, position, message, resumeUrl } = await req.json();
    if (!name || typeof name !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email ?? ""))) {
      return NextResponse.json({ ok: false, error: "Name and a valid email are required" }, { status: 400 });
    }
    await client.create({
      _type: "jobApplication",
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      phone: String(phone ?? "").slice(0, 50),
      position: String(position ?? "").slice(0, 200),
      message: String(message ?? "").slice(0, 5000),
      resumeUrl: String(resumeUrl ?? "").slice(0, 500),
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
