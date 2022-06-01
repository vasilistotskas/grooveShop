import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const checkoutRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.CHECKOUT,
		name: MainRouteNames.CHECKOUT,
		component: () => import('@/pages/Checkout/Checkout.vue'),
		meta: {
			requireLogin: false,
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				},
				{
					name: 'Checkout',
					to: {
						full_path: 'cart/checkout'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.SUCCESS,
		name: MainRouteNames.SUCCESS,
		component: () => import('@/pages/Checkout/CheckoutSuccess.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				},
				{
					name: 'Checkout Success',
					to: {
						full_path: 'cart/success'
					}
				}
			])
		}
	}
]

export default checkoutRoutes