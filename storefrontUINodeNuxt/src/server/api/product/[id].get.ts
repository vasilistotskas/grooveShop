import { H3Event } from 'h3'
import { Product } from '~/zod/product/product'

export default defineEventHandler(
	async (event: H3Event): Promise<{ product: Product }> => {
		const config = useRuntimeConfig()

		const response = await fetch(
			`${config.public.apiBaseUrl}/product/${event.context.params?.id}`
		)
		const product = (await response.json()) as Product

		return {
			product
		}
	}
)
