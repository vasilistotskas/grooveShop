import { H3Event } from 'h3'
import { parseDataAs } from '~/zod/parser'
import { ZodCart } from '~/zod/cart/cart'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const cookie = event.node.req.headers.cookie
	const response = await fetch(`${config.public.apiBaseUrl}/cart`, {
		headers: {
			Cookie: cookie || ''
		}
	})
	const data = await response.json()
	return await parseDataAs(data, ZodCart)
})
