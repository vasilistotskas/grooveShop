import { ZodCategory } from '~/zod/product/category'
import { ZodPagination } from '~/zod/pagination/pagination'
import { parseDataAs } from '~/zod/parser'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const response = await fetch(`${config.public.apiBaseUrl}/category/`)
	return await parseDataAs(response.json(), ZodPagination(ZodCategory))
})
