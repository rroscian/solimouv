import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null, // Gestion manuelle
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true
      },
      includeAssets: ['pwa-192x192.png', 'pwa-512x512.png', 'logo.png', 'vite.svg'],
      manifest: {
        name: 'Solimouv\' - Festival du Sport pour Tous',
        short_name: 'Solimouv\'',
        description: 'Festival du sport inclusif organisé par Up Sport! Paris',
        theme_color: '#2E7D32',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['sports', 'lifestyle', 'social'],
        lang: 'fr-FR',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  }
})
