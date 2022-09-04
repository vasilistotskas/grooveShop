import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, './') } },
  envDir: './env/',
  plugins: [vue(), ssr(), EnvironmentPlugin('all')],
  server: {
    port: 8011,
    host: true,
    watch: {
      usePolling: process.env.NODE_ENV !== 'production',
    },
  },
})
