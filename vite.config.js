import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change this to your actual Render backend URL
const BACKEND_URL = "https://movie-project-1q1x.onrender.com";

export default defineConfig({
  base: "/movie-project/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
