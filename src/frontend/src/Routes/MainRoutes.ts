import Home from '@/Pages/Home.vue'
import { RouteRecordRaw } from 'vue-router'
import PageNotFound from '@/Pages/PageNotFound.vue'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'

function navigateToErrorPage(to, from, next) {
	next('/errors/error_404')
}

const routes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.HOME,
		name: MainRouteNames.HOME,
		component: Home
	},
	{
		path: MainRoutePaths.PAGE_NOT_FOUND,
		name: MainRouteNames.PAGE_NOT_FOUND,
		component: PageNotFound,
		props: true
	},
	{
		path: MainRoutePaths.NOT_FOUND,
		name: MainRouteNames.NOT_FOUND,
		beforeEnter: [navigateToErrorPage],
		component: {}
	}
]

export default routes
