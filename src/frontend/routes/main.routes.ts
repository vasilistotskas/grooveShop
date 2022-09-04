import { RouteRecordRaw } from 'vue-router'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'

const routes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.HOME,
    name: MainRouteNames.HOME,
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: MainRoutePaths.PAGE_NOT_FOUND,
    name: MainRouteNames.PAGE_NOT_FOUND,
    component: () => import('@/pages/PageNotFound.vue'),
    props: true,
  },
  {
    path: MainRoutePaths.NOT_FOUND,
    name: MainRouteNames.NOT_FOUND,
    component: {},
  },
]

export default routes
