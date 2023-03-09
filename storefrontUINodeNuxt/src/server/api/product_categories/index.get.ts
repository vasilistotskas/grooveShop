import { H3Event } from 'h3'
import { Category } from '~/zod/product/category'
import Paginated from '~/zod/pagination/paginated'
import { buildFullUrl } from '~/helpers/api'

export default defineEventHandler(
	async (event: H3Event): Promise<Paginated<Category>> => {
		const config = useRuntimeConfig()
		const query = getQuery(event)

		const url = buildFullUrl(`${config.public.apiBaseUrl}/category/`, query)
		const response = await fetch(url)
		const categories = (await response.json()) as Paginated<Category>

		return categories
	}
)
