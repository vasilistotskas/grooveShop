import { CreateRequest, Product } from '~/zod/product/product'
import { Pagination } from '~/zod/pagination/pagination'
import { ProductsQuery } from '~/zod/products/products'

export interface ProductState {
	products: Pagination<Product>
	product: Product | null
	pending: boolean
	error: string | undefined
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
		pending: false,
		error: undefined as string | undefined
	}),
	getters: {
		getProductById: (state) => (id: number) => {
			return state.products.results?.find((product) => product.id === id)
		}
	},
	actions: {
		async fetchProducts({ offset, limit, ordering }: ProductsQuery): Promise<void> {
			const {
				data: products,
				error,
				pending
			} = await useFetch(`/api/products`, {
				method: 'get',
				params: {
					offset,
					limit,
					ordering
				}
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (products.value) {
				this.products = products.value
			}
		},
		async fetchProduct(productId: string | string[] | number): Promise<void> {
			const {
				data: product,
				error,
				pending
			} = await useFetch(`/api/product/${productId}`, {
				method: 'get'
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (product.value) {
				this.product = product.value
			}
		},
		async createProduct(body: CreateRequest): Promise<void> {
			const {
				data: newProduct,
				error,
				pending
			} = await useFetch(`/api/products`, {
				method: 'post',
				body: JSON.stringify(body)
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (newProduct.value) {
				this.products.results.push(newProduct.value)
			}
		},
		async updateProductHits(productId: string | string[]): Promise<void> {
			const { error, pending } = await useFetch(
				`/api/product/${productId}/update-product-hits`,
				{
					method: 'post'
				}
			)
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
		}
	}
})
