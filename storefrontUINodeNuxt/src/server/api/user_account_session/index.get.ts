import { H3Event } from 'h3'
import { parseDataAs } from '~/zod/parser'
import { ZodAccount } from '~/zod/user/account'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const cookie = event.node.req.headers.cookie
	const response = await fetch(`${config.public.apiBaseUrl}/user/account/session/`, {
		headers: {
			Cookie: cookie || ''
		}
	})
	return await parseDataAs(response.json(), ZodAccount)
})
