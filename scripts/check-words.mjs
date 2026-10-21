// Words and photos live in Sanity, never in the code (Josh, 2026-10-19).
// Looks at the lines a change ADDS under app/ and components/ and stops it if they
// carry visible sentences or photo links. Run by scripts/publish.sh and by the
// "words-in-sanity" GitHub check on every pull request.
//   node scripts/check-words.mjs [base]        base defaults to origin/main
//   node scripts/check-words.mjs --range <a>..<b>   (try it on old commits)
// A short UI label that really belongs in code ("Search", "Close") is fine: under
// 4 words it is never flagged. To allow a longer line on purpose, end it with
// the comment  // ui-label: <why>  (or {/* ui-label: why */} in JSX).
import { execFileSync } from 'node:child_process'

const arg = process.argv[2]
const range = arg === '--range' ? process.argv[3] : `${arg || 'origin/main'}...HEAD`
const diff = execFileSync('git', ['diff', '-U0', '--no-color', range, '--', 'app', 'components', ':!**/jsonld.ts', ':!**/jsonld.tsx'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })

const wordsOf = (s) => (s.match(/[A-Za-z’'’][A-Za-z’'’-]*/g) || []).filter((w) => w.length > 1 || /^[aAI]$/.test(w))
// "px-6 py-3 md:grid-cols-2" and friends: a Tailwind class list, not a sentence
const looksLikeClasses = (s) => s.split(/\s+/).every((t) => /^[a-z0-9:/\[\].%#_!()-]+$/.test(t) && /[-:\[\]]|^(flex|grid|block|hidden|relative|absolute|italic|uppercase|container)$/.test(t))
const IMG = /cdn\.sanity\.io\/images\/|\/images\/[^"'`\s]+\.(?:jpe?g|png|webp|avif|gif|svg)|https?:\/\/[^"'`\s]+\.(?:jpe?g|png|webp|avif)\b/i

// line numbers that sit inside a /* ... */ comment (JSX {/* */} too), per file, read at HEAD
const commentLines = {}
function inComment(f, n) {
  if (!commentLines[f]) {
    const set = new Set()
    try {
      const src = execFileSync('git', ['show', `HEAD:${f}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
      for (const m of src.matchAll(/\/\*[\s\S]*?\*\//g)) {
        const a = src.slice(0, m.index).split('\n').length
        const b = a + m[0].split('\n').length - 1
        for (let i = a; i <= b; i++) set.add(i)
      }
    } catch {}
    commentLines[f] = set
  }
  return commentLines[f].has(n)
}

const hits = []
let file = ''
let line = 0
for (const l of diff.split('\n')) {
  if (l.startsWith('+++ ')) { file = l.slice(6); continue }
  const h = l.match(/^@@ -\S+ \+(\d+)/)
  if (h) { line = +h[1] - 1; continue }
  if (!l.startsWith('+') || l.startsWith('+++')) continue
  line++
  const text = l.slice(1)
  const t = text.trim()
  if (!t || /ui-label/.test(t) || file.startsWith('app/api/') || inComment(file, line)) continue // API routes never show words to visitors
  if (/^(\/\/|\/\*|\*|\{\/\*|import |export type|type )/.test(t)) continue // comments, imports, types
  if (IMG.test(t) && !/^import /.test(t)) { hits.push({ file, line, why: 'a photo link', text: t }); continue }
  // sentences inside quotes: 4+ real words, not a class list, not a URL or path
  for (const m of t.matchAll(/(["'`])((?:\\.|(?!\1).)+)\1/g)) {
    const s = m[2]
    const before = t.slice(0, m.index)
    if (/(?:Error|console\.\w+)\(\s*$/.test(before)) continue // error + log messages are for us, not visitors
    if (/class(?:Name)?=\{?\s*(?:\w+\()?$/.test(before) || /\b(?:cn|clsx|twMerge)\($/.test(before)) continue // styling
    if (/^(https?:|\/|#|mailto:|tel:)/.test(s) || looksLikeClasses(s) || /\$\{/.test(s) || /\*\[_type|\bquery\b/.test(s + before)) continue
    if (wordsOf(s).length >= 4 && /\s/.test(s)) { hits.push({ file, line, why: 'words in quotes', text: t }); break }
  }
  // sentences sitting as plain JSX text: a line with no tag/brace/operator, 4+ words
  if (!/[<>{}=;()\[\]]/.test(t.replace(/&\w+;/g, '')) && wordsOf(t).length >= 4 && !/^\w+:/.test(t)) hits.push({ file, line, why: 'words on the page', text: t })
  // text between tags on one line: <p>Some words here</p>
  for (const m of t.matchAll(/>([^<>{}]+)</g)) if (wordsOf(m[1]).length >= 4) { hits.push({ file, line, why: 'words on the page', text: t }); break }
}

const seen = new Set()
const uniq = hits.filter((x) => { const k = x.file + ':' + x.line; if (seen.has(k)) return false; seen.add(k); return true })
if (!uniq.length) { console.log('words check: ok, no words or photos added to the code'); process.exit(0) }

console.error('\nThis change puts words or photos into the code, but they have to live in Sanity so the Studio and the site never disagree:\n')
for (const x of uniq.slice(0, 12)) console.error(`  ${x.file}:${x.line}  (${x.why})\n    ${x.text.slice(0, 140)}`)
if (uniq.length > 12) console.error(`  ...and ${uniq.length - 12} more`)
console.error(`
What to do: move the words/photos into a Sanity field (a page's "Page text" document or its own document),
give the code a place to read it, and leave the starting text in sanity/copy/defaults.ts.
A short label that truly belongs in code can stay: end its line with  // ui-label: <why>
`)
process.exit(1)
