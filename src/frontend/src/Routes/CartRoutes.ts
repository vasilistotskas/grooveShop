import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const cartRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.CART,
		name: MainRouteNames.CART,
		component: () => import('@/Pages/Cart/Cart.vue'),
		meta: {
			breadcrumb: [
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	}
]

export default cartRoutes
