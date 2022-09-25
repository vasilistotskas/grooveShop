import bundleGR from '@/locales/Global/gr.messages.json'
import { AvailableLocalesEnum } from '@/locales/LocaleEnum'

export type MessageSchema = typeof bundleGR
export type AvailableLocales = AvailableLocalesEnum.EN_US | AvailableLocalesEnum.GR
