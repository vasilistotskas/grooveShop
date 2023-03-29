import { H3Event } from 'h3'
import { parseParamsAs } from '~/zod/parser'
import { ZodParams } from '~/zod/cart/cart-item'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const cookie = event.node.req.headers.cookie
	const params = parseParamsAs(event, ZodParams)
	const regex = /csrftoken=([^;]+)/
	const match = cookie?.match(regex)
	const csrftoken = match ? match[1] : ''

	const response = await fetch(
		`${config.public.apiBaseUrl}/product/favourite/${params.id}`,
		{
			headers: {
				Cookie: cookie || '',
				'X-CSRFToken': csrftoken,
				'Content-Type': 'application/json',
				method: 'delete'
			},
			method: 'delete'
		}
	)
	const status = response.status
	if (status !== 200) {
		throw createError({
			statusCode: status,
			statusMessage: response.statusText,
			message: JSON.stringify(response)
		})
	}
	return setResponseStatus(status, response.statusText)
})
