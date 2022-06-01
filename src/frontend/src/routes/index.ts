import routes from './main.routes'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import cartRoutes from './cart.routes'
import blogRoutes from './blog.routes'
import searchRoutes from './search.routes'
import productRoutes from './product.routes'
import checkoutRoutes from './checkout.routes'
import categoryRoutes from './category.routes'
import { RouteModel } from '@/routes/Model/RouteModel'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes:[
		...routes,
		...authRoutes,
		...userRoutes,
		...cartRoutes,
		...blogRoutes,
		...searchRoutes,
		...productRoutes,
		...checkoutRoutes,
		...categoryRoutes,
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
	RouteModel.routeBeforeEach(to, from, next)
})

// @TODO experimental
const routeNames = RouteModel.createRouteModel(router.getRoutes()).routeNames

export default router


