import { H3Event } from 'h3'
import { ZodPagination } from '~/zod/pagination/pagination'
import { buildFullUrl } from '~/helpers/api'
import { parseDataAs, parseQueryAs } from '~/zod/parser'
import { ZodImage, ZodImageQuery } from '~/zod/product/image'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const query = parseQueryAs(event, ZodImageQuery)
	const cookie = event.node.req.headers.cookie
	const url = buildFullUrl(`${config.public.apiBaseUrl}/product/images/`, query)
	const response = await fetch(url, {
		headers: {
			Cookie: cookie || ''
		}
	})
	const data = await response.json()
	const status = response.status
	if (status !== 200) {
		throw createError({
			statusCode: status,
			statusMessage: data.detail,
			message: JSON.stringify(data)
		})
	}
	return await parseDataAs(data, ZodPagination(ZodImage))
})
