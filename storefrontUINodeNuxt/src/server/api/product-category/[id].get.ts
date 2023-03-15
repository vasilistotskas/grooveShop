import { H3Event } from 'h3'
import { ZodCategory } from '~/zod/product/category'
import { parseDataAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const response = await fetch(
		`${config.public.apiBaseUrl}/product/category/${event.context.params?.id}`
	)
	return await parseDataAs(response.json(), ZodCategory)
})
