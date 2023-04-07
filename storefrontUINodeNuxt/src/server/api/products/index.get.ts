import { H3Event } from 'h3'
import { ZodProduct } from '~/zod/product/product'
import { ZodPagination } from '~/zod/pagination/pagination'
import { buildFullUrl } from '~/helpers/api'
import { parseDataAs, parseQueryAs } from '~/zod/parser'
import { ZodProductsQuery } from '~/zod/products/products'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const query = parseQueryAs(event, ZodProductsQuery)
	const cookie = event.node.req.headers.cookie
	const url = buildFullUrl(`${config.public.apiBaseUrl}/product/`, query)
	const response = await fetch(url, {
		headers: {
			Cookie: cookie || ''
		}
	})
	const data = await response.json()
	return await parseDataAs(data, ZodPagination(ZodProduct))
})
