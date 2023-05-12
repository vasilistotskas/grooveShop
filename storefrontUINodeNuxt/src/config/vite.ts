import IconsResolver from 'unplugin-icons/resolver'
import { UserConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

export const vite: UserConfig = {
	plugins: [
		Components({
			deep: true,
			dts: 'components.d.ts',
			directoryAsNamespace: true,
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
		}),
		Icons({
			compiler: 'vue3'
		})
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					const chunks = ['lodash']
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
