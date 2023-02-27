import { Product } from '~/zod/product/product'

export interface ProductState {
	products: Product[]
	product: Product | null
}

export const useProductStore = defineStore({
	id: 'product',
	state: (): ProductState => ({
		products: [] as Product[],
		product: null as Product | null
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
			try {
				this.products = await fetch(`${config.public.apiBaseUrl}/product`).then(
					(response) => response.json()
				)
			} catch (error) {
				console.log('error', error)
			}
		},
		async fetchProduct(productId: string | string[]): Promise<void> {
			const config = useRuntimeConfig()
			this.product = null
			try {
				this.product = await fetch(
					`${config.public.apiBaseUrl}/product/${productId}`
				).then((response) => response.json())
			} catch (error) {
				console.log('error', error)
			}
		},
		updateProductHits: async function (productId: string | string[]): Promise<void> {
			const config = useRuntimeConfig()
			try {
				await fetch(
					`${config.public.apiBaseUrl}/product/${productId}/update_product_hits`,
					{
						method: 'POST'
					}
				)
			} catch (error) {
				console.log('error', error)
			}
		}
	}
})
