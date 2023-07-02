import { defineVitestConfig } from 'nuxt-vitest/config'
import { fileURLToPath } from 'node:url'

export default defineVitestConfig({
	test: {
		dir: 'tests',
		testTimeout: 30000,
		setupFiles: ['tests/setup.ts'],
		coverage: {
			reportsDirectory: 'coverage'
		},
		environmentOptions: {
			nuxt: {
				rootDir: fileURLToPath(new URL('./', import.meta.url))
			}
		}
	},
	define: {
		'process.test': 'true'
	}
})
