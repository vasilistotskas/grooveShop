import { Cart } from '~/zod/cart/cart'
import { CreateRequest, PutRequest } from '~/zod/cart/cart-item'

export interface CartState {
	cart: Cart | null
	pending: boolean
	error: string | undefined
}

export const useCartStore = defineStore({
	id: 'cart',
	state: (): CartState => ({
		cart: null as Cart | null,
		pending: false,
		error: undefined as string | undefined
	}),
	getters: {
		getCart: (state) => {
			return state.cart
		},
		getCartItems: (state) => {
			return state.cart?.cartItems
		},
		getCartItemById: (state) => (id: number) => {
			return state.cart?.cartItems.find((item) => item.id === id)
		}
	},
	actions: {
		async initCart() {
			const {
				data: cart,
				error,
				pending
			} = await useFetch(`/api/cart`, {
				method: 'get'
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (cart.value) {
				this.cart = cart.value
			}
		},
		async addCartItem(body: CreateRequest) {
			this.pending = true
			const { error, pending } = await useFetch(`/api/cart-items`, {
				method: 'post',
				body: JSON.stringify(body)
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
		},
		async updateCartItem(cartItemId: number, body: PutRequest) {
			this.pending = true
			const { error, pending } = await useFetch(`/api/cart-items/${cartItemId}`, {
				method: 'put',
				body: JSON.stringify(body)
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
		},
		async deleteCartItem(cartItemId: number) {
			this.pending = true
			const { error, pending } = await useFetch(`/api/cart-items/${cartItemId}`, {
				method: 'delete'
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
		}
	}
})
