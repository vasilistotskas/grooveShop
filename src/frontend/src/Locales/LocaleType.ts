import bundleGR from '@/Locales/Global/gr.messages.json'
import { AvailableLocalesEnum } from '@/Locales/LocaleEnum'

export type MessageSchema = typeof bundleGR
export type NumberSchema = {
	currency: {
		style: 'currency'
		currencyDisplay: 'symbol'
		currency: string
	}
}
export type DefineDateTimeFormat = {
	short: {
		hour: 'numeric'
		minute: 'numeric'
		second: 'numeric'
		timeZoneName: 'short'
		timezone: string
	}
}
export type AvailableLocales = AvailableLocalesEnum.EN_US | AvailableLocalesEnum.GR
