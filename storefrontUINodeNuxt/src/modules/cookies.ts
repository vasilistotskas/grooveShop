import { resolve } from 'node:path'
import {
	defineNuxtModule,
	addPlugin,
	extendWebpackConfig,
	addTemplate,
	createResolver
} from '@nuxt/kit'
import { Nuxt } from '@nuxt/schema'

import { name, version } from '../package.json'
import { DEFAULTS, ModuleOptions } from '../runtime/cookies/types'

const resolver = createResolver(import.meta.url)
const runtimeDir = resolver.resolve('../runtime/cookies')

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name,
		version,
		configKey: 'cookieControl',
		compatibility: { nuxt: '^3.0.0' }
	},
	defaults: DEFAULTS,
  // eslint-disable-next-line require-await
	async setup(moduleOptions, nuxt) {
		nuxt.options.alias['#cookie-control/set-vars'] = moduleOptions.isCssPonyfillEnabled
			? resolve(runtimeDir, 'set-vars/ponyfill')
			: resolve(runtimeDir, 'set-vars/native')

		nuxt.options.alias['#cookie-control'] = runtimeDir
		nuxt.options.build.transpile.push(runtimeDir)

		pushCss(moduleOptions, nuxt)
		blockIframes(moduleOptions)

		addPlugin(resolve(runtimeDir, 'plugin'))
		addTemplate({
			filename: 'cookie-control-options.ts',
			write: true,
			getContents: () =>
				`import { ModuleOptions } from '../runtime/cookies/types'\n\nexport default ${JSON.stringify(
					moduleOptions,
					undefined,
					2
				)} as ModuleOptions`
		})
	}
})

const blockIframes = (moduleOptions: ModuleOptions) => {
	if (moduleOptions.isIframeBlocked) {
		const isIframeBlocked = {
			name: 'functional',
			initialState:
				typeof moduleOptions.isIframeBlocked !== 'boolean' &&
				moduleOptions.isIframeBlocked.initialState !== undefined
					? moduleOptions.isIframeBlocked.initialState
					: true
		}

		if (moduleOptions.cookies) {
			if (moduleOptions.cookies.optional) {
				moduleOptions.cookies.optional.push(isIframeBlocked)
			} else {
				moduleOptions.cookies.optional = [isIframeBlocked]
			}
		}

		extendWebpackConfig((config) => {
			config.module?.rules?.push({
				test: /\.vue$/,
				loader: 'string-replace-loader',
				exclude: /node_modules/,
				options: {
					multiple: [
						{ search: '<iframe', replace: '<CookieIframe', flags: 'g' },
						{ search: '</iframe>', replace: '</CookieIframe>', flags: 'g' }
					]
				}
			})
		})
	}
}

const pushCss = (moduleOptions: ModuleOptions, nuxt: Nuxt) => {
	if (moduleOptions.isCssEnabled) nuxt.options.css.push(resolve(runtimeDir, 'styles.css'))
}
