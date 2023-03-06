import { H3Event } from 'h3'
import { Product } from '~/zod/product/product'

export default defineEventHandler(async (event: H3Event): Promise<Product> => {
	const config = useRuntimeConfig()
	const body = await readBody(event)

	const response = await fetch(
		`${config.public.apiBaseUrl}/product/${event.context.params?.id}/update_product_hits`,
		{
			body: JSON.stringify(body)
		}
	)
	const product = (await response.json()) as Product

	return product
})
