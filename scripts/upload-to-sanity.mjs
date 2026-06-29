/**
 * upload-to-sanity.mjs
 * Downloads all WP image URLs from the remade codebase and uploads to Sanity CDN.
 * Outputs a URL mapping and optionally rewrites the source files.
 */

import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { createReadStream } from 'fs'

const PROJECT_ID = 'wavk40jo'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const REPO_DIR = new URL('..', import.meta.url).pathname
const WP_BASE = 'https://momsdesignbuild.com'

// Collect all .tsx/.ts files recursively (skip node_modules, .next)
function collectFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry)) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      collectFiles(full, files)
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      files.push(full)
    }
  }
  return files
}

// Extract unique WP upload URLs from source files
function extractWpUrls(files) {
  const urls = new Set()
  const WP_RE = /https:\/\/momsdesignbuild\.com\/wp-content\/uploads\/[^\s"'\\)]+/g
  for (const f of files) {
    const content = readFileSync(f, 'utf8')
    for (const match of content.matchAll(WP_RE)) {
      urls.add(match[0])
    }
  }
  return [...urls]
}

// Download image buffer from URL
async function fetchBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

// Determine asset type
function assetType(url) {
  const ext = extname(url.split('?')[0]).toLowerCase()
  return ['.mp4', '.mov', '.webm', '.avi'].includes(ext) ? 'file' : 'image'
}

async function main() {
  const files = collectFiles(REPO_DIR)
  const wpUrls = extractWpUrls(files)
  console.log(`Found ${wpUrls.length} unique WP URLs across ${files.length} source files\n`)

  const mapping = {} // wpUrl -> sanity CDN url
  let uploaded = 0
  let failed = 0

  for (const url of wpUrls) {
    const filename = url.split('/').pop()
    process.stdout.write(`Uploading ${filename}... `)
    try {
      const buf = await fetchBuffer(url)
      const type = assetType(url)
      const asset = await client.assets.upload(type, buf, { filename })
      const cdnUrl = type === 'image'
        ? `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${asset._id.replace('image-', '').replace(/-([a-z]+)$/, '.$1')}`
        : asset.url
      mapping[url] = cdnUrl
      uploaded++
      console.log(`✓ ${cdnUrl.split('/').pop()}`)
    } catch (err) {
      failed++
      console.log(`✗ ${err.message}`)
      mapping[url] = null
    }
  }

  // Save mapping
  const mapPath = join(REPO_DIR, 'scripts', 'sanity-url-map.json')
  writeFileSync(mapPath, JSON.stringify(mapping, null, 2))
  console.log(`\nMapping saved to scripts/sanity-url-map.json`)
  console.log(`Uploaded: ${uploaded} | Failed: ${failed}`)

  // Rewrite source files
  if (uploaded > 0) {
    console.log('\nRewriting source files...')
    let replacements = 0
    for (const f of files) {
      let content = readFileSync(f, 'utf8')
      let changed = false
      for (const [wpUrl, cdnUrl] of Object.entries(mapping)) {
        if (cdnUrl && content.includes(wpUrl)) {
          content = content.replaceAll(wpUrl, cdnUrl)
          changed = true
          replacements++
        }
      }
      if (changed) {
        writeFileSync(f, content)
        console.log(`  Updated: ${f.replace(REPO_DIR, '')}`)
      }
    }
    console.log(`\nDone. ${replacements} URL replacements across source files.`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
