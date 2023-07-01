import { describe, expect, it, test } from 'vitest'
import { $fetch, isDev, setup } from '@nuxt/test-utils-edge'

describe('example', async () => {
	await setup({
		rootDir: __dirname,
		server: true
	})

	test('my test', () => {
		expect(true).toBe(true)
	})

	it('Renders DeepWeb', async () => {
		expect(await $fetch('/')).toMatch('DeepWeb')
	})

	if (isDev()) {
		it('[dev] ensure vite client script is added', async () => {
			expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
		})
	}
})
