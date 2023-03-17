import { H3Event } from 'h3'
import { parseBodyAs, parseDataAs, parseParamsAs } from '~/zod/parser'
import { ZodCartItem, ZodPutRequest, ZodParams } from '~/zod/cart/cart-item'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodPutRequest)
	const cookie = event.node.req.headers.cookie
	const params = parseParamsAs(event, ZodParams)
	const response = await fetch(`${config.public.apiBaseUrl}/cart/item/${params.id}`, {
		headers: {
			Cookie: cookie || ''
		},
		body: JSON.stringify(body)
	})
	return await parseDataAs(response.json(), ZodCartItem)
})
