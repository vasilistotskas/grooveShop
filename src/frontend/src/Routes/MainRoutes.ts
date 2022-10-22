import { RouteRecordRaw } from 'vue-router'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'

const routes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.HOME,
		name: MainRouteNames.HOME,
		component: () => import('@/Pages/Home.vue')
	},
	{
		path: MainRoutePaths.PAGE_NOT_FOUND,
		name: MainRouteNames.PAGE_NOT_FOUND,
		component: () => import('@/Pages/PageNotFound.vue'),
		props: true
	},
	{
		path: MainRoutePaths.NOT_FOUND,
		name: MainRouteNames.NOT_FOUND,
		component: {}
	}
]

export default routes
