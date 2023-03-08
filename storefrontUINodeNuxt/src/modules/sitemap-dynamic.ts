import { dirname } from 'path'
import { defineNuxtModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
	meta: {
		name: '@groove/nuxt-sitemap',
		version: '0.0.1',
		configKey: 'sitemap',
		compatibility: { nuxt: '^3.2.3' }
	},
	defaults: {
		hostname: 'http://localhost:3000'
	},
	// eslint-disable-next-line require-await
	async setup(options, nuxt) {
		const resolver = createResolver(import.meta.url)
		const generatedFilePaths = resolver.resolve(
			nuxt.options.srcDir,
			'sitemap/sitemap-index.xml'
		)
		nuxt.options.nitro.publicAssets = nuxt.options.nitro.publicAssets || []
		nuxt.options.nitro.publicAssets.push({
			baseURL: '/',
			dir: dirname(generatedFilePaths)
		})
		nuxt.hook('nitro:build:before', (nitro) => {
			const paths = []
			const EXCLUDED_KEYWORDS = ['/api/_content', '_payload.js', '200.html']
			nitro.hooks.hook('prerender:route', (route) => {
				const shouldBeAddedToSitemap = EXCLUDED_KEYWORDS.every(
					(excludedKeyword) => !route.route.includes(excludedKeyword)
				)
				if (shouldBeAddedToSitemap) {
					paths.push({ path: route.route })
				}
			})
		})
	}
})
