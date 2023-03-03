import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
import { useI18n } from 'vue-i18n'

export interface ILocales {
	[key: string]: LocaleObject
}

export const availableLocales: ILocales = {
	en: {
		code: 'en',
		name: 'English',
		file: 'en-US.yml',
		iso: 'en-US',
		flag: '🇺🇸'
	},
	el: {
		code: 'el',
		name: 'Ελληνικά',
		file: 'el-GR.yml',
		iso: 'el-GR',
		flag: '🇬🇷'
	},
	de: {
		code: 'de',
		name: 'Deutsch',
		file: 'de-DE.yml',
		iso: 'de-DE',
		flag: '🇩🇪'
	},
	id: {
		code: 'id',
		name: 'Bahasa',
		file: 'id.yml',
		iso: 'id-ID',
		flag: '🇮🇩'
	},
	ja: {
		code: 'ja',
		name: '日本語',
		file: 'ja.yml',
		iso: 'ja-JP',
		flag: '🇯🇵'
	},
	ko: {
		code: 'ko',
		name: '한국어',
		file: 'ko.yml',
		iso: 'ko-KR',
		flag: '🇰🇷'
	},
	zh: {
		code: 'zh',
		name: '简体中文',
		file: 'zh.yml',
		iso: 'zh-CN',
		flag: '🇨🇳'
	}
}

export function LanguageManager() {
	// composable
	const { locale, setLocale } = useI18n()
	const switchLocalePath = useSwitchLocalePath()
	const localeUserSetting = useCookie('i18n_redirected')

	// methods
	const getSystemLocale = (): string => {
		try {
			const foundLang = window ? window.navigator.language.substring(0, 2) : 'en'
			return availableLocales[foundLang] ? foundLang : 'en'
		} catch (error) {
			return 'en'
		}
	}
	const getLocaleFromPath = (): string => {
		try {
			const pathnameSegments = window.location.pathname.split('/')
			const languageInUrl = pathnameSegments[1]
			return availableLocales[languageInUrl] ? languageInUrl : 'en'
		} catch (error) {
			return 'en'
		}
	}
	const getUserLocale = (): string =>
		getLocaleFromPath() || localeUserSetting.value || getSystemLocale()

	// state
	const localeSetting = useState<string>('locale.setting', () => getUserLocale())

	// watchers
	watch(localeSetting, (localeSetting) => {
		localeUserSetting.value = localeSetting
		locale.value = localeSetting
		setLocale(locale.value)
		switchLocalePath(locale.value)
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
