import { H3Event } from 'h3'
import { Product } from '~/zod/product/product'
import Paginated from '~/zod/pagination/paginated'

export default defineEventHandler(async (event: H3Event): Promise<Paginated<Product>> => {
	const config = useRuntimeConfig()
	const query = getQuery(event)
	console.log('query', query)

	const response = await fetch(
		`${config.public.apiBaseUrl}/product/?limit=${query.limit}&offset=${query.offset}`
	)
	const products = (await response.json()) as Paginated<Product>

	return products
})
