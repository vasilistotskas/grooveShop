import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	ssr: true,
	runtimeConfig: {
		// The private keys which are only available server-side
		apiSecret: process.env.NUXT_APP_PRIVATE_API_SECRET,
		nuxtEnvironment: process.env.NUXT_ENVIRONMENT,
		buildDate: new Date().toISOString(),

		// Keys within public are also exposed client-side
		public: {
			appTitle: process.env.NUXT_APP_TITLE,
			appDescription: process.env.NUXT_APP_DESCRIPTION,
			appImage: process.env.NUXT_APP_IMAGE,
			domainName: process.env.NUXT_APP_PUBLIC_DOMAIN_NAME,
			canonicalUrl: process.env.NUXT_APP_PUBLIC_CANONICAL_URL,
			baseUrl: process.env.NUXT_APP_PUBLIC_BASE_URL,
			apiBaseUrl: process.env.NUXT_APP_PUBLIC_API_BASE_URL,
			facebookAppId: process.env.NUXT_APP_PUBLIC_FACEBOOK_APP_ID,
			author: {
				name: process.env.NUXT_APP_PUBLIC_AUTHOR_NAME,
				github_url: process.env.NUXT_APP_PUBLIC_AUTHOR_GITHUB_URL
			}
		},
		i18n: {
			locales: process.env.NUXT_APP_LOCALES,
			defaultLocale: process.env.NUXT_APP_DEFAULT_LOCALE
		}
	},
	typescript: {
		strict: true,
		typeCheck: true
	},
	devtools: {
		enabled: true
	},
	css: [
		'~/assets/sass/vendor.scss',
		'~/assets/sass/app.scss',
		'vue-toastification/dist/index.css'
	],
	plugins: ['~/plugins/navbar.ts', '~/plugins/auth.ts'],
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
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'unplugin-icons/nuxt',
		'./modules/sitemap-dynamic'
	],
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia',
			'storeToRefs' // import { storeToRefs } from 'pinia'
		]
	},
	experimental: {
		componentIslands: true
	},
	components: true,
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
	nitro: {
		compressPublicAssets: true,
		prerender: {
			crawlLinks: true,
			ignore: [],
			routes: ['/sitemap.xml']
		}
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [
				{ name: 'robots', content: 'index, follow' },
				{ name: 'theme-color', content: '#ffffff' },
				{ name: 'msapplication-TileColor', content: '#ffffff' },
				{ name: 'msapplication-config', content: '/assets/favicon/browserconfig.xml' },
				{
					name: 'google-site-verification',
					content: process.env.NUXT_APP_GOOGLE_SITE_VERIFICATION
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
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' }
	},
	robots: {
		configPath: '~/config/robots.config'
	},
	i18n: {
		strategy: 'prefix_except_default',
		lazy: true,
		defaultLocale: process.env.NUXT_APP_DEFAULT_LOCALE,
		debug: false, // process.env.NODE_ENV !== 'production',
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
		vueI18n: {
			legacy: false,
			availableLocales: process.env.NUXT_APP_AVAILABLE_LOCALES?.split(','),
			locale: process.env.NUXT_APP_DEFAULT_LOCALE,
			fallbackLocale: process.env.NUXT_APP_DEFAULT_LOCALE
		}
	},
	vueuse: {
		ssrHandlers: true
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},
	appConfig: {
		// you don't need to include this: only for testing purposes
		buildDate: new Date().toISOString()
	},
	pwa: {
		registerType: 'autoUpdate',
		manifest: {
			name: process.env.NUXT_APP_TITLE,
			short_name: process.env.NUXT_APP_TITLE,
			description: process.env.NUXT_APP_DESCRIPTION,
			theme_color: '#ffffff',
			background_color: '#ffffff',
			display: 'standalone',
			orientation: 'portrait',
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
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
			sourcemap: true
		},
		client: {
			installPrompt: true
			// you don't need to include this: only for testing purposes
			// if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
			// periodicSyncForUpdates: 20
		},
		devOptions: {
			enabled: false, // process.env.NODE_ENV !== 'production',
			type: 'module'
		}
	},
	htmlValidator: {
		usePrettier: false
	}
})
