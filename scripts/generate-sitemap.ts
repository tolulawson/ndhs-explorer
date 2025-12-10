import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Sitemap always uses production URL
function getBaseUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}

const BASE_URL = getBaseUrl()

const chaptersDir = path.resolve(__dirname, '../src/data/chapters')
const publicDir = path.resolve(__dirname, '../public')

async function generateSitemap() {
  console.log('Generating sitemap...')

  // Get all chapter IDs
  const chapters = fs.readdirSync(chaptersDir)
    .filter(file => fs.statSync(path.join(chaptersDir, file)).isDirectory())
    .map(id => parseInt(id))
    .sort((a, b) => a - b)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${chapters.map(id => `
  <url>
    <loc>${BASE_URL}/chapter/${id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  console.log(`Sitemap generated with ${chapters.length + 1} URLs`)
}

generateSitemap()

