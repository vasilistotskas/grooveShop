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
		'@intlify/nuxt3',
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
		]
	},

	// app config
	app: {
		// global transition
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' }
	},

	// localization - i18n config
	intlify: {
		localeDir: 'locales',
		vueI18n: {
			locale: 'en',
			fallbackLocale: 'en',
			availableLocales: ['en', 'de', 'el', 'id', 'ja', 'ko']
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
