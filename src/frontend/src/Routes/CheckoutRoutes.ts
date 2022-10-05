import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const checkoutRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.CHECKOUT,
    name: MainRouteNames.CHECKOUT,
    component: () => import('@/Pages/Checkout/Checkout.vue'),
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
            full_path: 'Cart/checkout',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.CHECKOUT_SUCCESS,
    name: MainRouteNames.CHECKOUT_SUCCESS,
    component: () => import('@/Pages/Checkout/CheckoutSuccess.vue'),
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
            full_path: 'Cart/success',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.CHECKOUT_ERROR,
    name: MainRouteNames.CHECKOUT_ERROR,
    component: () => import('@/Pages/Checkout/CheckoutError.vue'),
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
            full_path: 'Cart/error',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
]

export default checkoutRoutes
