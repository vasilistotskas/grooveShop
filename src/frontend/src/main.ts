import mitt from 'mitt'
import axios from 'axios'
import App from '@/App.vue'
import store from './store'
import router from '@/routes'
import { i18n } from '@/locales'
import { createApp } from 'vue'
import 'vue-toastification/dist/index.css'
import VueSocialSharing from 'vue-social-sharing'
import * as apolloProvider from '../apollo.provider'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast, { PluginOptions, TYPE } from 'vue-toastification'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import { createValidation, ValidationBehaviorInfo } from 'vue3-form-validation'

const validation = createValidation({
  defaultValidationBehavior: <never>'change',
  validationBehavior: {
    change: ({ force }: ValidationBehaviorInfo) => !force,
    lazy: ({ touched }: ValidationBehaviorInfo) => touched,
    submit: ({ submit, hasError }: ValidationBehaviorInfo) => submit || hasError,
  },
})

const ToastOptions: PluginOptions = {
  toastDefaults: {
    // ToastOptions object for each type of toast
    [TYPE.ERROR]: {
      timeout: 5000,
      closeButton: false,
    },
    [TYPE.SUCCESS]: {
      timeout: 5000,
      hideProgressBar: true,
    },
  },
}

const emitter = mitt()
const metaManager = createMetaManager()

createApp(App)
  .use(store)
  .use(router, axios)
  .use(metaManager)
  .use(metaPlugin)
  .use(i18n)
  .use(validation)
  .use(apolloProvider.provider)
  .use(Toast, ToastOptions)
  .use(VueSocialSharing)
  .component('font-awesome-icon', FontAwesomeIcon)
  .provide('emitter', emitter)
  .mount('#app')
