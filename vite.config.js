/// <reference types="vitest" />
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "nick-g-uz",
    project: "soc18songs"
  })],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    globals: true
  },
  build: {
    sourcemap: true
  }
})