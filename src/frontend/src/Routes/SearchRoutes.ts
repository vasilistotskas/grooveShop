import { RouteRecordRaw } from 'vue-router'
import Search from '@/Pages/Search/Search.vue'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const searchRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.SEARCH,
		name: MainRouteNames.SEARCH,
		component: Search,
		meta: {
			breadcrumb: [
				{
					name: 'Search',
					to: {
						full_path: 'search'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	}
]

export default searchRoutes
