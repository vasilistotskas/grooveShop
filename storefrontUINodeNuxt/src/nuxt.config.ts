import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
// @ts-ignore
import { NuxtConfig } from '@nuxt/schema-edge'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	// server side rendering mode
	ssr: true,

	// typescripts
	typescript: {
		strict: true,
		typeCheck: true
	},

	// css
	css: ['~/assets/sass/vendor.scss', '~/assets/sass/app.scss'],

	// plugins
	plugins: ['~/plugins/navbar.ts'],

	// build
	build: {
		transpile: ['@headlessui/vue']
	},

	// modules
	modules: [
		'unplugin-icons/nuxt',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/devtools'
	],

	// experimental features
	experimental: {
		reactivityTransform: false
	},

	// auto import components
	components: true,

	// vite plugins
	vite: {
		plugins: [
			UnpluginComponentsVite({
				dts: true,
				resolvers: [
					IconsResolver({
						prefix: 'Icon'
					})
				]
			})
		],
		server: {
			// hmr: {
			// 	protocol: 'ws',
			// 	host: 'localhost'
			// },
			watch: {
				usePolling: process.env.NODE_ENV !== 'production'
			}
		}
	},

	// app config
	app: {
		// global transition
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' }
	},

	// localization - i18n config
	i18n: {
		locales: [
			{
				code: 'en',
				name: 'English',
				file: 'en.yml',
				iso: 'en',
				flag: '🇺🇸'
			},
			{
				code: 'de',
				name: 'Deutsch',
				file: 'de.yml',
				iso: 'de',
				flag: '🇩🇪'
			},
			{
				code: 'el',
				name: 'Ελληνικά',
				file: 'el.yml',
				iso: 'el',
				flag: '🇬🇷'
			},
			{
				code: 'id',
				name: 'Bahasa',
				file: 'id.yml',
				iso: 'id',
				flag: '🇮🇩'
			},
			{
				code: 'ja',
				name: '日本語',
				file: 'ja.yml',
				iso: 'ja',
				flag: '🇯🇵'
			},
			{
				code: 'ko',
				name: '한국어',
				file: 'ko.yml',
				iso: 'ko',
				flag: '🇰🇷'
			},
			{
				code: 'zh',
				name: '简体中文',
				file: 'zh.yml',
				iso: 'zh',
				flag: '🇨🇳'
			}
		],
		defaultLocale: 'en',
		langDir: 'locales/',
		vueI18n: {
			availableLocales: ['en', 'de', 'el', 'id', 'ja', 'ko', 'zh'],
			locale: 'en',
			fallbackLocale: 'en'
		}
	},

	// vueuse
	vueuse: {
		ssrHandlers: true
	},

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	}
}) as NuxtConfig
