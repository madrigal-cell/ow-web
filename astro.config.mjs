// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Configuración de la web de On White (owmakers.com).
// Sitio 100 % estático: `npm run build` genera HTML puro en `dist/` que se sube a IONOS.
export default defineConfig({
  site: 'https://owmakers.com',
  trailingSlash: 'always',
  build: { format: 'directory' },

  // ES por defecto en la raíz (/), EN bajo /en/.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },

  // Tipografías autoalojadas: Astro las descarga en build y las sirve desde nuestro dominio
  // (sin petición a Google Fonts, mejor Core Web Vitals y sin cookies de terceros).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Anton',
      cssVariable: '--font-display',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Impact', 'Arial Narrow Bold', 'sans-serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Archivo',
      cssVariable: '--font-text',
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
      display: 'swap',
    },
  ],

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en' },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
