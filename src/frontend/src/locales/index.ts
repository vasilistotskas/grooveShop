import { createI18n } from 'vue-i18n'
import enBundle from '@/locales/en.messages.json'
import grBundle from '@/locales/gr.messages.json'

const i18n = createI18n({
  legacy: false,
  locale: 'gr',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en: enBundle,
    gr: grBundle,
  },
  silentTranslationWarn: true,
})

export { i18n }
