#!/usr/bin/env node
// Site numbers for the website chat: GA4 + Search Console + Clarity in one place.
//
//   node scripts/analytics.mjs summary            everything below, last 28 days
//   node scripts/analytics.mjs pages   [--days 28] most-viewed pages (GA4)
//   node scripts/analytics.mjs landing [--days 28] where visitors arrive (GA4)
//   node scripts/analytics.mjs sources [--days 28] where visitors come from (GA4)
//   node scripts/analytics.mjs events  [--days 28] what they do: form sends, clicks (GA4)
//   node scripts/analytics.mjs queries [--days 28] Google searches that showed the site (Search Console)
//   node scripts/analytics.mjs ranking [--days 28] pages by Google clicks / impressions / position (Search Console)
//   node scripts/analytics.mjs clarity            last 3 days of behaviour: rage/dead clicks, scroll, exits
//   node scripts/analytics.mjs trend              GA4 sessions by week, last 12 weeks
//   node scripts/analytics.mjs --json ...         raw rows for your own math
//
// Needs (Codespace secrets): GOOGLE_SERVICE_ACCOUNT_JSON, GA4_PROPERTY_ID, CLARITY_API_TOKEN.
// No dependencies: Node's crypto signs the Google JWT; fetch does the rest.
import { createSign } from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const args = process.argv.slice(2)
const JSON_OUT = args.includes("--json")
const daysArg = args.indexOf("--days")
const DAYS = daysArg > -1 ? Number(args[daysArg + 1]) : 28
const report = args.find((a) => !a.startsWith("--") && a !== String(DAYS)) ?? "summary"

const need = (name) => {
  const v = process.env[name]
  if (!v) {
    console.error(`Missing ${name}. It's a Codespace secret: Settings → Secrets and variables → Codespaces on the repo. Rebuild the Codespace after adding it.`)
    process.exit(1)
  }
  return v
}

// ---------- Google (service account → access token, cached for the hour) ----------
let googleToken
async function google() {
  if (googleToken) return googleToken
  const sa = JSON.parse(need("GOOGLE_SERVICE_ACCOUNT_JSON"))
  const now = Math.floor(Date.now() / 1000)
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url")
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`
  const sig = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url")
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
  })
  if (!res.ok) throw new Error(`Google sign-in failed: ${res.status} ${await res.text()}`)
  googleToken = (await res.json()).access_token
  return googleToken
}

async function gapi(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${await google()}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${url.split("/")[2]}: ${res.status} ${await res.text()}`)
  return res.json()
}

// ---------- GA4 ----------
async function ga4(dimensions, metrics, { limit = 25, orderBy = metrics[0], filter } = {}) {
  const r = await gapi(`https://analyticsdata.googleapis.com/v1beta/properties/${need("GA4_PROPERTY_ID")}:runReport`, {
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: "today" }],
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
    orderBys: [{ metric: { metricName: orderBy }, desc: true }],
    limit,
    ...(filter && { dimensionFilter: filter }),
  })
  return (r.rows ?? []).map((row) => {
    const o = {}
    dimensions.forEach((d, i) => (o[d] = row.dimensionValues[i].value))
    metrics.forEach((m, i) => (o[m] = Number(row.metricValues[i].value)))
    return o
  })
}

// ---------- Search Console ----------
async function gsc(dimension, limit = 25) {
  const end = new Date()
  end.setDate(end.getDate() - 2) // Search Console lags ~2 days
  const start = new Date(end)
  start.setDate(start.getDate() - DAYS)
  const r = await gapi("https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain:momsdesignbuild.com/searchAnalytics/query", {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    dimensions: [dimension],
    rowLimit: limit,
  })
  return (r.rows ?? []).map((row) => ({
    [dimension]: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: Math.round(row.ctr * 1000) / 10,
    position: Math.round(row.position * 10) / 10,
  }))
}

