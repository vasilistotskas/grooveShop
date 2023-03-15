import { ModuleOptions as ImageModuleOptions } from '@nuxt/image-edge'
export const image: Partial<ImageModuleOptions> = {
	screens: {
		xs: 320,
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		xxl: 1536,
		'2xl': 1536
	},
	presets: {
		productCard: {
			modifiers: {
				format: 'webp',
				width: 250,
				height: 230,
				fit: 'cover',
				loading: 'lazy',
				background: 'transparent'
			}
		}
	}
}
