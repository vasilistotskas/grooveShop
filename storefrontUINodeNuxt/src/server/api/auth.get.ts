import { H3Event } from 'h3'
import { Session } from '~/zod/auth/session'
export default defineEventHandler(
	async (event: H3Event): Promise<Session | undefined> => {
		const config = useRuntimeConfig()

		const response = await fetch(`${config.public.apiBaseUrl}/session`)
		const responseJson = await response.json()

		const session = responseJson as Session

		console.log('session', session)
		return {
			isAuthenticated: session?.isAuthenticated
		}
	}
)
