import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
import { useI18n } from 'vue-i18n'

export interface ILocales {
	[key: string]: LocaleObject
}

export const availableLocales: ILocales = {
	'en-US': {
		code: 'en',
		name: 'English',
		file: 'en-US.yml',
		iso: 'en-US',
		flag: '🇺🇸'
	},
	'el-GR': {
		code: 'el',
		name: 'Ελληνικά',
		file: 'el-GR.yml',
		iso: 'el-GR',
		flag: '🇬🇷'
	},
	'de-DE': {
		code: 'de',
		name: 'Deutsch',
		file: 'de-DE.yml',
		iso: 'de-DE',
		flag: '🇩🇪'
	},
	'id-ID': {
		code: 'id',
		name: 'Bahasa',
		file: 'id.yml',
		iso: 'id-ID',
		flag: '🇮🇩'
	},
	'ja-JP': {
		code: 'ja',
		name: '日本語',
		file: 'ja.yml',
		iso: 'ja-JP',
		flag: '🇯🇵'
	},
	'ko-KR': {
		code: 'ko',
		name: '한국어',
		file: 'ko.yml',
		iso: 'ko-KR',
		flag: '🇰🇷'
	},
	'zh-CN': {
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
	const getUserLocale = (): string => localeUserSetting.value || getSystemLocale()

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
