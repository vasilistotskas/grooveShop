import { H3Event } from 'h3'
import { ZodCreateRequest, ZodProduct } from '~/zod/product/product'
import { parseBodyAs, parseDataAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodCreateRequest)
	const response = await fetch(`${config.public.apiBaseUrl}/product`, {
		body: JSON.stringify(body)
	})
	return await parseDataAs(response.json(), ZodProduct)
})
