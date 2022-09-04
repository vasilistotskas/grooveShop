import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const categoryRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.CATEGORY,
    name: MainRouteNames.CATEGORY,
    component: () => import('@/pages/Category/Category.vue'),
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
