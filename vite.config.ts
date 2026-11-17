import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr({ svgrOptions: { replaceAttrValues: { "#171717": "currentColor" } } }),
    ],
    server: {
      proxy: env.VITE_API_BASE_URL
        ? {
            "/api": {
              target: env.VITE_API_BASE_URL.replace(/\/+$/, ""),
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          }
        : undefined,
    },
  };
});
