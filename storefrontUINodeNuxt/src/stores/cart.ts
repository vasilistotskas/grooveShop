import { FetchError } from 'ofetch'
import { Cart } from '~/zod/cart/cart'
import { CartItemCreateRequest, CartItemPutRequest } from '~/zod/cart/cart-item'

export interface CartState {
	cart: Cart | null
	pending: boolean
	error: FetchError<unknown> | null
}

export const useCartStore = defineStore({
	id: 'cart',
	state: (): CartState => ({
		cart: null as Cart | null,
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	getters: {
		getCartItems: (state) => {
			return state.cart?.cartItems
		},
		getCartItemById: (state) => (id: number) => {
			return state.cart?.cartItems.find((item) => item.id === id)
		},
		getCartItemByProductId: (state) => (productId: number) => {
			const cartProducts = state.cart?.cartItems.map((item) => item.product)
			return cartProducts?.find((product) => product.id === productId)
		}
	},
	actions: {
		async fetchCart() {
			const {
				data: cart,
				error,
				pending
			} = await useFetch(`/api/cart`, {
				method: 'get'
			})
			this.pending = pending.value
			this.error = error.value
			if (cart.value) {
				this.cart = cart.value
			}
		},
		async addCartItem(body: CartItemCreateRequest) {
			const { error, pending } = await useFetch(`/api/cart-items`, {
				method: 'post',
				body: JSON.stringify(body)
			})
			this.pending = pending.value
			this.error = error.value
		},
		async updateCartItem(id: number, body: CartItemPutRequest) {
			const { error, pending } = await useFetch(`/api/cart-items/${id}`, {
				method: 'put',
				body: JSON.stringify(body)
			})
			this.pending = pending.value
			this.error = error.value
		},
		async deleteCartItem(id: number) {
			const { error, pending } = await useFetch(`/api/cart-items/${id}`, {
				method: 'delete'
			})
			this.pending = pending.value
			this.error = error.value
		}
	}
})
