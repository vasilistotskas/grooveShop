import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/pages/Home.vue"),
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import("@/pages/SignUp/SignUp.vue"),
    },
    {
        path: '/log-in',
        name: 'LogIn',
        component: () => import("@/pages/Login/LogIn.vue"),
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: () => import("@/pages/User/MyAccount.vue"),
        children: [
            {
                path: 'orders',
                name: 'Orders',
                component: () => import("@/components/User/OrderSummary.vue"),
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import("@/components/User/AccountSettings.vue"),
            },
            {
                path: 'favourites',
                name: 'Favourites',
                component: () => import("@/components/User/Favourites.vue"),
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
        path: '/product/:product_slug/:category_id',
        name: 'Product',
        component: () => import("@/pages/Product/Product.vue"),
        props: true
    },
    {
        path: '/category/:absolute_url/:category_id',
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
        path: '/author/:username',
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
