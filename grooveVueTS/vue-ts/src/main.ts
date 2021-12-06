import "bootstrap"
import axios from 'axios'
import App from '@/App.vue'
import store from './store'
import router from '@/routes'
import { i18n } from '@/locales'
import { createApp } from 'vue'
import "vue-toastification/dist/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import * as apolloProvider from '../apollo.provider'
import { createValidation } from 'vue3-form-validation'
import Toast, { PluginOptions, TYPE } from "vue-toastification"

const validation = createValidation({
    defaultValidationBehavior: 'lazier',
    validationBehavior: {}
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

axios.defaults.baseURL = 'http://localhost:8000'

createApp(App)
    .use(store)
    .use(router, axios)
    .use(i18n)
    .use(validation)
    .use(apolloProvider.provider)
    .use(Toast, ToastOptions)
    .mount('#app')
