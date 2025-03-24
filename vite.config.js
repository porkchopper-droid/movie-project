import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change this to your actual Render backend URL
// const BACKEND_URL = "https://movie-project-1q1x.onrender.com";

export default defineConfig({
  base: "/movie-project/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path // keep the /api prefix,
      },
    },
  },
});
