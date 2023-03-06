import { H3Event } from 'h3'
import { CreateRequest, Product } from '~/zod/product/product'

export default defineEventHandler(async (event: H3Event): Promise<Product> => {
	const config = useRuntimeConfig()
	const query = getQuery(event)
	const body = <CreateRequest>await readBody(event)
	console.log('query', query)
	console.log('body', body)

	const response = await fetch(`${config.public.apiBaseUrl}/product`, {
		body: JSON.stringify(body)
	})
	const product = (await response.json()) as Product

	return product
})
