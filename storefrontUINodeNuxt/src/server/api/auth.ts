import { H3Event } from 'h3'
import { Session } from '~/zod/auth/session'
export default defineEventHandler(
	async (event: H3Event): Promise<Session | undefined> => {
		const config = useRuntimeConfig()

		const response = await fetch(`${config.public.apiBaseUrl}/session`)
		const session = (await response.json()) as Session

		return {
			isAuthenticated: session?.isAuthenticated
		}
	}
)
