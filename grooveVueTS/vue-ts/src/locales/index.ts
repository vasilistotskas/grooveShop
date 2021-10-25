import enBundle from '@/locales/en.messages.json'
import grBundle from '@/locales/gr.messages.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'gr',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
        en: enBundle,
        gr: grBundle
    },
    silentTranslationWarn: true
})


// @ts-ignore
export { i18n }