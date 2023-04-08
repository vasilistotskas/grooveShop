import { H3Event } from 'h3'
import { parseBodyAs, parseDataAs } from '~/zod/parser'
import { ZodReviewCreateRequest, ZodReview } from '~/zod/product/review'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodReviewCreateRequest)
	const cookie = event.node.req.headers.cookie
	const regex = /csrftoken=([^;]+)/
	const match = cookie?.match(regex)
	const csrftoken = match ? match[1] : ''
	const response = await fetch(
		`${config.public.apiBaseUrl}/product/review/?expand=true`,
		{
			headers: {
				Cookie: cookie || '',
				'X-CSRFToken': csrftoken,
				'Content-Type': 'application/json',
				method: 'post'
			},
			body: JSON.stringify(body),
			method: 'post'
		}
	)
	const data = await response.json()
	return await parseDataAs(data, ZodReview)
})
