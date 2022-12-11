import mitt from 'mitt'
import axios from 'axios'
import App from './App.vue'
import { createRouter } from '@/Routes'
import { createSSRApp } from 'vue'
import { i18n } from '@/Locales'
import 'vue-toastification/dist/index.css'
import VueSocialSharing from 'vue-social-sharing'
import * as apolloProvider from '@/Apollo/ApolloProvider'
import Toast, { PluginOptions } from 'vue-toastification'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import {
	FontAwesomeIcon,
	FontAwesomeLayers,
	FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'
import store from '@/DynamicStore'

const ToastOptions: PluginOptions = {
	toastDefaults: {
		// ToastOptions object for each type of toast
		error: {
			timeout: 5000,
			closeButton: false
		},
		success: {
			timeout: 5000,
			hideProgressBar: true
		}
	}
}

export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	const router = createRouter()
	app.use(router, axios)
	const metaManager = createMetaManager()
	app.use(metaManager)
	app.use(metaPlugin)
	app.use(i18n)
	app.use(apolloProvider.provider)
	app.use(Toast, ToastOptions)
	app.use(VueSocialSharing)
	app.component('FontAwesomeIcon', FontAwesomeIcon)
	app.component('FontAwesomeLayers', FontAwesomeLayers)
	app.component('FontAwesomeLayersText', FontAwesomeLayersText)
	const emitter = mitt()
	app.provide('emitter', emitter)
	return {
		app,
		router,
		metaManager,
		emitter,
		apolloProvider,
		i18n,
		axios,
		Toast,
		ToastOptions,
		VueSocialSharing,
		FontAwesomeIcon,
		FontAwesomeLayers,
		FontAwesomeLayersText
	}
}
