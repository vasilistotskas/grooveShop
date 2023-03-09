import { H3Event } from 'h3'
import { Product, ProductQuery } from '~/zod/product/product'
import Paginated from '~/zod/pagination/paginated'
import { buildFullUrl } from '~/helpers/api'

export default defineEventHandler(async (event: H3Event): Promise<Paginated<Product>> => {
	const config = useRuntimeConfig()
	const query = <ProductQuery>getQuery(event)

	const url = buildFullUrl(`${config.public.apiBaseUrl}/product/`, query)
	const response = await fetch(url)
	const products = (await response.json()) as Paginated<Product>

	return products
})
