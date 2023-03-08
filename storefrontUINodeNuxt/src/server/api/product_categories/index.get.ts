import { H3Event } from 'h3'
import { Category } from '~/zod/product/category'
import Paginated from '~/zod/pagination/paginated'

export default defineEventHandler(
	async (event: H3Event): Promise<Paginated<Category>> => {
		const config = useRuntimeConfig()
		const query = getQuery(event)

		const response = await fetch(
			`${config.public.apiBaseUrl}/product/category/?limit=${query.limit}&offset=${query.offset}&ordering=${query.ordering}`
		)
		const categories = (await response.json()) as Paginated<Category>

		return categories
	}
)
