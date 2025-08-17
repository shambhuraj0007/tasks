import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.js$/, // treat all .js files in src as JSX
    },
  },
});
