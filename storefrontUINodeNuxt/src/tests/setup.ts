import { config } from '@vue/test-utils'

try {
	// For .nuxt.test files reuse the nuxt's i18n instance
	const nuxtApp = useNuxtApp()

	config.global.plugins.push({
		async install(app, ...options) {
			const i18n = nuxtApp.vueApp.__VUE_I18N__

			await i18n.install(app, ...options)
		}
	})
} catch {
	// For .test files we don't make i18n available
}
