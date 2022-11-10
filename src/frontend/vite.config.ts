import * as path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import VitePluginHtmlEnv from 'vite-plugin-html-env'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	envDir: './env/',
	plugins: [
		vue(),
		vueI18n({
			// if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
			// compositionOnly: false,

			// you need to set I18n resource including paths !
			include: resolve(dirname(fileURLToPath(import.meta.url)), 'src/Locales/**')
		}),
		VitePluginHtmlEnv({
			compiler: true
			// compiler: false // old
		}),
		EnvironmentPlugin('all')
	],
	build: {
		target: 'esnext',
		outDir: './dist/',
		assetsDir: './backend/static/js',
		minify: 'terser',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString()
					}
				}
			}
		}
	},
	server: {
		port: 8011,
		host: true,
		watch: {
			usePolling: process.env.NODE_ENV !== 'production'
		}
	}
})
