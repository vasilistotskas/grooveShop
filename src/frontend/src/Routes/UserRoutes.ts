import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.USER_ACCOUNT,
    name: MainRouteNames.USER_ACCOUNT,
    component: () => import('@/Pages/User/UserAccount.vue'),
    meta: {
      requireLogin: true,
      breadcrumb: [
        {
          name: 'User Account',
          to: {
            full_path: 'user-account',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
    children: [
      {
        path: MainRoutePaths.USER_ACCOUNT_ORDERS,
        name: MainRouteNames.USER_ACCOUNT_ORDERS,
        component: () => import('@/Pages/User/UserOrderHistory.vue'),
        meta: {
          breadcrumb: [
            {
              name: 'User Account',
              to: {
                full_path: 'user-account',
              },
            },
            {
              name: 'User Orders',
              to: {
                full_path: 'User-account/orders',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_SETTINGS,
        name: MainRouteNames.USER_ACCOUNT_SETTINGS,
        component: () => import('@/Pages/User/UserSettings.vue'),
        meta: {
          breadcrumb: [
            {
              name: 'User Account',
              to: {
                full_path: 'user-account',
              },
            },
            {
              name: 'User Settings',
              to: {
                full_path: 'User-account/settings',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_FAVOURITES,
        name: MainRouteNames.USER_ACCOUNT_FAVOURITES,
        component: () => import('@/Pages/User/UserFavourites.vue'),
        meta: {
          breadcrumb: [
            {
              name: 'User Account',
              to: {
                full_path: 'user-account',
              },
            },
            {
              name: 'User Favourites',
              to: {
                full_path: 'User-account/favourites',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_REVIEWS,
        name: MainRouteNames.USER_ACCOUNT_REVIEWS,
        component: () => import('@/Pages/User/UserReviews.vue'),
        meta: {
          breadcrumb: [
            {
              name: 'User Account',
              to: {
                full_path: 'user-account',
              },
            },
            {
              name: 'User Reviews',
              to: {
                full_path: 'User-account/reviews',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_PASSWORD,
        name: MainRouteNames.USER_ACCOUNT_PASSWORD,
        component: () => import('@/Pages/User/UserPassword.vue'),
        meta: {
          breadcrumb: [
            {
              name: 'User Account',
              to: {
                full_path: 'user-account',
              },
            },
            {
              name: 'My Password',
              to: {
                full_path: 'User-account/Password',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
    ],
  },
]

export default userRoutes
