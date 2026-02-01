# PT Centella Global Corp — Website (Astro)

Website perusahaan PT Centella Global Corp berbasis Astro + Tailwind CSS dengan dukungan multibahasa.

## Kredit & Asal Template

Proyek ini berasal dari template **astro-landing-page** oleh **ttntm** dan telah dimodifikasi secara signifikan.

- Template asli: https://github.com/ttntm/astro-landing-page
- Port dari: https://github.com/ttntm/11ty-landing-page dan https://github.com/ttntm/hugo-landing-page


## Ringkasan Fitur

- Multibahasa: ID / EN / TR
- Konten Markdown untuk About & Contact
- Data fitur dari JSON
- SEO otomatis (robots.txt & sitemap.xml mengikuti domain)
- Security headers dasar
- Build statis untuk GitHub Pages

## Prasyarat

- Node.js LTS (v18+ disarankan)
- npm

## Instalasi

1. Clone repository
2. Jalankan:
   - `npm install`

## Menjalankan Lokal

- Dev:
  - `npm run dev`
- Preview build:
  - `npm run build`
  - `npm run preview`

## Struktur Proyek (Inti)

- [src/pages/index.astro](src/pages/index.astro) — Halaman utama
- [src/components/sections/](src/components/sections/) — Section UI
- [src/content/sections/](src/content/sections/) — Konten Markdown multibahasa
- [src/data/features.json](src/data/features.json) — Data fitur multibahasa
- [src/components/JS.astro](src/components/JS.astro) — Logika switching bahasa & fetch konten
- [scripts/generate-seo.mjs](scripts/generate-seo.mjs) — Generate robots.txt & sitemap.xml otomatis

## Konten & Bahasa

### Markdown
- About:
  - [src/content/sections/about.md](src/content/sections/about.md)
  - [src/content/sections/about.id.md](src/content/sections/about.id.md)
  - [src/content/sections/about.tr.md](src/content/sections/about.tr.md)
- Contact:
  - [src/content/sections/contact.md](src/content/sections/contact.md)
  - [src/content/sections/contact.id.md](src/content/sections/contact.id.md)
  - [src/content/sections/contact.tr.md](src/content/sections/contact.tr.md)

### Features JSON
- [src/data/features.json](src/data/features.json)
  - Key bahasa: `en`, `id`, `tr`

### Bahasa Default
- [src/data/site.json](src/data/site.json) → `language`

## SEO (Otomatis Ikut Domain)

- `robots.txt` dan `sitemap.xml` digenerate otomatis saat build.
- Domain sumbernya dari `site` di [astro.config.mjs](astro.config.mjs).

Script:
- `npm run generate-seo`
- Sudah dijalankan otomatis saat `npm run build` dan `npm run build-ghp`.

## Build & Deploy

### Production (custom domain)
- Set `site` di [astro.config.mjs](astro.config.mjs) pada `production`.
- Jalankan:
  - `npm run build`

### GitHub Pages
- Set `NODE_ENV=pages` (sudah di script)
- Jalankan:
  - `npm run build-ghp`

## Keamanan

- API menggunakan whitelist validation
- Proteksi path traversal
- Security headers dasar di [public/_headers](public/_headers)

## Catatan

- Asset logo: [public/centella.jpeg](public/centella.jpeg)
- Favicon: [public/img/favicon.svg](public/img/favicon.svg)

## Lisensi

Mengikuti lisensi proyek asli (MIT).
