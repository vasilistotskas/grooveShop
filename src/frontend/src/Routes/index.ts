import routes from '@/Routes/MainRoutes'
import authRoutes from '@/Routes/AuthRoutes'
import userRoutes from '@/Routes/UserRoutes'
import cartRoutes from '@/Routes/CartRoutes'
import searchRoutes from '@/Routes/SearchRoutes'
import productRoutes from '@/Routes/ProductRoutes'
import checkoutRoutes from '@/Routes/CheckoutRoutes'
import categoryRoutes from '@/Routes/CategoryRoutes'
import { RouteModel } from '@/Routes/Model/RouteModel'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		...routes,
		...authRoutes,
		...userRoutes,
		...cartRoutes,
		...searchRoutes,
		...productRoutes,
		...checkoutRoutes,
		...categoryRoutes
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	}
})

router.beforeEach((to, from, next) => {
	new RouteModel().routeBeforeEach(to, from, next)
})

export default router
