import { IntlifyModuleOptions } from '@intlify/nuxt3'
import { VueUseNuxtOptions } from '@vueuse/nuxt'

declare module '@nuxt/schema' {
	interface AppConfigInput {
		name: string
		author: {
			name: string
			link: string
		}
	}
}

declare module 'nuxt/config' {
	interface NuxtConfig {
		intlify?: IntlifyModuleOptions
		vueuse?: VueUseNuxtOptions
	}
}

export {}
