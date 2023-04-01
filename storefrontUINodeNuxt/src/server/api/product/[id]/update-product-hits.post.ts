import { H3Event } from 'h3'
import { ZodProductParams, ZodProduct } from '~/zod/product/product'
import { parseDataAs, parseParamsAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const params = parseParamsAs(event, ZodProductParams)
	const cookie = event.node.req.headers.cookie
	const response = await fetch(
		`${config.public.apiBaseUrl}/product/${params.id}/update_product_hits`,
		{
			headers: {
				Cookie: cookie || ''
			}
		}
	)
	const data = await response.json()
	const status = response.status
	if (status !== 200) {
		throw createError({
			statusCode: status,
			statusMessage: data.detail,
			message: JSON.stringify(data)
		})
	}
	return await parseDataAs(data, ZodProduct)
})
