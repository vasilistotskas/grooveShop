import { createI18n } from 'vue-i18n'
import bundleGR from '@/Locales/Global/gr.messages.json'
import bundleEN from '@/Locales/Global/en_us.messages.json'
import { AvailableLocalesEnum } from '@/Locales/LocaleEnum'
import { AvailableLocales, MessageSchema } from '@/Locales/LocaleType'

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
