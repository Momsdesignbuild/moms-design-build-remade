/**
 * migrate-portfolio-to-sanity.mjs
 * Fetches all 70 portfolio projects from WP REST API, uploads hero images to Sanity CDN,
 * and creates portfolioProject documents in Sanity.
 *
 * Run: SANITY_API_TOKEN=... node scripts/migrate-portfolio-to-sanity.mjs
 * Resume-safe: skips projects that already have a Sanity doc with matching slug.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 'wavk40jo'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN
const WP_API = 'https://momsdesignbuild.com/wp-json/wp/v2'

if (!TOKEN) { console.error('Missing SANITY_API_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

// Fetch all WP portfolio projects (handles pagination)
async function fetchAllPortfolioProjects() {
  let allProjects = []
  let page = 1
  while (true) {
    const url = `${WP_API}/portfolio?per_page=100&page=${page}&_embed=1`
    console.log(`Fetching WP portfolio page ${page}...`)
    const res = await fetch(url)
    if (!res.ok) {
      if (res.status === 400) break // no more pages
      throw new Error(`WP API error: ${res.status} ${url}`)
    }
    const data = await res.json()
    if (!data.length) break
    allProjects = allProjects.concat(data)
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
    if (page >= totalPages) break
    page++
  }
  return allProjects
}

// Extract meta from WP project (Yoast SEO fields)
function extractMeta(wpProject) {
  const yoast = wpProject.yoast_head_json || {}
  const metaTitle = yoast.title || wpProject.title?.rendered || ''
  const metaDescription = yoast.description || ''
  return { metaTitle, metaDescription }
}

// Get featured image URL from embedded data
function getFeaturedImageUrl(wpProject) {
  try {
    const embedded = wpProject._embedded || {}
    const featuredMedia = embedded['wp:featuredmedia']
    if (featuredMedia && featuredMedia[0] && featuredMedia[0].source_url) {
      return featuredMedia[0].source_url
    }
  } catch {}
  return null
}

// Get OG image URL as fallback
function getOgImageUrl(wpProject) {
  try {
    const yoast = wpProject.yoast_head_json || {}
    const ogImages = yoast.og_image
    if (ogImages && ogImages[0] && ogImages[0].url) {
      return ogImages[0].url
    }
  } catch {}
  return null
}

// Download image buffer
async function fetchBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

// Get all existing portfolio slugs in Sanity to avoid duplicates
async function getExistingSlugs() {
  const docs = await client.fetch(`*[_type == "portfolioProject"]{ "slug": slug.current }`)
  return new Set(docs.map(d => d.slug))
}

// Extract gallery images from WP project content/ACF
function extractGalleryFromContent(wpProject) {
  const content = wpProject.content?.rendered || ''
  const imgRe = /src="(https:\/\/momsdesignbuild\.com\/wp-content\/uploads\/[^"]+)"/g
  const urls = []
  let m
  while ((m = imgRe.exec(content)) !== null) {
    const url = m[1]
    // Skip WP size variants
    if (!/\-\d+x\d+\.(jpg|jpeg|png|webp|gif)$/i.test(url)) {
      urls.push(url)
    }
  }
  // Deduplicate
  return [...new Set(urls)].slice(0, 20) // cap at 20 gallery images per project
}

async function main() {
  console.log('Fetching all WP portfolio projects...\n')
  const wpProjects = await fetchAllPortfolioProjects()
  console.log(`Found ${wpProjects.length} projects in WP\n`)

  const existingSlugs = await getExistingSlugs()
  console.log(`Already in Sanity: ${existingSlugs.size} projects\n`)

  let created = 0
  let skipped = 0
  let failed = 0

  for (let i = 0; i < wpProjects.length; i++) {
    const wp = wpProjects[i]
    const slug = wp.slug
    const title = wp.title?.rendered?.replace(/&#8217;/g, "'").replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/&#8211;/g, '–') || slug
    const { metaTitle, metaDescription } = extractMeta(wp)

    process.stdout.write(`[${i + 1}/${wpProjects.length}] ${title}... `)

    if (existingSlugs.has(slug)) {
      skipped++
      console.log('skip (exists)')
      continue
    }

    try {
      // Upload hero image
      const heroUrl = getFeaturedImageUrl(wp) || getOgImageUrl(wp)
      let heroImageAsset = null

      if (heroUrl) {
        const filename = heroUrl.split('/').pop()
        const buf = await fetchBuffer(heroUrl)
        heroImageAsset = await client.assets.upload('image', buf, { filename })
      }

      // Extract gallery images from post content
      const galleryUrls = extractGalleryFromContent(wp)
      const galleryAssets = []
      for (const gUrl of galleryUrls) {
        try {
          const gFilename = gUrl.split('/').pop()
          const gBuf = await fetchBuffer(gUrl)
          const gAsset = await client.assets.upload('image', gBuf, { filename: gFilename })
          galleryAssets.push({
            _type: 'image',
            _key: gAsset._id,
            asset: { _type: 'reference', _ref: gAsset._id }
          })
        } catch {}
      }

      // Build Sanity document
      const doc = {
        _type: 'portfolioProject',
        title,
        slug: { _type: 'slug', current: slug },
        metaTitle: metaTitle || title,
        metaDescription,
        order: i + 1,
        featured: i < 12, // first 12 are featured
      }

      if (heroImageAsset) {
        doc.heroImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: heroImageAsset._id }
        }
      }

      if (galleryAssets.length > 0) {
        doc.gallery = galleryAssets
      }

      await client.create(doc)
      existingSlugs.add(slug)
      created++
      console.log(`✓${galleryAssets.length > 0 ? ` (+${galleryAssets.length} gallery)` : ''}`)
    } catch (err) {
      failed++
      console.log(`✗ ${err.message}`)
    }

    // Small delay to be kind to WP and Sanity
    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\n✅ Done. Created: ${created} | Skipped: ${skipped} | Failed: ${failed}`)
  console.log(`Total in Sanity: ${existingSlugs.size}`)
}

main().catch(err => { console.error(err); process.exit(1) })