// ---------- Clarity (10 calls/day per project → one call, cached for the day) ----------
async function clarity() {
  const cacheDir = path.join(path.dirname(new URL(import.meta.url).pathname), ".cache")
  const file = path.join(cacheDir, `clarity-${new Date().toISOString().slice(0, 10)}.json`)
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf8"))
  const res = await fetch("https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3&dimension1=URL", {
    headers: { authorization: `Bearer ${need("CLARITY_API_TOKEN")}` },
  })
  if (!res.ok) throw new Error(`Clarity: ${res.status} ${await res.text()}`)
  const data = await res.json()
  fs.mkdirSync(cacheDir, { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data))
  return data
}

// Clarity returns [{metricName, information:[{..., Url}]}] (shape seen 2026-10-07).
// Each metric becomes a table: the page, then its numbers, biggest first, 15 rows.
// For the click metrics only the count matters; the percentage columns are dropped.
const CLARITY_SKIP = new Set(["sessionsWithMetricPercentage", "sessionsWithoutMetricPercentage", "pagesViews"])
function clarityRows(data) {
  const out = {}
  for (const { metricName, information = [] } of data) {
    const rows = information
      .map((r) => {
        const o = { page: (r.Url ?? "(all)").replace("https://momsdesignbuild.com", "") || "/" }
        for (const [k, v] of Object.entries(r)) if (k !== "Url" && !CLARITY_SKIP.has(k) && !isNaN(Number(v))) o[k] = Math.round(Number(v) * 10) / 10
        return o
      })
      .sort((a, b) => (b.subTotal ?? Object.values(b)[1] ?? 0) - (a.subTotal ?? Object.values(a)[1] ?? 0))
      .slice(0, 15)
    out[metricName] = rows
  }
  return out
}

// ---------- output ----------
function table(title, rows) {
  if (JSON_OUT) return console.log(JSON.stringify({ [title]: rows }))
  console.log(`\n== ${title}${title.includes("days") ? "" : ` (last ${DAYS} days)`} ==`)
  if (!rows.length) return console.log("  no data yet")
  const cols = Object.keys(rows[0])
  const w = cols.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c]).length)))
  const line = (r) => cols.map((c, i) => String(r[c]).padEnd(Math.min(w[i], 70))).join("  ")
  console.log("  " + line(Object.fromEntries(cols.map((c) => [c, c]))))
  for (const r of rows) console.log("  " + line(r))
}

const REPORTS = {
  pages: async () => table("Most viewed pages", await ga4(["pagePath"], ["screenPageViews", "activeUsers", "averageSessionDuration"])),
  landing: async () => table("Landing pages", await ga4(["landingPage"], ["sessions", "activeUsers", "keyEvents"])),
  sources: async () => table("Traffic sources", await ga4(["sessionSource", "sessionMedium"], ["sessions", "activeUsers", "keyEvents"])),
  events: async () => table("Events", await ga4(["eventName"], ["eventCount", "activeUsers"])),
  queries: async () => table("Google searches", await gsc("query")),
  ranking: async () => table("Pages in Google", await gsc("page")),
  trend: async () => {
    const rows = await ga4(["week"], ["sessions", "activeUsers", "keyEvents"], { limit: 60 })
    table("Sessions by week (ISO week number)", rows.sort((a, b) => a.week.localeCompare(b.week)))
  },
  clarity: async () => {
    const c = clarityRows(await clarity())
    if (JSON_OUT) return console.log(JSON.stringify(c))
    for (const [k, rows] of Object.entries(c)) table(`Clarity ${k}, last 3 days, by URL`, rows)
  },
  summary: async () => {
    for (const r of ["sources", "landing", "pages", "queries", "ranking", "events"]) await REPORTS[r]()
    try {
      await REPORTS.clarity()
    } catch (e) {
      console.log(`\n(Clarity skipped: ${e.message.slice(0, 120)})`)
    }
  },
}

if (!REPORTS[report]) {
  console.error(`Unknown report "${report}". One of: ${Object.keys(REPORTS).join(", ")}`)
  process.exit(1)
}
await REPORTS[report]()
