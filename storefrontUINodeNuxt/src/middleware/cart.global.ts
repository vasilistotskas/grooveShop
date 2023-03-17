import { useCartStore } from '~/stores/cart'

export default defineNuxtRouteMiddleware(() => {
	const cartStore = useCartStore()
	const cart = cartStore.cart

	if (!cart) {
		cartStore.initCart().then(() => {
			console.log('========== cart initialized ==========')
		})
	}
})
