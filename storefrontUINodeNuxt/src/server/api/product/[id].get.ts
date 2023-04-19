import { H3Event } from 'h3'
import { ZodProductParams, ZodProduct } from '~/zod/product/product'
import { parseDataAs, parseParamsAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const params = parseParamsAs(event, ZodProductParams)
	const cookie = event.node.req.headers.cookie
	const response = await $fetch(`${config.public.apiBaseUrl}/product/${params.id}`, {
		headers: {
			Cookie: cookie || ''
		}
	})
	return await parseDataAs(response, ZodProduct)
})
