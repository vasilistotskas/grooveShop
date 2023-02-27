import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	// server side rendering mode
	ssr: true,

	runtimeConfig: {
		// The private keys which are only available server-side
		apiSecret: process.env.NUXT_APP_PRIVATE_API_SECRET,

		// Keys within public are also exposed client-side
		public: {
			domainName: process.env.NUXT_APP_PUBLIC_DOMAIN_NAME,
			canonicalUrl: process.env.NUXT_APP_PUBLIC_CANONICAL_URL,
			baseUrl: process.env.NUXT_APP_PUBLIC_BASE_URL,
			apiBaseUrl: process.env.NUXT_APP_PUBLIC_API_BASE_URL
		}
	},

	// typescripts
	typescript: {
		strict: true,
		typeCheck: true
	},

	devtools: {
		enabled: true
	},

	// css
	css: [
		'~/assets/sass/vendor.scss',
		'~/assets/sass/app.scss',
		'vue-toastification/dist/index.css'
	],

	// plugins
	plugins: ['~/plugins/navbar.ts', '~/plugins/auth.ts'],

	// build
	build: {
		transpile: ['@headlessui/vue', 'vue-toastification']
	},

	// modules
	modules: [
		'unplugin-icons/nuxt',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/devtools',
		'@nuxt/image-edge'
	],

	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia',
			'storeToRefs' // import { storeToRefs } from 'pinia'
		]
	},

	// experimental features
	experimental: {
		reactivityTransform: false,
		componentIslands: true
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
			hmr: {
				protocol: process.env.NODE_ENV === 'production' ? 'wss' : 'ws',
				clientPort: 24678,
				path: 'hmr/'
			},
			watch: {
				usePolling: process.env.NODE_ENV !== 'production'
			}
		}
	},

	// nitro
	nitro: {
		compressPublicAssets: true,
		prerender: {
			crawlLinks: true
		}
	},

	// app config
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=500, initial-scale=1',
			title: process.env.NUXT_APP_TITLE,
			meta: [{ name: 'description', content: process.env.NUXT_APP_DESCRIPTION }]
		},
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
})
