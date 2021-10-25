import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routes from './main.routes'
import store from '@/store'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    store.commit('user/initializeAuth')
    const isAuthenticated = store.getters['user/getIsAuthenticated']

    if (to.matched.some(record => record.meta.requireLogin) && !isAuthenticated) {
        next({name: 'LogIn', query: {to: to.path}});
    } else {
        next()
    }
})

export default router