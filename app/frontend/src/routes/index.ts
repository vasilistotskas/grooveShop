import store from '@/store'
import routes from './main.routes'
import { useToast } from 'vue-toastification'
import { createRouter, createWebHistory } from 'vue-router'

const toast = useToast()

// @TODO should i make routes for every app ?
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    store.dispatch('auth/initialize').then(() => {
        if (to.matched.some(record => record.meta.requireLogin) && !store.getters['auth/isAuthenticated']) {
            toast.error("You are not logged in")
            next({name: 'LogIn', query: {to: to.path}});
        } else {
            next()
        }
    })
})

export default router