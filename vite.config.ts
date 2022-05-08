import apiMocker from "connect-api-mocker";
import * as path from "path";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    eslintPlugin(),
    {
      name: "api-mock-server",
      configureServer(server) {
        server.middlewares.use(apiMocker("/mock-api", "mock/api"));
      },
    },
    react(),
  ],
  server: {
    host: "0.0.0.0",
  },
});
