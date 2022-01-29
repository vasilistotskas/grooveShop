import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/pages/Home.vue')
	},
	{
		path: '/log-in',
		name: 'LogIn',
		component: () => import('@/pages/Auth/LogIn.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Log In',
					to: {
						type: 'log_in',
						param: 'log-in',
						full_path: 'log-in'
					}
				}
			])
		}
	},
	{
		path: '/sign-up',
		name: 'SignUp',
		component: () => import('@/pages/Auth/SignUp.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Sign Up',
					to: {
						type: 'sign_up',
						param: 'sign-up',
						full_path: 'sign-up'
					}
				}
			])
		}
	},
	{
		path: '/accounts/activate/:uid/:token',
		name: 'VerifyEmail',
		component: () => import('@/pages/Auth/VerifyEmail.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Verify Email',
					to: {
						type: 'verify_email',
						param: 'accounts/activate',
						full_path: 'accounts/activate'
					}
				}
			])
		}
	},
	{
		path: '/password_reset',
		name: 'PasswordReset',
		component: () => import('@/pages/Auth/PasswordReset.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Password Reset',
					to: {
						type: 'password_reset',
						param: 'password-reset',
						full_path: 'password-reset'
					}
				}
			])
		}
	},
	{
		path: '/password_reset/:uid/:token',
		name: 'PasswordResetConfirm',
		component: () => import('@/pages/Auth/PasswordResetConfirm.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Password Reset Confirm',
					to: {
						type: 'password_reset_confirm',
						param: 'password-reset',
						full_path: 'password-reset'
					}
				}
			])
		}
	},
	{
		path: '/my-account',
		name: 'MyAccount',
		component: () => import('@/pages/User/MyAccount.vue'),
		meta: {
			requireLogin: true,
			breadcrumb: () => ([
				{
					name: 'My Account',
					to: {
						type: 'my_account',
						param: 'my-account',
						full_path: 'my-account'
					}
				}
			])
		},
		children: [
			{
				path: 'orders',
				name: 'Orders',
				component: () => import('@/pages/User/OrderHistory.vue'),
				meta: {
					breadcrumb: () => ([
						{
							name: 'My Account',
							to: {
								type: 'my_account',
								param: 'my-account',
								full_path: 'my-account'
							}
						},
						{
							name: 'My Orders',
							to: {
								type: 'my_account_orders',
								param: 'orders',
								full_path: 'my-account/orders'
							}
						}
					])
				}
			},
			{
				path: 'settings',
				name: 'Settings',
				component: () => import('@/pages/User/AccountSettings.vue'),
				meta: {
					breadcrumb: () => ([
						{
							name: 'My Account',
							to: {
								type: 'my_account',
								param: 'my-account',
								full_path: 'my-account'
							}
						},
						{
							name: 'My Settings',
							to: {
								type: 'my_account_settings',
								param: 'settings',
								full_path: 'my-account/settings'
							}
						}
					])
				}
			},
			{
				path: 'favourites',
				name: 'Favourites',
				component: () => import('@/pages/User/Favourites.vue'),
				meta: {
					breadcrumb: () => ([
						{
							name: 'My Account',
							to: {
								type: 'my_account',
								param: 'my-account',
								full_path: 'my-account'
							}
						},
						{
							name: 'My Favourites',
							to: {
								type: 'my_account_favourites',
								param: 'favourites',
								full_path: 'my-account/favourites'
							}
						}
					])
				}
			},
			{
				path: 'reviews',
				name: 'Reviews',
				component: () => import('@/pages/User/Reviews.vue'),
				meta: {
					breadcrumb: () => ([
						{
							name: 'My Account',
							to: {
								type: 'my_account',
								param: 'my-account',
								full_path: 'my-account'
							}
						},
						{
							name: 'My Reviews',
							to: {
								type: 'my_account_reviews',
								param: 'reviews',
								full_path: 'my-account/reviews'
							}
						}
					])
				}
			},
			{
				path: 'password',
				name: 'Password',
				component: () => import('@/pages/User/Password.vue'),
				meta: {
					breadcrumb: () => ([
						{
							name: 'My Account',
							to: {
								type: 'my_account',
								param: 'my-account',
								full_path: 'my-account'
							}
						},
						{
							name: 'My Password',
							to: {
								type: 'my_account_password',
								param: 'password',
								full_path: 'my-account/password'
							}
						}
					])
				}
			}
		]
	},
	{
		path: '/search',
		name: 'Search',
		component: () => import('@/pages/Search/Search.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Search',
					to: {
						type: 'search',
						param: 'search',
						full_path: 'search'
					}
				}
			])
		}
	},
	{
		path: '/cart',
		name: 'Cart',
		component: () => import('@/pages/Cart/Cart.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Cart',
					to: {
						type: 'cart',
						param: 'cart',
						full_path: 'cart'
					}
				}
			])
		}
	},
	{
		path: '/cart/success',
		name: 'Success',
		component: () => import('@/pages/Order/Success.vue'),
		meta: {
			breadcrumb: () => ([
				{
					name: 'Cart',
					to: {
						type: 'cart',
						param: 'cart',
						full_path: 'cart'
					}
				},
				{
					name: 'Cart Success',
					to: {
						type: 'cart_success',
						param: 'success',
						full_path: 'cart/success'
					}
				}
			])
		}
	},
	{
		path: '/cart/checkout',
		name: 'Checkout',
		component: () => import('@/pages/Checkout/Checkout.vue'),
		meta: {
			requireLogin: false,
			breadcrumb: () => ([
				{
					name: 'Cart',
					to: {
						type: 'cart',
						param: 'cart',
						full_path: 'cart'
					}
				},
				{
					name: 'Checkout',
					to: {
						type: 'cart_checkout',
						param: 'checkout',
						full_path: 'cart/checkout'
					}
				}
			])
		}
	},
	{
		path: '/product/:category_slug/:product_slug',
		name: 'Product',
		component: () => import('@/pages/Product/Product.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any) => ([
				{
					name: route.category_slug,
					to: {
						type: 'category',
						param: route.category_slug,
						full_path: 'category' + '/' + route.category_slug
					}
				},
				{
					name: route.product_slug,
					to: {
						type: 'product',
						param: route.product_slug,
						full_path: 'product' + '/' + route.category_slug + '/' + route.product_slug
					}
				}
			])
		}
	},
	{
		path: '/category/:category_slug',
		name: 'Category',
		component: () => import('@/pages/Category/Category.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any) => ([
				{
					name: 'Category - ' + route.category_slug,
					to: {
						type: 'category',
						param: route.category_slug,
						full_path: 'category' + '/' + route.category_slug
					}
				}
			])
		}
	},
	{
		path: '/blog',
		name: 'Blog',
		component: () => import('@/pages/Blog/Blog.vue'),
		props: true,
		meta: {
			breadcrumb: () => ([
				{
					name: 'Blog',
					to: {
						type: 'blog',
						param: 'blog',
						full_path: 'blog'
					}
				}
			])
		}
	},
	{
		path: '/author/:email',
		name: 'Author',
		component: () => import('@/components/Blog/Author.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any) => ([
				{
					name: 'Blog',
					to: {
						type: 'blog',
						param: 'blog',
						full_path: 'blog'
					}
				},
				{
					name: 'Author - ' + route.email,
					to: {
						type: 'author',
						param: route.email,
						full_path: 'author' + '/' + route.email
					}
				}
			])
		}
	},
	{
		path: '/post/:slug',
		name: 'Post',
		component: () => import('@/components/Blog/Post.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any) => ([
				{
					name: 'Blog',
					to: {
						type: 'blog',
						param: 'blog',
						full_path: 'blog'
					}
				},
				{
					name: 'Post - ' + route.slug,
					to: {
						type: 'post',
						param: route.slug,
						full_path: 'post' + '/' + route.slug
					}
				}
			])
		}
	},
	{
		path: '/tag/:tag',
		name: 'PostsByTag',
		component: () => import('@/components/Blog/PostsByTag.vue'),
		props: true,
		meta: {
			breadcrumb: (route: any) => ([
				{
					name: 'Blog',
					to: {
						type: 'blog',
						param: 'blog',
						full_path: 'blog'
					}
				},
				{
					name: 'Tag - ' + route.tag,
					to: {
						type: 'tag',
						param: route.tag,
						full_path: 'tag' + '/' + route.tag
					}
				}
			])
		}
	},
	{
		path: '/errors/error_404',
		name: 'PageNotFound',
		component: () => import('@/components/Main/PageNotFound.vue'),
		props: true
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: {}
	}
]

export default routes
