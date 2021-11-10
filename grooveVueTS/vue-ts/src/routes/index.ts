import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routes from './main.routes'
import store from '@/store'
import { useToast } from 'vue-toastification'

const toast = useToast()

// @TODO should i make routes for every app ?
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    store.commit('user/data/initializeAuth')
    const isAuthenticated = store.getters['user/data/getIsAuthenticated']

    if (to.matched.some(record => record.meta.requireLogin) && !isAuthenticated) {
        toast.error("You are not logged in")
        next({name: 'LogIn', query: {to: to.path}});
    } else {
        next()
    }
})

export default router