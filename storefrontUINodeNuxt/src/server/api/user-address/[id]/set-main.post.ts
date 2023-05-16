import { H3Event } from 'h3'
import { ZodAddress, ZodAddressParams } from '~/zod/user/address'
import { parseDataAs, parseParamsAs } from '~/zod/parser'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const params = parseParamsAs(event, ZodAddressParams)
	const cookie = event.node.req.headers.cookie
	const response = await $fetch(
		`${config.public.apiBaseUrl}/user/address/${params.id}/set-main`,
		{
			headers: {
				Cookie: cookie || ''
			}
		}
	)
	return await parseDataAs(response, ZodAddress)
})
