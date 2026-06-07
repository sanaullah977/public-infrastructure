import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
  build: {
    // Increase the limit to suppress warnings for remaining larger chunks if any
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group firebase dependencies together
            if (id.includes('firebase')) {
              return 'firebase';
            }
            // Group leaflet dependencies together
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'leaflet';
            }
            // Group react core dependencies together
            if (
              id.includes('react') || 
              id.includes('react-dom') || 
              id.includes('react-router') ||
              id.includes('scheduler')
            ) {
              return 'react-core';
            }
            // Standard bundle for other third-party dependencies
            return 'vendor';
          }
        }
      }
    }
  }
})
