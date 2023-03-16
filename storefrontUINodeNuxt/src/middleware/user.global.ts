import { useAuthStore } from '~/stores/auth'
import { useAccountStore } from '~/stores/user/account'

export default defineNuxtRouteMiddleware(async () => {
	const auth = useAuthStore()
	const userAccount = useAccountStore()
	const account = userAccount.account
	const isAuthenticated = auth.isAuthenticated

	if (isAuthenticated && !account) {
		await userAccount.fetchAccount()
	}
})
