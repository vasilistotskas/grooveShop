import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
import { useI18n } from 'vue-i18n'

export interface ILocales {
	[key: string]: LocaleObject
}

export const availableLocales: ILocales = {
	en: {
		code: 'en',
		name: 'English',
		file: 'en.yml',
		iso: 'en',
		flag: '🇺🇸'
	},
	el: {
		code: 'el',
		name: 'Ελληνικά',
		file: 'el.yml',
		iso: 'el',
		flag: '🇬🇷'
	},
	de: {
		code: 'de',
		name: 'Deutsch',
		file: 'de.yml',
		iso: 'de',
		flag: '🇩🇪'
	},
	id: {
		code: 'id',
		name: 'Bahasa',
		file: 'id.yml',
		iso: 'id',
		flag: '🇮🇩'
	},
	ja: {
		code: 'ja',
		name: '日本語',
		file: 'ja.yml',
		iso: 'ja',
		flag: '🇯🇵'
	},
	ko: {
		code: 'ko',
		name: '한국어',
		file: 'ko.yml',
		iso: 'ko',
		flag: '🇰🇷'
	},
	zh: {
		code: 'zh',
		name: '简体中文',
		file: 'zh.yml',
		iso: 'zh',
		flag: '🇨🇳'
	}
}

export function LanguageManager() {
	// composable
	const { locale } = useI18n()
	const localeUserSetting = useCookie('locale')

	// methods
	const getSystemLocale = (): string => {
		try {
			const foundLang = window ? window.navigator.language.substring(0, 2) : 'en'
			return availableLocales[foundLang] ? foundLang : 'en'
		} catch (error) {
			return 'en'
		}
	}
	const getUserLocale = (): string => localeUserSetting.value || getSystemLocale()

	// state
	const localeSetting = useState<string>('locale.setting', () => getUserLocale())

	// watchers
	watch(localeSetting, (localeSetting) => {
		localeUserSetting.value = localeSetting
		locale.value = localeSetting
	})

	// init locale
	const init = () => {
		localeSetting.value = getUserLocale()
	}
	locale.value = localeSetting.value

	// lifecycle
	onBeforeMount(() => init())

	return {
		localeSetting,
		init
	}
}
