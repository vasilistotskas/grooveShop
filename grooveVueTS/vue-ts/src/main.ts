import axios from 'axios'
import App from '@/App.vue'
import store from './store'
import router from '@/routes'
import { i18n } from '@/locales'
import { createApp } from 'vue'
import "vue-toastification/dist/index.css"
import * as apolloProvider from '../apollo.provider'
import { createValidation } from 'vue3-form-validation'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import Toast, { PluginOptions, TYPE } from "vue-toastification"
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(faFontAwesome, faCoffee, fas, fab)

const validation = createValidation({
    defaultValidationBehavior: <never>'lazy',
    validationBehavior: {
        change: ({ force }: any) => !force,
        lazy: ({ touched }: any) => touched,
        submit: ({ submit, hasError }: any) => submit || hasError
    }
})

const ToastOptions: PluginOptions = {
    toastDefaults: {
        // ToastOptions object for each type of toast
        [TYPE.ERROR]: {
            timeout: 2000,
            closeButton: false,
        },
        [TYPE.SUCCESS]: {
            timeout: 1350,
            hideProgressBar: true,
        }
    }
};

axios.defaults.baseURL = process.env.VUE_APP_API_URL

createApp(App)
    .use(store)
    .use(router, axios)
    .use(i18n)
    .use(validation)
    .use(apolloProvider.provider)
    .use(Toast, ToastOptions)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
