// Run: node --experimental-strip-types scripts/test-wp-image-redirect.mts  (from the repo root)
import fs from "node:fs"
import assert from "node:assert/strict"
// @ts-expect-error node needs the .ts extension here; tsconfig has allowImportingTsExtensions off
import { resolveWpImage } from "./wp-image-redirect.ts"

const big = JSON.parse(fs.readFileSync(new URL("./wp-to-sanity-map.json", import.meta.url), "utf8"))
const small = JSON.parse(fs.readFileSync(new URL("./sanity-url-map.json", import.meta.url), "utf8"))
const map: Record<string, string> = { ...big, ...small }
const O = "https://momsdesignbuild.com"

const originals = Object.keys(map).filter((k) => !/-\d{2,4}x\d{2,4}\.[A-Za-z0-9]+$/.test(k) && !/-scaled\./.test(k)).slice(0, 400)
let checked = 0
for (const key of originals) {
  const p = key.slice(O.length)
  assert.equal(resolveWpImage(p, map), map[key], "original must still redirect exactly: " + p)
  const v = p.replace(/(\.[A-Za-z0-9]+)$/, "-1024x683$1")
  const got = resolveWpImage(v, map)
  // a resized address that is ITSELF a mapped file keeps its own target; otherwise it resolves to the original, sized
  if (map[O + v]) assert.equal(got, map[O + v], "an exactly-mapped variant keeps its own target: " + v)
  else assert.ok(got && got.startsWith(map[key]) && /[?&]w=1024&auto=format$/.test(got), "variant must resolve to its original with width: " + v)
  const s = p.replace(/(\.[A-Za-z0-9]+)$/, "-scaled$1")
  if (!map[O + s]) assert.equal(resolveWpImage(s, map), map[key], "-scaled must resolve to the original: " + s)
  checked++
}
assert.equal(resolveWpImage("/wp-content/uploads/2099/01/not-a-real-file-300x200.jpg", map), null, "unknown files stay 404")
assert.equal(resolveWpImage("/wp-content/uploads/2099/01/not-a-real-file.jpg", map), null, "unknown originals stay 404")
console.log(`ok: ${checked} originals, each with a -1024x683 and -scaled variant; unknown files still return null`)
