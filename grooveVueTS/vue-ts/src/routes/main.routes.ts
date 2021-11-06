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
        path: '/:category_slug/:product_slug/:product_id',
        name: 'Product',
        component: () => import("@/pages/Product/Product.vue"),
        props: true
    },
    {
        path: '/:category_slug',
        name: 'Category',
        component: () => import("@/pages/Category/Category.vue"),
        props: true
    }
]

export default routes
