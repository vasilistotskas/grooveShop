import { useAuthStore } from '~/stores/auth'
import { useAccountStore } from '~/stores/user/account'

export default defineNuxtRouteMiddleware((to, from) => {
	const config = useRuntimeConfig()
	console.log('to', to)
	console.log('from', from)
	// const auth = useAuthStore()
	// const userAccount = useAccountStore()
	//
	// if (!userAccount.account?.isSuperuser && to.path === '/admin') {
	// 	return navigateTo('/')
	// }
	//
	// if (!auth.isAuthenticated && to.meta.layout === 'dashboard') {
	// 	return navigateTo('/')
	// }
	//
	// if (config.nuxtEnvironment !== 'development' && to.meta.layout === 'development') {
	// 	return navigateTo('/')
	// }
})
