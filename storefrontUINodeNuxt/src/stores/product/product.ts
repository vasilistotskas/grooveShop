import { CreateRequest, Product } from '~/zod/product/product'
import { Pagination } from '~/zod/pagination/pagination'
import { ProductsQuery } from '~/zod/products/products'

export interface ProductState {
	products: Pagination<Product>
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
			return state.products.results?.find((product) => product.id === id)
		}
	},
	actions: {
		async fetchProducts({ offset, limit, ordering }: ProductsQuery): Promise<void> {
			this.loading = true
			try {
				const { data: products } = await useFetch(`/api/products`, {
					method: 'get',
					params: {
						offset,
						limit,
						ordering
					}
				})
				if (products.value) {
					this.products = products.value
				}
			} catch (error) {
				this.error = resolveError(error)
			} finally {
				this.loading = false
			}
		},
		async fetchProduct(productId: string | string[]): Promise<void> {
			this.loading = true
			try {
				const { data: product } = await useFetch(`/api/product/${productId}`, {
					method: 'get'
				})
				if (product.value) {
					this.product = product.value
				}
			} catch (error) {
				this.error = resolveError(error)
			} finally {
				this.loading = false
			}
		},
		async createProduct(body: CreateRequest): Promise<void> {
			this.loading = true
			try {
				const { data: newProduct } = await useFetch(`/api/products`, {
					method: 'post',
					body: JSON.stringify(body)
				})
				if (newProduct.value) {
					this.products.results.push(newProduct.value)
				}
			} catch (error) {
				this.error = resolveError(error)
			} finally {
				this.loading = false
			}
		},
		async updateProductHits(productId: string | string[]): Promise<void> {
			this.loading = true
			try {
				await useFetch(`/api/product/${productId}/update-product-hits`, {
					method: 'post'
				})
			} catch (error) {
				this.error = resolveError(error)
			} finally {
				this.loading = false
			}
		}
	}
})
