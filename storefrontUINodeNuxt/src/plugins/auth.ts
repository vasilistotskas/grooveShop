import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
	addRouteMiddleware(
		'auth',
		async () => {
			const auth = useAuthStore()
			await auth.initAuth()
		},
		{ global: true }
	)
})
