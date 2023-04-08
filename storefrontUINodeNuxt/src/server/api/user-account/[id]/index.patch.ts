import { H3Event } from 'h3'
import { parseBodyAs, parseDataAs, parseParamsAs } from '~/zod/parser'
import { ZodAccount, ZodAccountParams, ZodAccountPatchRequest } from '~/zod/user/account'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const body = await parseBodyAs(event, ZodAccountPatchRequest)
	const cookie = event.node.req.headers.cookie
	const params = parseParamsAs(event, ZodAccountParams)
	const csrftoken = getCookie(event, 'csrftoken') || ''
	// form data
	const response = await fetch(`${config.public.apiBaseUrl}/user/account/${params.id}`, {
		headers: {
			Cookie: cookie || '',
			'X-CSRFToken': csrftoken,
			'Content-Type': 'multipart/form-data',
			method: 'patch'
		},
		body: JSON.stringify(body),
		method: 'patch'
	})
	const data = await response.json()
	return await parseDataAs(data, ZodAccount)
})
