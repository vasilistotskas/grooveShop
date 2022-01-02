import axios from 'axios'
import App from '@/App.vue'
import store from './store'
import router from '@/routes'
import { i18n } from '@/locales'
import { createApp } from 'vue'
import "vue-toastification/dist/index.css"
import * as apolloProvider from '../apollo.provider'
import { createValidation } from 'vue3-form-validation'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast, { PluginOptions, TYPE } from "vue-toastification"

// for mass import
// library.add(faFontAwesome, faCoffee, fas, fab)

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
            timeout: 3000,
            closeButton: false,
        },
        [TYPE.SUCCESS]: {
            timeout: 1350,
            hideProgressBar: true,
        }
    }
};

createApp(App)
    .use(store)
    .use(router, axios)
    .use(i18n)
    .use(validation)
    .use(apolloProvider.provider)
    .use(Toast, ToastOptions)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
