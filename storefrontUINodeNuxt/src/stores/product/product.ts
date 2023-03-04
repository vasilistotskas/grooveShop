import { Product } from '~/zod/product/product'

export interface ProductState {
	products: Product[]
	product: Product | null
	loading: boolean
	error: string | null
}

export const useProductStore = defineStore({
	id: 'product',
	state: (): ProductState => ({
		products: [] as Product[],
		product: null as Product | null,
		loading: false,
		error: null as string | null
	}),
	getters: {
		getProductById: (state) => (id: number) => {
			return state.products.find((product) => product.id === id)
		}
	},
	actions: {
		async fetchProducts(): Promise<void> {
			const config = useRuntimeConfig()
			this.products = []
			this.loading = true
			try {
				this.products = await fetch(`${config.public.apiBaseUrl}/product`).then(
					(response) => response.json()
				)
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
		async fetchProduct(productId: string | string[]): Promise<void> {
			this.product = null
			this.loading = true
			try {
				this.product = await $fetch(`/api/product/${productId}`)
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
		async updateProductHits(productId: string | string[]): Promise<void> {
			const config = useRuntimeConfig()
			this.loading = true
			try {
				await fetch(
					`${config.public.apiBaseUrl}/product/${productId}/update_product_hits`,
					{
						method: 'POST'
					}
				)
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
