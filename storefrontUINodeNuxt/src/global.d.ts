import { VueUseNuxtOptions } from '@vueuse/nuxt'
import { NuxtI18nOptions } from '@nuxtjs/i18n'
import { ModuleOptions as DevToolsModuleOptions } from '@nuxt/devtools'
import { ModuleOptions as PiniaModuleOptions } from '@pinia/nuxt'
import { NitroOptions } from 'nitropack'
import { ModuleOptions as PWAModuleOptions } from '@vite-pwa/nuxt'
import { ModuleOptions as HtmlValidatorModuleOptions } from '@nuxtjs/html-validator'
import { ModuleOptions as RobotsModuleOptions } from '@nuxtjs/robots'
import { ModuleOptions as ContentModuleOptions } from '@nuxt/content'
import { ModuleOptions as ImageModuleOptions } from '@nuxt/image-edge'
import { ModuleOptions as EslintModuleOptions } from '@nuxtjs/eslint-module'

declare module '@nuxt/schema' {
	interface AppConfigInput {
		name: string | undefined
		description: string | undefined
		buildDate: string | undefined
		facebookAppId: string | undefined
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
		htmlValidator?: HtmlValidatorModuleOptions
		robots?: Partial<RobotsModuleOptions>
		content?: ContentModuleOptions
		image?: Partial<ImageModuleOptions>
		eslint?: EslintModuleOptions
	}
}

export {}
