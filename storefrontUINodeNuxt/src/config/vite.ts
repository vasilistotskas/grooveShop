import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { UserConfig } from 'vite'

export const vite: UserConfig = {
	plugins: [
		UnpluginComponentsVite({
			dts: true,
			resolvers: [
				IconsResolver({
					prefix: 'Icon',
					enabledCollections: [
						'bi',
						'clarity',
						'entypo',
						'fa6-solid',
						'fa-solid',
						'ic',
						'la',
						'mdi',
						'uil',
						'fluent'
					]
				})
			]
		})
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					const chunks = ['vue', 'lodash']
					if (id.includes('/node_modules/')) {
						for (const chunkName of chunks) {
							if (id.includes(chunkName)) {
								return chunkName
							}
						}
					}
				}
			}
		}
	},
	server: {
		hmr: {
			protocol: process.env.NODE_ENV === 'production' ? 'wss' : 'ws',
			clientPort: 24678,
			path: 'hmr/'
		},
		watch: {
			usePolling: false // process.env.NODE_ENV !== 'production'
		}
	}
}
