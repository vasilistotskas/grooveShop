import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const searchRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.SEARCH,
		name: MainRouteNames.SEARCH,
		component: () => import('@/pages/Search/Search.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Search',
					to: {
						full_path: 'search'
					}
				}
			])
		}
	}
]

export default searchRoutes