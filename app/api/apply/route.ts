import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import {
  REFERENCE_FIELDS,
  REQUIRED,
  RESUME_EXTENSIONS,
  RESUME_MAX_BYTES,
  SKILLS,
  TEXT_FIELDS,
  YES_NO,
} from "@/components/careers/applicationFields";

// Job applications land as Sanity docs (their WP form's replacement) —
// visible in Studio; wire email notification post-launch if wanted.
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const bad = (error: string) => NextResponse.json({ ok: false, error }, { status: 400 });

export async function POST(req: Request) {
  try {
    const f = await req.formData();
    const text = (k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

    // bots fill every input; people never see this one
    if (text("website", 10)) return NextResponse.json({ ok: true });

    const doc: Record<string, unknown> = {};
    for (const [name, , max] of TEXT_FIELDS) doc[name] = text(name, max);
    for (const name of REQUIRED) if (!doc[name]) return bad("Please fill in every required field");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(doc.email))) return bad("A valid email is required");

    for (const [name] of YES_NO) {
      const v = text(name, 3);
      if (v === "Yes" || v === "No") doc[name] = v;
    }
    for (const [name, , choices] of SKILLS) {
      const allowed: readonly string[] = choices;
      doc[name] = f.getAll(name).map(String).filter((v) => allowed.includes(v));
    }
    doc.references = [1, 2, 3]
      .map((n) => Object.fromEntries(REFERENCE_FIELDS.map(([k]) => [k, text(`ref${n}_${k}`, 200)])))
      .filter((r) => Object.values(r).some(Boolean))
      .map((r, i) => ({ _key: `ref${i + 1}`, ...r }));

    const resume = f.get("resume");
    if (!(resume instanceof File) || resume.size === 0) return bad("Please upload your resume");
    const ext = resume.name.split(".").pop()?.toLowerCase() ?? "";
    if (!RESUME_EXTENSIONS.includes(ext)) return bad("Resume must be a PDF, Word document or photo");
    if (resume.size > RESUME_MAX_BYTES) return bad("Resume must be under 4 MB");
    const asset = await client.assets.upload("file", Buffer.from(await resume.arrayBuffer()), {
      filename: resume.name.slice(0, 200),
      contentType: resume.type || undefined,
    });

    await client.create({
      _type: "jobApplication",
      ...doc,
      name: `${doc.firstName} ${doc.lastName}`,
      resume: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
