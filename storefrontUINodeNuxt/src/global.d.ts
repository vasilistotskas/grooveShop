import { VueUseNuxtOptions } from '@vueuse/nuxt'
import { NuxtI18nOptions } from "@nuxtjs/i18n";

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
		vueuse?: VueUseNuxtOptions
    i18n?: NuxtI18nOptions
	}
}

export {}
