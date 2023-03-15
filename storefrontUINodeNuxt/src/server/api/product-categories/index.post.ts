import { H3Event } from 'h3'
import { ZodCategory, ZodCreateRequest } from '~/zod/product/category'
import { parseBodyAs, parseDataAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodCreateRequest)
	const response = await fetch(`${config.public.apiBaseUrl}/product/category`, {
		body: JSON.stringify(body)
	})
	return await parseDataAs(response.json(), ZodCategory)
})
