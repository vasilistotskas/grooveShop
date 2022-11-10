import { RouteRecordRaw } from 'vue-router'
import UserReviews from '@/Pages/User/UserReviews.vue'
import UserAccount from '@/Pages/User/UserAccount.vue'
import UserSettings from '@/Pages/User/UserSettings.vue'
import UserPassword from '@/Pages/User/UserPassword.vue'
import UserFavourites from '@/Pages/User/UserFavourites.vue'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import UserOrderHistory from '@/Pages/User/UserOrderHistory.vue'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const userRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.USER_ACCOUNT,
		name: MainRouteNames.USER_ACCOUNT,
		component: UserAccount,
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
				component: UserOrderHistory,
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
								full_path: 'User-account/orders'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_SETTINGS,
				name: MainRouteNames.USER_ACCOUNT_SETTINGS,
				component: UserSettings,
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
								full_path: 'User-account/settings'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_FAVOURITES,
				name: MainRouteNames.USER_ACCOUNT_FAVOURITES,
				component: UserFavourites,
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
								full_path: 'User-account/favourites'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_REVIEWS,
				name: MainRouteNames.USER_ACCOUNT_REVIEWS,
				component: UserReviews,
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
								full_path: 'User-account/reviews'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_PASSWORD,
				name: MainRouteNames.USER_ACCOUNT_PASSWORD,
				component: UserPassword,
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
								full_path: 'User-account/Password'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			}
		]
	}
]

export default userRoutes
