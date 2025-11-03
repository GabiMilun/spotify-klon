import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // allow access from outside the container and set desired port
    host: true,
    port: 5175,
  },
})
