import { CreateRequest, Product } from '~/zod/product/product'
import Paginated, { PaginationQuery } from '~/zod/pagination/paginated'

export interface ProductState {
	products: Paginated<Product>
	product: Product | null
	loading: boolean
	error: string | null
}

const resolveError = (error: any): string | null => {
	if (error instanceof TypeError) {
		return error.message
	}
	if (error instanceof Error) {
		return error.message
	}
	return null
}

export const useProductStore = defineStore({
	id: 'product',
	state: (): ProductState => ({
		products: {
			links: {
				next: null,
				prev: null
			},
			count: 0,
			totalPages: 0,
			pageSize: 0,
			page: 0,
			results: []
		},
		product: null as Product | null,
		loading: false,
		error: null as string | null
	}),
	getters: {
		getProductById: (state) => (id: number) => {
			return state.products.results.find((product) => product.id === id)
		}
	},
	actions: {
		async fetchProducts({ offset, limit }: PaginationQuery): Promise<void> {
			this.loading = true
			try {
				this.products = await $fetch(`/api/product/list/list`, {
					method: 'GET',
					params: {
						offset,
						limit
					}
				})
			} catch (error) {
				this.error = resolveError(error)
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
				this.error = resolveError(error)
			} finally {
				this.loading = false
			}
		},
		async createProduct(product: CreateRequest): Promise<void> {
			this.loading = true
			try {
				const newProduct = await $fetch(`/api/product/list/list`, {
					method: 'POST',
					body: product
				})
				this.products.results.push(newProduct)
			} catch (error) {
				this.error = resolveError(error)
			} finally {
				this.loading = false
			}
		},
		async updateProductHits(productId: string | string[]): Promise<void> {
			this.loading = true
			try {
				await $fetch(`/api/product/${productId}/update_product_hits`, {
					body: JSON.stringify({})
				})
			} catch (error) {
				this.error = resolveError(error)
			} finally {
				this.loading = false
			}
		}
	}
})
