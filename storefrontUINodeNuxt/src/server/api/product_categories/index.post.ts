import { H3Event } from 'h3'
import { CreateRequest, Category } from '~/zod/product/category'

export default defineEventHandler(async (event: H3Event): Promise<Category> => {
	const config = useRuntimeConfig()
	const query = getQuery(event)
	const body = <CreateRequest>await readBody(event)

	const response = await fetch(`${config.public.apiBaseUrl}/product/category`, {
		body: JSON.stringify(body)
	})
	const category = (await response.json()) as Category

	return category
})
