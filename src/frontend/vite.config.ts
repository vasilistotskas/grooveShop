import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
