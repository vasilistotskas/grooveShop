import { useAuthStore } from '~/stores/auth'
import { useAccountStore } from '~/stores/user/account'

export default defineNuxtRouteMiddleware((to, from) => {
	const config = useRuntimeConfig()
	const auth = useAuthStore()
	const userAccount = useAccountStore()

	if (!userAccount.account?.isSuperuser && to.path === '/admin') {
		if (process.client) return (window.location.href = config.public.baseUrl)
	}

	if (!auth.isAuthenticated && to.meta.layout === 'dashboard') {
		if (process.client) return (window.location.href = config.public.baseUrl)
	}
})
