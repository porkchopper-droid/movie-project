import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/movie-project/',
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000", // ✅ Proxy all "/api" calls to backend
    },
  },
  
})
