import { H3Event } from 'h3'
import { parseBodyAs, parseDataAs, parseParamsAs } from '~/zod/parser'
import { ZodReview, ZodReviewParams, ZodReviewPutRequest } from '~/zod/product/review'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodReviewPutRequest)
	const cookie = event.node.req.headers.cookie
	const params = parseParamsAs(event, ZodReviewParams)
	const regex = /csrftoken=([^;]+)/
	const match = cookie?.match(regex)
	const csrftoken = match ? match[1] : ''
	const response = await fetch(
		`${config.public.apiBaseUrl}/product/review/${params.id}`,
		{
			headers: {
				Cookie: cookie || '',
				'X-CSRFToken': csrftoken,
				'Content-Type': 'application/json',
				method: 'put'
			},
			body: JSON.stringify(body),
			method: 'put'
		}
	)
	const data = await response.json()
	const status = response.status
	if (status !== 200) {
		throw createError({
			statusCode: status,
			statusMessage: data.detail,
			message: JSON.stringify(data)
		})
	}
	return await parseDataAs(data, ZodReview)
})
