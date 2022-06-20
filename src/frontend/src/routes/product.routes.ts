import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const productRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.ALL_PRODUCTS,
    name: MainRouteNames.ALL_PRODUCTS,
    component: () => import('@/pages/Product/AllProducts.vue'),
    props: true,
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'All Products',
          to: {
            full_path: 'all_products',
          },
        },
      ],
    },
  },
  {
    path: MainRoutePaths.PRODUCT,
    name: MainRouteNames.PRODUCT,
    component: () => import('@/pages/Product/Product.vue'),
    props: true,
    meta: {
      breadcrumb: (route: Record<string, string>): Array<BreadcrumbItemInterface> => [
        {
          name: route.category_slug,
          to: {
            full_path: 'category' + '/' + route.category_slug,
          },
        },
        {
          name: route.product_slug,
          to: {
            full_path: 'product' + '/' + route.category_slug + '/' + route.product_slug,
          },
        },
      ],
    },
  },
]

export default productRoutes
