import { H3Event } from 'h3'
import { parseParamsAs } from '~/zod/parser'
import { ZodParams } from '~/zod/cart/cart-item'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const cookie = event.node.req.headers.cookie
	const params = parseParamsAs(event, ZodParams)
	const response = await fetch(`${config.public.apiBaseUrl}/cart/item/${params.id}`, {
		headers: {
			Cookie: cookie || ''
		}
	})
	return setResponseStatus(response.status, response.statusText)
})
