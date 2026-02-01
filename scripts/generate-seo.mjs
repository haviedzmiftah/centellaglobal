import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import config from '../astro.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const publicDir = path.join(rootDir, 'public')

const siteUrl = new URL(config.site ?? 'http://localhost:4321/')
const sitemapUrl = new URL('sitemap.xml', siteUrl).toString()
const lastmod = new Date().toISOString().split('T')[0]

const robots = `User-agent: *
Allow: /
Sitemap: ${sitemapUrl}

User-agent: CCBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Omgilibot
Disallow: /

User-Agent: FacebookBot
Disallow: /

User-agent: Amazonbot
Disallow: /
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl.toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8')
writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
