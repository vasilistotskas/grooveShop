import { RouteRecordRaw } from 'vue-router'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const routes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.HOME,
		name: MainRouteNames.HOME,
		component: () => import('@/pages/Home.vue')
	},
	{
		path: MainRoutePaths.LOGIN,
		name: MainRouteNames.LOGIN,
		component: () => import('@/pages/Auth/LogIn.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Log In',
					to: {
						full_path: 'log-in'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.SIGNUP,
		name: MainRouteNames.SIGNUP,
		component: () => import('@/pages/Auth/SignUp.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Sign Up',
					to: {
						full_path: 'sign-up'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.VERIFY_EMAIL,
		name: MainRouteNames.VERIFY_EMAIL,
		component: () => import('@/pages/Auth/VerifyEmail.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Verify Email',
					to: {
						full_path: 'accounts/activate'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.VERIFY_EMAIL_RESEND_INPUT,
		name: MainRouteNames.VERIFY_EMAIL_RESEND_INPUT,
		component: () => import('@/pages/Auth/VerifyEmailResendInput.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Verify Email Resend Input',
					to: {
						full_path: 'accounts/activate/verify_mail_resend'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.PASSWORD_RESET,
		name: MainRouteNames.PASSWORD_RESET,
		component: () => import('@/pages/Auth/PasswordReset.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Password Reset',
					to: {
						full_path: 'password-reset'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.PASSWORD_RESET_CONFIRM,
		name: MainRouteNames.PASSWORD_RESET_CONFIRM,
		component: () => import('@/pages/Auth/PasswordResetConfirm.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Password Reset Confirm',
					to: {
						full_path: 'password-reset'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.USER_ACCOUNT,
		name: MainRouteNames.USER_ACCOUNT,
		component: () => import('@/pages/User/UserAccount.vue'),
		meta: {
			requireLogin: true,
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'User Account',
					to: {
						full_path: 'user-account'
					}
				}
			])
		},
		children: [
			{
				path: MainRoutePaths.ORDERS,
				name: MainRouteNames.ORDERS,
				component: () => import('@/pages/User/UserOrderHistory.vue'),
				meta: {
					breadcrumb: (): Array<BreadcrumbItemInterface> => ([
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
					])
				}
			},
			{
				path: MainRoutePaths.SETTINGS,
				name: MainRouteNames.SETTINGS,
				component: () => import('@/pages/User/UserSettings.vue'),
				meta: {
					breadcrumb: (): Array<BreadcrumbItemInterface> => ([
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
					])
				}
			},
			{
				path: MainRoutePaths.FAVOURITES,
				name: MainRouteNames.FAVOURITES,
				component: () => import('@/pages/User/UserFavourites.vue'),
				meta: {
					breadcrumb: () => ([
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
					])
				}
			},
			{
				path: MainRoutePaths.REVIEWS,
				name: MainRouteNames.REVIEWS,
				component: () => import('@/pages/User/UserReviews.vue'),
				meta: {
					breadcrumb: (): Array<BreadcrumbItemInterface> => ([
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
					])
				}
			},
			{
				path: MainRoutePaths.PASSWORD,
				name: MainRouteNames.PASSWORD,
				component: () => import('@/pages/User/UserPassword.vue'),
				meta: {
					breadcrumb: (): Array<BreadcrumbItemInterface> => ([
						{
							name: 'User Account',
							to: {
								full_path: 'user-account'
							}
						},
						{
							name: 'My Password',
							to: {
								full_path: 'user-account/password'
							}
						}
					])
				}
			}
		]
	},
	{
		path: MainRoutePaths.SEARCH,
		name: MainRouteNames.SEARCH,
		component: () => import('@/pages/Search/Search.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Search',
					to: {
						full_path: 'search'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.CART,
		name: MainRouteNames.CART,
		component: () => import('@/pages/Cart/Cart.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.SUCCESS,
		name: MainRouteNames.SUCCESS,
		component: () => import('@/pages/Order/OrderSuccess.vue'),
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				},
				{
					name: 'Cart Success',
					to: {
						full_path: 'cart/success'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.CHECKOUT,
		name: MainRouteNames.CHECKOUT,
		component: () => import('@/pages/Checkout/Checkout.vue'),
		meta: {
			requireLogin: false,
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Cart',
					to: {
						full_path: 'cart'
					}
				},
				{
					name: 'Checkout',
					to: {
						full_path: 'cart/checkout'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.ALL_PRODUCTS,
		name: MainRouteNames.ALL_PRODUCTS,
		component: () => import('@/pages/Product/AllProducts.vue'),
		props: true,
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'AllProducts',
					to: {
						full_path: 'all_products'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.PRODUCT,
		name: MainRouteNames.PRODUCT,
		component: () => import('@/pages/Product/Product.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: route.category_slug,
					to: {
						full_path: 'category' + '/' + route.category_slug
					}
				},
				{
					name: route.product_slug,
					to: {
						full_path: 'product' + '/' + route.category_slug + '/' + route.product_slug
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.CATEGORY,
		name: MainRouteNames.CATEGORY,
		component: () => import('@/pages/Category/Category.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Category - ' + route.category_slug,
					to: {
						full_path: 'category' + '/' + route.category_slug
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.BLOG,
		name: MainRouteNames.BLOG,
		component: () => import('@/pages/Blog/Blog.vue'),
		props: true,
		meta: {
			breadcrumb: (): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.AUTHOR,
		name: MainRouteNames.AUTHOR,
		component: () => import('@/components/Blog/BlogAuthor.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				},
				{
					name: 'Author - ' + route.email,
					to: {
						full_path: 'author' + '/' + route.email
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.POST,
		name: MainRouteNames.POST,
		component: () => import('@/components/Blog/BlogPost.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				},
				{
					name: 'Post - ' + route.slug,
					to: {
						full_path: 'post' + '/' + route.slug
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.POSTS_BY_TAG,
		name: MainRouteNames.POSTS_BY_TAG,
		component: () => import('@/components/Blog/BlogPostsByTag.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any): Array<BreadcrumbItemInterface> => ([
				{
					name: 'Blog',
					to: {
						full_path: 'blog'
					}
				},
				{
					name: 'Tag - ' + route.tag,
					to: {
						full_path: 'tag' + '/' + route.tag
					}
				}
			])
		}
	},
	{
		path: MainRoutePaths.PAGE_NOT_FOUND,
		name: MainRouteNames.PAGE_NOT_FOUND,
		component: () => import('@/components/Main/PageNotFound.vue'),
		props: true
	},
	{
		path: MainRoutePaths.NOT_FOUND,
		name: MainRouteNames.NOT_FOUND,
		component: {}
	}
]

export default routes
