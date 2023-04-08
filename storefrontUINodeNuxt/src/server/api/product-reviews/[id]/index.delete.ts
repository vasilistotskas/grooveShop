import { H3Event } from 'h3'
import { z } from 'zod'
import { parseDataAs, parseParamsAs } from '~/zod/parser'
import { ZodReviewParams } from '~/zod/product/review'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
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
				method: 'delete'
			},
			method: 'delete'
		}
	)
	const status = response.status
	return parseDataAs(status, z.number())
})
