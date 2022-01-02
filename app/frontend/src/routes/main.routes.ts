import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/pages/Home.vue"),
    },
    {
        path: '/log-in',
        name: 'LogIn',
        component: () => import("@/pages/Auth/LogIn.vue"),
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import("@/pages/Auth/SignUp.vue"),
    },
    {
        path: '/accounts/activate/:uid/:token',
        name: 'VerifyEmail',
        component: () => import("@/pages/Auth/VerifyEmail.vue"),
    },
    {
        path: '/password_reset',
        name: 'PasswordReset',
        component: () => import("@/pages/Auth/PasswordReset.vue"),
    },
    {
        path: '/password_reset/:uid/:token',
        name: 'PasswordResetConfirm',
        component: () => import("@/pages/Auth/PasswordResetConfirm.vue"),
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: () => import("@/pages/User/MyAccount.vue"),
        children: [
            {
                path: 'orders',
                name: 'Orders',
                component: () => import("@/pages/User/OrderSummary.vue"),
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import("@/pages/User/AccountSettings.vue"),
            },
            {
                path: 'favourites',
                name: 'Favourites',
                component: () => import("@/pages/User/Favourites.vue"),
            },
            {
                path: 'reviews',
                name: 'Reviews',
                component: () => import("@/pages/User/Reviews.vue"),
            }
        ],
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import("@/pages/Search/Search.vue"),
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import("@/pages/Cart/Cart.vue"),
    },
    {
        path: '/cart/success',
        name: 'Success',
        component: () => import("@/pages/Order/Success.vue"),
    },
    {
        path: '/cart/checkout',
        name: 'Checkout',
        component: () => import("@/pages/Checkout/Checkout.vue"),
        meta: {
            requireLogin: false
        }
    },
    {
        path: '/product/:category_slug/:product_slug',
        name: 'Product',
        component: () => import("@/pages/Product/Product.vue"),
        props: true
    },
    {
        path: '/category/:category_slug',
        name: 'Category',
        component: () => import("@/pages/Category/Category.vue"),
        props: true
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import("@/pages/Blog/Blog.vue"),
        props: true
    },
    {
        path: '/author/:email',
        name: 'Author',
        component: () => import("@/components/Blog/Author.vue"),
        props: true
    },
    {
        path: '/post/:slug',
        name: 'Post',
        component: () => import("@/components/Blog/Post.vue"),
        props: true
    },
    {
        path: '/tag/:tag',
        name: 'PostsByTag',
        component: () => import("@/components/Blog/PostsByTag.vue"),
        props: true
    }
]

export default routes
