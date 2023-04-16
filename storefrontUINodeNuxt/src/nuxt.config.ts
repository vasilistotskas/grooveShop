import { createResolver } from '@nuxt/kit'
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
	extends: ['nuxt-seo-kit'],
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
	linkChecker: {
		failOn404: true
	},
	modules: [
		'@nuxt/devtools',
		'@nuxt/image-edge',
		'@nuxt/content',
		'@nuxtjs/html-validator',
		'@nuxtjs/i18n',
		'@nuxtjs/eslint-module',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'unplugin-icons/nuxt',
		'nuxt-lodash'
	],
	i18n: {
		strategy: 'prefix_except_default',
		lazy: true,
		defaultLocale: process.env.NUXT_APP_DEFAULT_LOCALE,
		debug: process.env.NODE_ENV !== 'production',
		langDir: 'locales/',
		baseUrl: process.env.NUXT_APP_PUBLIC_BASE_URL || 'http://localhost:3000',
		detectBrowserLanguage: {
			useCookie: true,
			redirectOn: 'root',
			cookieKey: 'i18n_redirected',
			alwaysRedirect: true
		},
		locales: [
			{
				code: 'en',
				name: 'English',
				file: 'en-US.yml',
				iso: 'en-US',
				flag: '🇺🇸'
			},
			{
				code: 'de',
				name: 'Deutsch',
				file: 'de-DE.yml',
				iso: 'de-DE',
				flag: '🇩🇪'
			},
			{
				code: 'el',
				name: 'Ελληνικά',
				file: 'el-GR.yml',
				iso: 'el-GR',
				flag: '🇬🇷'
			},
			{
				code: 'id',
				name: 'Bahasa',
				file: 'id-ID.yml',
				iso: 'id-ID',
				flag: '🇮🇩'
			},
			{
				code: 'ja',
				name: '日本語',
				file: 'ja-JP.yml',
				iso: 'ja-JP',
				flag: '🇯🇵'
			},
			{
				code: 'ko',
				name: '한국어',
				file: 'ko-KR.yml',
				iso: 'ko-KR',
				flag: '🇰🇷'
			},
			{
				code: 'zh',
				name: '简体中文',
				file: 'zh-CN.yml',
				iso: 'zh-CN',
				flag: '🇨🇳'
			}
		],
		vueI18n: 'i18n.config.ts'
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
	postcss,
	pwa,
	htmlValidator
})
