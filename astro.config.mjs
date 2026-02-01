import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

// default: development (local)
const config = {
  site: 'http://localhost:4321',
  base: '/',
  outDir: 'dist',
}

// environment switch
const env = process.env.NODE_ENV

switch (env) {
  case 'pages':
    // GitHub Pages
    config.site = 'https://hafidmiftah.my.id/centellaglobal/'
    config.base = '/centellaglobal/'
    break

  case 'production':
    // Custom domain (future)
    config.site = 'https://centella-global.com'
    config.base = '/'
    break

  default:
    // development
    break
}

export default defineConfig({
  site: config.site,
  base: config.base,
  outDir: config.outDir,
  // Security settings
  vite: {
    define: {
      __DEV__: false,
    },
    server: {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  // Output format
  output: 'static',
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
})
