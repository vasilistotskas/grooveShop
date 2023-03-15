import { NuxtI18nOptions } from '@nuxtjs/i18n'

export const i18n: NuxtI18nOptions = {
	strategy: 'prefix_except_default',
	lazy: true,
	defaultLocale: process.env.NUXT_APP_DEFAULT_LOCALE,
	debug: process.env.NODE_ENV !== 'production',
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
}
