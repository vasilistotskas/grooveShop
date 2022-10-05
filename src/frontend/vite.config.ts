import * as path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import VitePluginHtmlEnv from 'vite-plugin-html-env'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  envDir: './env/',
  plugins: [
    vue(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set I18n resource including paths !
      include: resolve(dirname(fileURLToPath(import.meta.url)), 'src/Locales/**'),
    }),
    VitePluginHtmlEnv({
      compiler: true,
      // compiler: false // old
    }),
    EnvironmentPlugin('all'),
  ],
  build: {
    outDir: './dist/',
    assetsDir: './backend/static/js',
  },
  server: {
    port: 8011,
    host: true,
    watch: {
      usePolling: process.env.NODE_ENV !== 'production',
    },
  },
})
