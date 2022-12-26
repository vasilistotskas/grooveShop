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
import AppModule from '@/State/App/AppModule'

const toast = useToast()

export class RouteModel {
	routeNames: Array<_RouteRecordBase['name']> = []
	routePaths: Array<_RouteRecordBase['path']> = []
	appModule = getModule(AppModule)
	userModule = getModule(UserModule)
	authModule = getModule(AuthModule)
	cartModule = getModule(CartModule)

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
		this.appModule.setLoading(true)
		this.cartModule.initializeCart()
		this.authModule.initialize().then(() => {
			if (this.authModule.isAuthenticated) {
				this.userModule.fetchUserProfileFromRemote()
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
	}

	routeAfterEach(): void {
		this.appModule.setLoading(false)
	}
}
