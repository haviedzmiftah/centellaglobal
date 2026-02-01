const SITE_URL = import.meta.env.SITE || 'http://localhost:4321'

export const prerender = true

export const GET = async () => {
  const sitemapUrl = new URL('sitemap.xml', SITE_URL).toString()

  const body = `User-agent: *
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

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
