import { RouteRecordRaw } from 'vue-router'
import { useToast } from 'vue-toastification'
import CartModule from '@/State/Cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import Checkout from '@/Pages/Checkout/Checkout.vue'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import CheckoutError from '@/Pages/Checkout/CheckoutError.vue'
import CheckoutSuccess from '@/Pages/Checkout/CheckoutSuccess.vue'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const toast = useToast()

function checkCartTotalLength(to, from, next) {
	const cartModule = getModule(CartModule)

	if (!cartModule.getCartTotalLength) {
		toast.error('Your Cart is Empty...')
		next({ name: 'Cart', query: { to: to.path } })
	} else {
		next()
	}
}

const checkoutRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.CHECKOUT,
		name: MainRouteNames.CHECKOUT,
		beforeEnter: [checkCartTotalLength],
		component: Checkout,
		meta: {
			requireLogin: false,
			breadcrumb: [
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				},
				{
					name: 'Checkout',
					to: {
						full_path: 'Cart/checkout'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.CHECKOUT_SUCCESS,
		name: MainRouteNames.CHECKOUT_SUCCESS,
		component: CheckoutSuccess,
		meta: {
			breadcrumb: [
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				},
				{
					name: 'Checkout Success',
					to: {
						full_path: 'Cart/success'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.CHECKOUT_ERROR,
		name: MainRouteNames.CHECKOUT_ERROR,
		component: CheckoutError,
		meta: {
			breadcrumb: [
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				},
				{
					name: 'Checkout Error',
					to: {
						full_path: 'Cart/error'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	}
]

export default checkoutRoutes
