import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const cartRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.CART,
    name: MainRouteNames.CART,
    component: () => import('@/pages/Cart/Cart.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'Cart',
          to: {
            full_path: 'cart',
          },
        },
      ],
    },
  },
]

export default cartRoutes
