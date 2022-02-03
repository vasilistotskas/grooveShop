import routes from './main.routes'
import { useToast } from 'vue-toastification'
import { createRouter, createWebHistory } from 'vue-router'

const toast = useToast()

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
	if (to.name === 'NotFound') {
		next('/errors/error_404')
	}
})

export default router


