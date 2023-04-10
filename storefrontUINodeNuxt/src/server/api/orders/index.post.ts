import { H3Event } from 'h3'
import { parseBodyAs, parseDataAs } from '~/zod/parser'
import { ZodOrder, ZodOrderCreateRequest } from '~/zod/order/order'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodOrderCreateRequest)
	const cookie = event.node.req.headers.cookie
	const response = await fetch(`${config.public.apiBaseUrl}/order`, {
		body: JSON.stringify(body),
		headers: {
			Cookie: cookie || ''
		}
	})
	const data = await response.json()
	return await parseDataAs(data, ZodOrder)
})
