import { ModuleOptions as PiniaModuleOptions } from '@pinia/nuxt'
export const pinia: PiniaModuleOptions = {
	autoImports: [
		// automatically imports `defineStore`
		'defineStore', // import { defineStore } from 'pinia'
		['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia',
		'storeToRefs' // import { storeToRefs } from 'pinia'
	]
}
