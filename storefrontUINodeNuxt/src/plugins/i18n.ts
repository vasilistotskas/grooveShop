import { GlobalEvents } from '~/events/global'

export default defineNuxtPlugin((nuxtApp) => {
	// @ts-ignore
	nuxtApp.$i18n.onBeforeLanguageSwitch = (
		oldLocale: string,
		newLocale: string,
		isInitialSetup: boolean
	) => {
		const bus = useEventBus<string>(GlobalEvents.ON_BEFORE_LANGUAGE_SWITCH)
		bus.emit(GlobalEvents.ON_BEFORE_LANGUAGE_SWITCH, {
			oldLocale,
			newLocale,
			isInitialSetup
		})
	}
	// @ts-ignore
	nuxtApp.$i18n.onLanguageSwitched = (oldLocale: string, newLocale: string) => {
		const bus = useEventBus<string>(GlobalEvents.ON_LANGUAGE_SWITCHED)
		bus.emit(GlobalEvents.ON_LANGUAGE_SWITCHED, {
			oldLocale,
			newLocale
		})
	}
})
