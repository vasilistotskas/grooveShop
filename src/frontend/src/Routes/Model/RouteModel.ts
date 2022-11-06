import {
	_RouteRecordBase,
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecord,
	RouteRecordNormalized
} from 'vue-router'
import { map } from 'lodash'
import { useToast } from 'vue-toastification'
import CartModule from '@/State/Cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'

const toast = useToast()

export class RouteModel {
	routeNames: Array<_RouteRecordBase['name']> = []
	routePaths: Array<_RouteRecordBase['path']> = []
	authModule = getModule(AuthModule)
	cartModule = getModule(CartModule)
	userModule = getModule(UserModule)
	countryModule = getModule(CountryModule)
	productReviewModule = getModule(ProductReviewModule)

	constructor(routes?: RouteRecordNormalized[]) {
		map(routes, (route: RouteRecord) => {
			this.routeNames.push(route.name)
			this.routePaths.push(route.path)
		})
	}

	static createRouteModel(routes: Array<RouteRecordNormalized>): RouteModel {
		return new RouteModel(routes)
	}

	routeBeforeEach(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	): void {
		this.cartModule.initializeCart()
		this.countryModule.fetchCountriesFromRemote()
		this.authModule.initialize().then(() => {
			if (this.authModule.isAuthenticated) {
				this.userModule.fetchUserDataFromRemote().then(() => {
					this.productReviewModule.fetchCurrentUserReviews(this.userModule.getUserData.id)
				})
			}
			if (
				to.matched.some((record) => record.meta.requireLogin) &&
				!this.authModule.isAuthenticated
			) {
				toast.error('You are not logged in')
				next({ name: 'LogIn', query: { to: to.path } })
			} else {
				next()
			}
		})
		if (to.name === 'Checkout' && !this.cartModule.getCartTotalLength) {
			toast.error('Your Cart is Empty...')
			next({ name: 'Cart', query: { to: to.path } })
		}
		if (to.name === 'NotFound') {
			next('/errors/error_404')
		}
	}
}
