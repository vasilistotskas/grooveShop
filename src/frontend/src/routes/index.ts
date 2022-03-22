import store from '@/store'
import routes from './main.routes'
import { useToast } from 'vue-toastification'
import { RouteModel } from '@/routes/Model/RouteModel'
import { createRouter, createWebHistory } from 'vue-router'

const toast = useToast()

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	}
})

router.beforeEach((to, from, next) => {
	store.dispatch('auth/initialize').then(() => {
		if (to.matched.some(record => record.meta.requireLogin) && !store.getters['auth/isAuthenticated']) {
			toast.error('You are not logged in')
			next({ name: 'LogIn', query: { to: to.path } })
		}
		else {
			next()
		}
	})
	if (to.name === 'Checkout' && !store.getters['cart/getCartTotalLength']) {
		toast.error('Your Cart is Empty...')
		next({ name: 'Cart', query: { to: to.path } })
	}
	if (to.name === 'NotFound') {
		next('/errors/error_404')
	}
})

// @TODO expirimental
const routeNames = RouteModel.createRouteModel(router.getRoutes()).routeNames

export default router

