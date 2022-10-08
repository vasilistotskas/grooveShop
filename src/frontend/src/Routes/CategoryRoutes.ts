import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const categoryRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.CATEGORY,
    name: MainRouteNames.CATEGORY,
    component: () => import('@/Pages/Category/Category.vue'),
    props: true,
    meta: {
      breadcrumb: (route: Record<string, string>): Array<BreadcrumbItemInterface> => [
        {
          name: 'Category - ' + route.category_slug,
          to: {
            full_path: 'category' + '/' + route.category_slug,
          },
        },
      ],
    },
  },
]

export default categoryRoutes
