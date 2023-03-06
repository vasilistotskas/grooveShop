import { useAuthStore } from '~/stores/auth'
import { useAccountStore } from '~/stores/user/account'

export default defineNuxtRouteMiddleware((to, from) => {
	const config = useRuntimeConfig()
	const auth = useAuthStore()
	const userAccount = useAccountStore()

	if (
		(!auth.isAuthenticated || !userAccount.account?.isSuperuser) &&
		to.path === '/admin'
	) {
		return navigateTo('/')
	}
	if (config.nuxtEnvironment !== 'development' && to.meta.layout === 'testing') {
		return navigateTo('/')
	}
})
