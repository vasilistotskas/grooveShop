import { H3Event } from 'h3'
import { ZodCategory, ZodCategoryCreateRequest } from '~/zod/product/category'
import { parseBodyAs, parseDataAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodCategoryCreateRequest)
	const cookie = event.node.req.headers.cookie
	const response = await fetch(`${config.public.apiBaseUrl}/product/category`, {
		body: JSON.stringify(body),
		headers: {
			Cookie: cookie || ''
		}
	})
	const data = await response.json()
	const status = response.status
	if (status !== 200) {
		throw createError({
			statusCode: status,
			statusMessage: data.detail,
			message: JSON.stringify(data)
		})
	}
	return await parseDataAs(data, ZodCategory)
})
