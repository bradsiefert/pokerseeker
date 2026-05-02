import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to all interfaces so other devices on your LAN can open the dev URL (e.g. phone).
    host: true,
  },
  build: {
    // Never base64-inline images; keep them as separate files (no implicit "optimization").
    assetsInlineLimit: 0,
  },
})
