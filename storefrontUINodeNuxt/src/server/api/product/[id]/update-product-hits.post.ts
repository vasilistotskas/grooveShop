import { H3Event } from 'h3'
import { ZodProduct } from '~/zod/product/product'
import { parseDataAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const response = await fetch(
		`${config.public.apiBaseUrl}/product/${event.context.params?.id}/update_product_hits`
	)
	return await parseDataAs(response.json(), ZodProduct)
})
