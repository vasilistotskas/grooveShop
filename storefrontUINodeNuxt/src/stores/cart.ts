import { FetchError } from 'ofetch'
import { Cart } from '~/zod/cart/cart'
import { CreateRequest, PutRequest } from '~/zod/cart/cart-item'

export interface CartState {
	cart: Cart | null
	pending: boolean
	error: FetchError<any> | null
}

export const useCartStore = defineStore({
	id: 'cart',
	state: (): CartState => ({
		cart: null as Cart | null,
		pending: false,
		error: null as FetchError<any> | null
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
		},
		getCartItemByProductId: (state) => (productId: number) => {
			const cartProducts = state.cart?.cartItems.map((item) => item.product)
			return cartProducts?.find((product) => product.id === productId)
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
			this.pending = pending.value
			this.error = error.value
			this.cart = cart.value
		},
		async addCartItem(body: CreateRequest) {
			this.pending = true
			const { error, pending } = await useFetch(`/api/cart-items`, {
				method: 'post',
				body: JSON.stringify(body)
			})
			this.pending = pending.value
			this.error = error.value
		},
		async updateCartItem(cartItemId: number, body: PutRequest) {
			this.pending = true
			const { error, pending } = await useFetch(`/api/cart-items/${cartItemId}`, {
				method: 'put',
				body: JSON.stringify(body)
			})
			this.pending = pending.value
			this.error = error.value
		},
		async deleteCartItem(cartItemId: number) {
			this.pending = true
			const { error, pending } = await useFetch(`/api/cart-items/${cartItemId}`, {
				method: 'delete'
			})
			this.pending = pending.value
			this.error = error.value
		}
	}
})
