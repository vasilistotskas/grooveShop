import Toast, { PluginOptions, POSITION, TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const ToastOptions: PluginOptions = {
	toastDefaults: {
		[TYPE.ERROR]: {
			timeout: 5000,
			closeButton: false
		},
		[TYPE.SUCCESS]: {
			timeout: 5000,
			hideProgressBar: true
		}
	},
	position: POSITION.TOP_RIGHT
}
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Toast, ToastOptions)
})
