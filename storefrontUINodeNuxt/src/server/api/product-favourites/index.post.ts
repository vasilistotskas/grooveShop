import { H3Event } from 'h3'
import { parseBodyAs, parseDataAs } from '~/zod/parser'
import { ZodFavouriteCreateRequest, ZodFavourite } from '~/zod/product/favourite'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodFavouriteCreateRequest)
	const cookie = event.node.req.headers.cookie
	const regex = /csrftoken=([^;]+)/
	const match = cookie?.match(regex)
	const csrftoken = match ? match[1] : ''
	const response = await fetch(`${config.public.apiBaseUrl}/product/favourite/`, {
		headers: {
			Cookie: cookie || '',
			'X-CSRFToken': csrftoken,
			'Content-Type': 'application/json',
			method: 'post'
		},
		body: JSON.stringify(body),
		method: 'post'
	})
	const data = await response.json()
	const status = response.status
	if (status !== 200 && status !== 201) {
		throw createError({
			statusCode: status,
			statusMessage: data.detail,
			message: JSON.stringify(data)
		})
	}
	return await parseDataAs(data, ZodFavourite)
})
