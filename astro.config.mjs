import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

// default (local dev)
const build = {
  base: '/',
  outDir: 'dist',
  site: 'http://localhost:4321',
}

// ENV
const env = process.env.NODE_ENV

switch (env) {
  case 'pages':
    build.base = '/centellaglobal/'
    build.site = 'https://haviedzmiftah.github.io'
    break

  case 'production':
    build.base = '/'
    build.site = 'https://centella-global.com'
    break

  default:
    // development
    break
}

export default defineConfig({
  site: build.site,
  base: build.base,
  outDir: build.outDir,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
