import { H3Event } from 'h3'
import { Category } from '~/zod/product/category'

export default defineEventHandler(async (event: H3Event): Promise<Category> => {
	const config = useRuntimeConfig()

	const response = await fetch(
		`${config.public.apiBaseUrl}/product/category/${event.context.params?.id}`
	)
	const category = (await response.json()) as Category

	return category
})
