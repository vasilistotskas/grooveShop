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
import UserAddressesNew from '@/Pages/User/UserAddressesNew.vue'
import UserAddressesEdit from '@/Pages/User/UserAddressesEdit.vue'
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
								full_path: 'user-account/orders'
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
								full_path: 'user-account/settings'
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
								full_path: 'user-account/favourites'
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
								full_path: 'user-account/reviews'
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
								full_path: 'user-account/Password'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_ADDRESSES,
				name: MainRouteNames.USER_ACCOUNT_ADDRESSES,
				component: UserAddresses,
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
				path: MainRoutePaths.USER_ACCOUNT_ADDRESSES_NEW,
				name: MainRouteNames.USER_ACCOUNT_ADDRESSES_NEW,
				component: UserAddressesNew,
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
								full_path: 'user-account/addresses/new'
							}
						}
					] as Array<BreadcrumbItemInterface>
				}
			},
			{
				path: MainRoutePaths.USER_ACCOUNT_ADDRESSES_EDIT,
				name: MainRouteNames.USER_ACCOUNT_ADDRESSES_EDIT,
				component: UserAddressesEdit,
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
									full_path: `user-account/addresses/edit/${route.address_id}`
								}
							}
						] as Array<BreadcrumbItemInterface>
				}
			}
		]
	}
]

export default userRoutes
