import { Cart } from '~/zod/cart/cart'
import { CreateRequest, PutRequest } from '~/zod/cart/cart-item'

export interface CartState {
	cart: Cart | null
	loading: boolean
	error: string | null
}

export const useCartStore = defineStore({
	id: 'cart',
	state: (): CartState => ({
		cart: null as Cart | null,
		loading: false,
		error: null as string | null
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
			this.cart = null
			this.loading = true
			try {
				const { data: cart } = await useFetch(`/api/cart`, {
					method: 'get'
				})
				if (cart.value) {
					this.cart = cart.value
				}
			} catch (error) {
				if (error instanceof TypeError) {
					this.error = error.message
				}
				if (error instanceof Error) {
					this.error = error.message
				}
			} finally {
				this.loading = false
			}
		},
		async addCartItem(body: CreateRequest) {
			this.loading = true
			try {
				const { data: cartItem } = await useFetch(`/api/cart-items`, {
					method: 'post',
					body: JSON.stringify(body)
				})
				if (cartItem.value) {
					this.cart?.cartItems.push(cartItem.value)
				}
			} catch (error) {
				if (error instanceof TypeError) {
					this.error = error.message
				}
				if (error instanceof Error) {
					this.error = error.message
				}
			} finally {
				this.loading = false
			}
		},
		async updateCartItem(cartItemId: number, body: PutRequest) {
			this.loading = true
			try {
				const { data: cartItem } = await useFetch(`/api/cart-items/${cartItemId}`, {
					method: 'put',
					body: JSON.stringify(body)
				})
				if (cartItem.value) {
					const index = this.cart?.cartItems.findIndex((item) => item.id === cartItemId)
					if (index !== undefined) {
						this.cart?.cartItems.splice(index, 1, cartItem.value)
					}
				}
			} catch (error) {
				if (error instanceof TypeError) {
					this.error = error.message
				}
				if (error instanceof Error) {
					this.error = error.message
				}
			} finally {
				this.loading = false
			}
		},
		async deleteCartItem(cartItemId: number) {
			this.loading = true
			try {
				const { data: cartItem } = await useFetch(`/api/cart-items/${cartItemId}`, {
					method: 'delete'
				})
				if (cartItem.value) {
					const index = this.cart?.cartItems.findIndex((item) => item.id === cartItemId)
					if (index !== undefined) {
						this.cart?.cartItems.splice(index, 1)
					}
				}
			} catch (error) {
				if (error instanceof TypeError) {
					this.error = error.message
				}
				if (error instanceof Error) {
					this.error = error.message
				}
			} finally {
				this.loading = false
			}
		}
	}
})
