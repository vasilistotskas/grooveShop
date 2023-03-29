import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user/user'

export default defineNuxtRouteMiddleware(() => {
	const authStore = useAuthStore()
	const userStore = useUserStore()
	const account = userStore.account
	const isAuthenticated = authStore.isAuthenticated

	if (isAuthenticated && !account) {
		userStore.fetchAccount().then(() => {
			// console.log('========== account fetched ==========')
		})
	}
})
