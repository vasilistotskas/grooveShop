import { H3Event } from 'h3'
import { parseBodyAs, parseCookieAs, parseDataAs } from '~/zod/parser'
import { ZodReviewCreateRequest, ZodReview } from '~/zod/product/review'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodReviewCreateRequest)
	const cookie = event.node.req.headers.cookie
	const cookies = parseCookies(event)
	const csrftoken = getCookie(event, 'csrftoken') || ''
	const response = await $fetch(
		`${config.public.apiBaseUrl}/product/review/?expand=true`,
		{
			headers: {
				Cookie: JSON.stringify(cookies),
				'X-CSRFToken': csrftoken,
				'Content-Type': 'application/json',
				method: 'post'
			},
			body: JSON.stringify(body),
			method: 'post'
		}
	)
	return await parseDataAs(response, ZodReview)
})
