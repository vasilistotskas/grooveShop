import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginHtmlEnv from 'vite-plugin-html-env'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  envDir: './env/',
  plugins: [vue(), VitePluginHtmlEnv(), EnvironmentPlugin('all')],
  build: {
    outDir: './dist/',
    assetsDir: './backend/static/js',
  },
  server: {
    port: 8011,
    host: true,
  },
})
