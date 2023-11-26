import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, Plugin } from "vite";

const addPrefix = (prefix: string): Plugin => ({
  name: 'add-prefix-to-bundle-plugin',
  generateBundle(options, bundle) {
    for (const [fileName, file] of Object.entries(bundle)) {
      if (file.type === 'chunk') {
        file.code = file.code.replace(/\/icon\/[^"'\s]+/g, `${prefix}$&`);
      }
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: process.env.VITE_BASENAME || '/',
    plugins: [react(), addPrefix(process.env.VITE_BASENAME)],
    build: {
      chunkSizeWarningLimit: 1024
    },

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1420,
      strictPort: true,
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.app/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
  }
});
