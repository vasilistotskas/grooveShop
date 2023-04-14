import { createResolver } from '@nuxt/kit'
import { i18n } from './config/i18n'
import { pwa } from './config/pwa'
import { runtimeConfig } from './config/runtime'
import { cookieControl } from './config/cookie'
import { devtools } from './config/devtools'
import { pinia } from './config/pinia'
import { vite } from './config/vite'
import { nitro } from './config/nitro'
import { app } from './config/app'
import { image } from './config/image'
import { eslint } from './config/eslint'
import { postcss } from './config/postcss'
import { htmlValidator } from './config/html-validator'
const { resolve } = createResolver(import.meta.url)

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	ssr: true,
	components: true,
	experimental: {
		componentIslands: true,
		viewTransition: true
		// renderJsonPayloads: true
	},
	typescript: {
		strict: true,
		typeCheck: true,
		tsConfig: {
			compilerOptions: {
				types: ['unplugin-icons/types/vue']
			}
		}
	},
	css: [
		'~/assets/sass/vendor.scss',
		'~/assets/sass/app.scss',
		'vue-toastification/dist/index.css'
	],
	plugins: ['~/plugins/navbar.ts', '~/plugins/i18n.ts'],
	imports: {
		dirs: [resolve('./stores'), '~/stores']
	},
	build: {
		transpile: ['@headlessui/vue', 'vue-toastification']
	},
	modules: [
		'@nuxt/devtools',
		'@nuxt/image-edge',
		'@nuxt/content',
		'@nuxtjs/html-validator',
		'@nuxtjs/robots',
		'@nuxtjs/i18n',
		'@nuxtjs/eslint-module',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'unplugin-icons/nuxt',
		'nuxt-lodash'
	],
	robots: {
		configPath: '~/config/robots.config'
	},
	eslint,
	runtimeConfig,
	devtools,
	cookieControl,
	pinia,
	vite,
	nitro,
	app,
	image,
	// @ts-ignore
	i18n,
	postcss,
	pwa,
	htmlValidator
})
