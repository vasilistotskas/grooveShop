import { useAuthStore } from '~/stores/auth'
import { useAccountStore } from '~/stores/user/account'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore()
	const userStore = useAccountStore()

	await authStore.initAuth().then(() => {
		// console.log('========== authStore initialized ==========')
	})

	if (
		(!authStore.isAuthenticated || !userStore.account?.isSuperuser) &&
		to.path === '/admin'
	) {
		return navigateTo('/')
	}
	if (process.env.NODE_ENV !== 'development' && to.meta.layout === 'testing') {
		return navigateTo('/')
	}
})
