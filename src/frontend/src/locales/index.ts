import { createI18n } from 'vue-i18n'
import bundleGR from '@/locales/Global/gr.messages.json'
import bundleEN from '@/locales/Global/en_us.messages.json'
import { AvailableLocalesEnum } from '@/locales/LocaleEnum'
import { AvailableLocales, MessageSchema } from '@/locales/LocaleType'

const i18n = createI18n<[MessageSchema], AvailableLocales>({
  legacy: false,
  locale: AvailableLocalesEnum.GR,
  fallbackLocale: AvailableLocalesEnum.EN_US,
  globalInjection: true,
  messages: {
    [AvailableLocalesEnum.EN_US]: bundleEN,
    [AvailableLocalesEnum.GR]: bundleGR,
  },
  silentTranslationWarn: true,
})

export { i18n }
