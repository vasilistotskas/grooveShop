import mitt from 'mitt'
import axios from 'axios'
import App from '@/App.vue'
import router from '@/Routes'
import { createApp } from 'vue'
import { i18n } from '@/Locales'
import store from '@/DynamicStore'
import 'vue-toastification/dist/index.css'
import VueSocialSharing from 'vue-social-sharing'
import * as apolloProvider from '@/Apollo/ApolloProvider'
import Toast, { PluginOptions, TYPE } from 'vue-toastification'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import {
	FontAwesomeIcon,
	FontAwesomeLayers,
	FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'

const ToastOptions: PluginOptions = {
	toastDefaults: {
		// ToastOptions object for each type of toast
		[TYPE.ERROR]: {
			timeout: 5000,
			closeButton: false
		},
		[TYPE.SUCCESS]: {
			timeout: 5000,
			hideProgressBar: true
		}
	}
}

const emitter = mitt()
const metaManager = createMetaManager()

const app = createApp(App)
	.use(store)
	.use(router, axios)
	.use(metaManager)
	.use(metaPlugin)
	.use(i18n)
	.use(apolloProvider.provider)
	.use(Toast, ToastOptions)
	.use(VueSocialSharing)
	.component('FontAwesomeIcon', FontAwesomeIcon)
	.component('FontAwesomeLayers', FontAwesomeLayers)
	.component('FontAwesomeLayersText', FontAwesomeLayersText)
	.provide('emitter', emitter)

app.config.globalProperties.emitter = emitter

router.isReady().then(() => {
	app.mount('#app')
})
