import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const checkoutRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.CHECKOUT,
    name: MainRouteNames.CHECKOUT,
    component: () => import('@/pages/Checkout/Checkout.vue'),
    meta: {
      requireLogin: false,
      breadcrumb: [
        {
          name: 'Cart',
          to: {
            full_path: 'cart',
          },
        },
        {
          name: 'Checkout',
          to: {
            full_path: 'cart/checkout',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.CHECKOUT_SUCCESS,
    name: MainRouteNames.CHECKOUT_SUCCESS,
    component: () => import('@/pages/Checkout/CheckoutSuccess.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Cart',
          to: {
            full_path: 'cart',
          },
        },
        {
          name: 'Checkout Success',
          to: {
            full_path: 'cart/success',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.CHECKOUT_ERROR,
    name: MainRouteNames.CHECKOUT_ERROR,
    component: () => import('@/pages/Checkout/CheckoutError.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Cart',
          to: {
            full_path: 'cart',
          },
        },
        {
          name: 'Checkout Error',
          to: {
            full_path: 'cart/error',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
]

export default checkoutRoutes
