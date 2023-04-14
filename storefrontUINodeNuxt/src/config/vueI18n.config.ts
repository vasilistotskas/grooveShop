export default defineI18nConfig((nuxt) => ({
	legacy: false,
	availableLocales: process.env.NUXT_APP_AVAILABLE_LOCALES?.split(','),
	locale: process.env.NUXT_APP_DEFAULT_LOCALE,
	fallbackLocale: process.env.NUXT_APP_DEFAULT_LOCALE
}))
