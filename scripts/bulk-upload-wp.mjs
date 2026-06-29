/**
 * bulk-upload-wp.mjs
 * Extracts all original images/videos from mdb-export.zip and uploads to Sanity CDN.
 * Skips WP size variants (-NNNxNNN), skips already-uploaded files via progress log.
 * Saves mapping to scripts/wp-to-sanity-map.json
 */

import { createClient } from '@sanity/client'
import { createWriteStream, existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, extname, basename } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const PROJECT_ID = 'wavk40jo'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN
const ZIP = process.env.HOME + '/Desktop/mdb-export.zip'
const EXTRACT_DIR = '/tmp/mdb-wp-uploads'
const MAP_FILE = new URL('.', import.meta.url).pathname + 'wp-to-sanity-map.json'
const PROGRESS_FILE = new URL('.', import.meta.url).pathname + 'bulk-upload-progress.json'

if (!TOKEN) { console.error('Missing SANITY_API_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

// Load existing progress
let mapping = existsSync(MAP_FILE) ? JSON.parse(readFileSync(MAP_FILE, 'utf8')) : {}
let progress = existsSync(PROGRESS_FILE) ? JSON.parse(readFileSync(PROGRESS_FILE, 'utf8')) : { done: [] }

function saveState() {
  writeFileSync(MAP_FILE, JSON.stringify(mapping, null, 2))
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

function isOriginal(filename) {
  // Filter out WP size variants like -300x200.jpg, -1024x683.png
  return !/\-\d+x\d+\.(jpg|jpeg|png|webp|gif|svg)$/i.test(filename)
}

function assetType(filename) {
  const ext = extname(filename).toLowerCase()
  return ['.mp4', '.mov', '.webm', '.avi', '.m4v'].includes(ext) ? 'file' : 'image'
}

async function main() {
  // Extract only wp-content/uploads from zip if not done yet
  if (!existsSync(EXTRACT_DIR)) {
    console.log('Extracting wp-content/uploads from zip...')
    mkdirSync(EXTRACT_DIR, { recursive: true })
    await execAsync(`unzip -q -o "${ZIP}" "wp-content/uploads/*" -d "${EXTRACT_DIR}"`, { maxBuffer: 100 * 1024 * 1024 })
    console.log('Extraction complete.\n')
  }

  // Get list of all upload files
  const { stdout } = await execAsync(
    `find "${EXTRACT_DIR}/wp-content/uploads" -type f \\( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" -o -iname "*.svg" -o -iname "*.mp4" -o -iname "*.mov" \\)`,
    { maxBuffer: 50 * 1024 * 1024 }
  )

  const allFiles = stdout.trim().split('\n').filter(Boolean)
  const originals = allFiles.filter(f => isOriginal(basename(f)))

  console.log(`Total files: ${allFiles.length} | Originals: ${originals.length} | Already uploaded: ${progress.done.length}`)

  const todo = originals.filter(f => !progress.done.includes(f))
  console.log(`Remaining: ${todo.length}\n`)

  let uploaded = 0
  let failed = 0
  let skipped = progress.done.length

  for (const filePath of todo) {
    const filename = basename(filePath)
    // Build the WP URL key: extract YYYY/MM/filename from path
    const match = filePath.match(/wp-content\/uploads\/(\d{4}\/\d{2}\/.+)$/)
    const wpPath = match ? match[1] : filename
    const wpUrl = `https://momsdesignbuild.com/wp-content/uploads/${wpPath}`

    process.stdout.write(`[${uploaded + skipped + 1}/${originals.length}] ${filename}... `)
    try {
      const { createReadStream } = await import('fs')
      const type = assetType(filename)
      const asset = await client.assets.upload(type, createReadStream(filePath), { filename })
      const cdnUrl = type === 'image'
        ? `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${asset._id.replace('image-', '').replace(/-([a-z]+)$/, '.$1')}`
        : asset.url
      mapping[wpUrl] = cdnUrl
      progress.done.push(filePath)
      uploaded++
      console.log(`✓`)
      if (uploaded % 25 === 0) saveState()
    } catch (err) {
      failed++
      console.log(`✗ ${err.message}`)
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 50))
  }

  saveState()
  console.log(`\n✅ Done. Uploaded: ${uploaded} | Failed: ${failed} | Total in map: ${Object.keys(mapping).length}`)
  console.log(`Map: ${MAP_FILE}`)
}

main().catch(err => { console.error(err); process.exit(1) })
