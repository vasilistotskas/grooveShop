import { useAuthStore } from '~/stores/auth'
import { useAccountStore } from '~/stores/user/account'

export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuthStore()
	const userAccount = useAccountStore()

	if (
		(!auth.isAuthenticated || !userAccount.account?.isSuperuser) &&
		to.path === '/admin'
	) {
		return navigateTo('/')
	}
	if (process.env.NODE_ENV !== 'development' && to.meta.layout === 'testing') {
		return navigateTo('/')
	}
})
