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
		'@nuxt/image-edge',
		'@vite-pwa/nuxt'
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
			crawlLinks: true,
			ignore: [],
			routes: []
		}
	},

	// app config
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: process.env.NUXT_APP_TITLE,
			meta: [
				{ name: 'robots', content: 'index, follow' },
				{ name: 'description', content: process.env.NUXT_APP_DESCRIPTION },
				{ name: 'theme-color', content: '#ffffff' },
				{ name: 'msapplication-TileColor', content: '#ffffff' },
				{ name: 'msapplication-config', content: '/assets/favicon/browserconfig.xml' },
				{
					name: 'google-site-verification',
					content: process.env.NUXT_APP_GOOGLE_SITE_VERIFICATION
				},

				{ property: 'og:title', content: process.env.NUXT_APP_TITLE },
				{ property: 'og:description', content: process.env.NUXT_APP_DESCRIPTION },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: process.env.NUXT_APP_PUBLIC_CANONICAL_URL },
				{
					property: 'og:image',
					content: `${process.env.NUXT_APP_PUBLIC_CANONICAL_URL}/images/websiteLogo_circle.png`
				},
				{ property: 'og:site_name', content: process.env.NUXT_APP_TITLE },

				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:site', content: '@' + process.env.NUXT_APP_TWITTER_USERNAME },
				{ name: 'twitter:creator', content: '@' + process.env.NUXT_APP_TWITTER_USERNAME },
				{ name: 'twitter:title', content: process.env.NUXT_APP_TITLE },
				{ name: 'twitter:description', content: process.env.NUXT_APP_DESCRIPTION },
				{
					name: 'twitter:image',
					content: `${process.env.NUXT_APP_PUBLIC_CANONICAL_URL}/images/websiteLogo_circle.png`
				}
			],
			link: [
				{
					rel: 'manifest',
					href: '/manifest.webmanifest'
				},
				{
					rel: 'shortcut icon',
					type: 'image/x-icon',
					href: '/assets/favicon/favicon.ico'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/assets/favicon/apple-touch-icon.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: '/assets/favicon/favicon-32x32.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: '/assets/favicon/favicon-16x16.png'
				},
				{
					rel: 'mask-icon',
					href: '/assets/favicon/safari-pinned-tab.svg',
					color: '#5bbad5'
				}
			]
		},
		// global transition
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' }
	},

	// localization - i18n config
	i18n: {
		strategy: 'prefix_and_default',
		defaultLocale: 'en',
		debug: process.env.NODE_ENV !== 'production',
		langDir: 'locales/',
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
		vueI18n: {
			legacy: false,
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
	},

	pwa: {
		registerType: 'autoUpdate',
		minify: true,
		disable: false,
		injectRegister: 'auto',
		includeAssets: [],
		includeManifestIcons: true,
		manifest: {
			name: process.env.NUXT_APP_TITLE,
			short_name: process.env.NUXT_APP_TITLE,
			description: process.env.NUXT_APP_DESCRIPTION,
			theme_color: '#ffffff',
			background_color: '#ffffff',
			display: 'standalone',
			orientation: 'portrait',
			start_url: '/',
			scope: '/',
			icons: [
				{
					src: '/assets/favicon/android-icon-144x144.png',
					sizes: '144x144',
					type: 'image/png',
					purpose: 'maskable'
				},
				{
					src: '/assets/favicon/android-icon-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable'
				},
				{
					src: '/assets/favicon/android-icon-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable'
				},
				{
					src: '/assets/favicon/android-icon-144x144.png',
					sizes: '144x144',
					type: 'image/png',
					purpose: 'any'
				},
				{
					src: '/assets/favicon/android-icon-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'any'
				},
				{
					src: '/assets/favicon/android-icon-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any'
				}
			]
		},
		workbox: {
			navigateFallback: '/',
			globPatterns: ['**/*.{js,ts,css,html,png,svg,ico}']
		},
		devOptions: {
			enabled: true,
			type: 'module'
		}
	}
})
