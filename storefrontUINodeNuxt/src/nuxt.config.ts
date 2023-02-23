import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	// server side rendering mode
	ssr: true,

	runtimeConfig: {
		// The private keys which are only available server-side
		apiSecret: '123',
		// Keys within public are also exposed client-side
		public: {
			apiBase: '/api/v1'
		}
	},

	// typescripts
	typescript: {
		strict: true,
		typeCheck: true
	},

	devtools: {
		enabled: process.env.NODE_ENV !== 'production'
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
		'@nuxt/devtools',
		'@nuxt/image-edge'
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
			hmr: {
				protocol: process.env.NODE_ENV === 'production' ? 'wss' : 'ws',
				clientPort: process.env.NODE_ENV === 'production' ? 443 : 24678,
				path: 'hmr/'
			},
			watch: {
				usePolling: process.env.NODE_ENV !== 'production'
			}
		}
	},

	// app config
	app: {
		head: {
			charset: 'utf-16',
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
