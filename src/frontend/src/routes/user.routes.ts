import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.USER_ACCOUNT,
    name: MainRouteNames.USER_ACCOUNT,
    component: () => import('@/pages/User/UserAccount.vue'),
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
        component: () => import('@/pages/User/UserOrderHistory.vue'),
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
                full_path: 'user-account/orders',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_SETTINGS,
        name: MainRouteNames.USER_ACCOUNT_SETTINGS,
        component: () => import('@/pages/User/UserSettings.vue'),
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
                full_path: 'user-account/settings',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_FAVOURITES,
        name: MainRouteNames.USER_ACCOUNT_FAVOURITES,
        component: () => import('@/pages/User/UserFavourites.vue'),
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
                full_path: 'user-account/favourites',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_REVIEWS,
        name: MainRouteNames.USER_ACCOUNT_REVIEWS,
        component: () => import('@/pages/User/UserReviews.vue'),
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
                full_path: 'user-account/reviews',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
      {
        path: MainRoutePaths.USER_ACCOUNT_PASSWORD,
        name: MainRouteNames.USER_ACCOUNT_PASSWORD,
        component: () => import('@/pages/User/UserPassword.vue'),
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
                full_path: 'user-account/password',
              },
            },
          ] as Array<BreadcrumbItemInterface>,
        },
      },
    ],
  },
]

export default userRoutes
