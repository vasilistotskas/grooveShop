import Product from '@/Pages/Product/Product.vue'
import { RouteParams, RouteRecordRaw } from 'vue-router'
import AllProducts from '@/Pages/Product/AllProducts.vue'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const productRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.ALL_PRODUCTS,
		name: MainRouteNames.ALL_PRODUCTS,
		component: AllProducts,
		props: true,
		meta: {
			breadcrumb: [
				{
					name: 'All Products',
					to: {
						full_path: 'all_products'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.PRODUCT,
		name: MainRouteNames.PRODUCT,
		component: Product,
		props: true,
		meta: {
			breadcrumb: (route: RouteParams): Array<BreadcrumbItemInterface> => [
				{
					name: route.category_slug,
					to: {
						full_path: 'category' + '/' + route.category_slug
					}
				},
				{
					name: route.product_slug,
					to: {
						full_path: 'product' + '/' + route.category_slug + '/' + route.product_slug
					}
				}
			]
		}
	}
]

export default productRoutes
