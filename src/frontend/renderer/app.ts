import { createSSRApp, defineComponent, h } from 'vue'
import PageShell from './PageShell.vue'
import { setPageContext } from './usePageContext'
import type { PageContextCommon } from './types'
import router from '@/routes'
import axios from 'axios'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import { i18n } from '@/locales'
import * as apolloProvider from '@/apollo.provider'
import Toast, { PluginOptions, TYPE } from 'vue-toastification'
import VueSocialSharing from 'vue-social-sharing'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import mitt from 'mitt'
import store from '@/renderer/dynamicStore'
import 'vue-toastification/dist/index.css'

export { createApp }

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

function createApp(pageContext: PageContextCommon) {
  const { Page, pageProps } = pageContext
  const PageWithLayout = defineComponent({
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {})
          },
        }
      )
    },
  })

  const app = createSSRApp(PageWithLayout)
    .use(store, axios)
    .use(metaManager)
    .use(metaPlugin)
    .use(i18n)
    .use(apolloProvider.provider)
    .use(Toast, ToastOptions)
    .use(VueSocialSharing)
    .component('font-awesome-icon', FontAwesomeIcon)
    .provide('emitter', emitter)

  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext)

  return app
}
