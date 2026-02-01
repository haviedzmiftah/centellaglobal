export const prerender = true

const formatDate = (date: Date) => date.toISOString().split('T')[0]

export const GET = () => {
  const siteUrl = Astro.site ? new URL(Astro.site) : new URL('http://localhost:4321')
  const lastmod = formatDate(new Date())

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl.toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
