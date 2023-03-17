import { H3Event } from 'h3'
import { parseBodyAs, parseDataAs } from '~/zod/parser'
import { ZodCartItem, ZodCreateRequest } from '~/zod/cart/cart-item'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodCreateRequest)
	const cookie = event.node.req.headers.cookie
	const response = await fetch(`${config.public.apiBaseUrl}/cart/item`, {
		headers: {
			Cookie: cookie || ''
		},
		body: JSON.stringify(body)
	})
	return await parseDataAs(response.json(), ZodCartItem)
})
