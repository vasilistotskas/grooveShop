import { H3Event } from 'h3'
import { ZodCategory, ZodParams } from '~/zod/product/category'
import { parseDataAs, parseParamsAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const params = parseParamsAs(event, ZodParams)
	const response = await fetch(
		`${config.public.apiBaseUrl}/product/category/${params.id}`
	)
	return await parseDataAs(response.json(), ZodCategory)
})
