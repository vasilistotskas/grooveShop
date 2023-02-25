import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
	addRouteMiddleware(
		'auth',
		() => {
			const auth = useAuthStore()
			auth.initAuth()
		},
		{ global: true }
	)
})
