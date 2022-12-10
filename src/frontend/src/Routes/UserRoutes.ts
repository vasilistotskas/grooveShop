import UserReviews from '@/Pages/User/UserReviews.vue'
import UserAccount from '@/Pages/User/UserAccount.vue'
import UserSettings from '@/Pages/User/UserSettings.vue'
import { RouteParams, RouteRecordRaw } from 'vue-router'
import UserPassword from '@/Pages/User/UserPassword.vue'
import UserAddresses from '@/Pages/User/UserAddresses.vue'
import UserFavourites from '@/Pages/User/UserFavourites.vue'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import UserOrderHistory from '@/Pages/User/UserOrderHistory.vue'
import UserAddressNew from '@/Pages/User/UserAddressNew.vue'
import UserAddressEdit from '@/Pages/User/UserAddressEdit.vue'
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
						full_path: 'user-account'
					}
				}
			] as Array<BreadcrumbItemInterface>
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
								full_path: 'user-account'
							}
						},
						{
							name: 'User Orders',
							to: {
								full_path: 'user-account/orders'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
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
								full_path: 'user-account'
							}
						},
						{
							name: 'User Settings',
							to: {
								full_path: 'user-account/settings'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
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
								full_path: 'user-account'
							}
						},
						{
							name: 'User Favourites',
							to: {
								full_path: 'user-account/favourites'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
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
								full_path: 'user-account'
							}
						},
						{
							name: 'User Reviews',
							to: {
								full_path: 'user-account/reviews'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
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
								full_path: 'user-account'
							}
						},
						{
							name: 'My Password',
							to: {
								full_path: 'user-account/Password'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_ADDRESSES,
				name: MainRouteNames.USER_ACCOUNT_ADDRESSES,
				component: () => import('@/Pages/User/UserAddresses.vue'),
				meta: {
					breadcrumb: [
						{
							name: 'User Account',
							to: {
								full_path: 'user-account'
							}
						},
						{
							name: 'My Addresses',
							to: {
								full_path: 'user-account/addresses'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_ADDRESS_NEW,
				name: MainRouteNames.USER_ACCOUNT_ADDRESS_NEW,
				component: () => import('@/Pages/User/UserAddressNew.vue'),
				meta: {
					breadcrumb: [
						{
							name: 'User Account',
							to: {
								full_path: 'user-account'
							}
						},
						{
							name: 'My Addresses',
							to: {
								full_path: 'user-account/addresses'
							}
						},
						{
							name: 'New Address',
							to: {
								full_path: 'user-account/address/new'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_ADDRESS_EDIT,
				name: MainRouteNames.USER_ACCOUNT_ADDRESS_EDIT,
				component: () => import('@/Pages/User/UserAddressEdit.vue'),
				meta: {
					breadcrumb: (route: RouteParams): Array<BreadcrumbItemInterface> =>
						[
							{
								name: 'User Account',
								to: {
									full_path: 'user-account'
								}
							},
							{
								name: 'My Addresses',
								to: {
									full_path: 'user-account/addresses'
								}
							},
							{
								name: 'Edit Address',
								to: {
									full_path: `user-account/address/edit/${route.id}`
								}
							}
						] as Array<BreadcrumbItemInterface>
				}
			}
		]
	}
]

export default userRoutes
