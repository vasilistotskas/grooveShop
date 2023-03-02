import { VueUseNuxtOptions } from '@vueuse/nuxt'
import { NuxtI18nOptions } from '@nuxtjs/i18n'
import { ModuleOptions as DevToolsModuleOptions } from '@nuxt/devtools'
import { ModuleOptions as PiniaModuleOptions } from '@pinia/nuxt'
import { NitroOptions } from 'nitropack'
import { ModuleOptions as PWAModuleOptions } from '@vite-pwa/nuxt'

declare module '@nuxt/schema' {
	interface AppConfigInput {
		name: string | undefined
		description: string | undefined
		author: {
			name: string | undefined
			github_url: string | undefined
		}
		public: {
			domainName: string | undefined
			canonicalUrl: string | undefined
			baseUrl: string | undefined
			apiBaseUrl: string | undefined
		}
	}
}

declare module 'nuxt/config' {
	interface NuxtConfig {
		vueuse?: VueUseNuxtOptions
		i18n?: NuxtI18nOptions
		devtools?: DevToolsModuleOptions
		pinia?: PiniaModuleOptions
		nitro?: Partial<NitroOptions>
		pwa?: PWAModuleOptions
	}
}

export {}
