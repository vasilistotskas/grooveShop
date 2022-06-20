import { map } from 'lodash'
import store from '@/store'
import { useToast } from 'vue-toastification'
import { _RouteRecordBase, NavigationGuardNext, RouteLocationNormalized, RouteRecord, RouteRecordNormalized } from 'vue-router'

const toast = useToast()

export class RouteModel {
  routeNames: Array<_RouteRecordBase['name']> = []
  routePaths: Array<_RouteRecordBase['path']> = []

  constructor(routes: RouteRecordNormalized[]) {
    map(routes, (route: RouteRecord) => {
      this.routeNames.push(route.name)
      this.routePaths.push(route.path)
    })
  }

  static createRouteModel(routes: Array<RouteRecordNormalized>): RouteModel {
    return new RouteModel(routes)
  }

  static routeBeforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    store.dispatch('auth/initialize').then(() => {
      if (to.matched.some((record) => record.meta.requireLogin) && !store.getters['auth/isAuthenticated']) {
        toast.error('You are not logged in')
        next({ name: 'LogIn', query: { to: to.path } })
      } else {
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
  }
}
