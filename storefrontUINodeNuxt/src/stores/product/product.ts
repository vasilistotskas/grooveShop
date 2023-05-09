import { FetchError } from 'ofetch'
import { ProductCreateRequest, Product, ProductQuery } from '~/zod/product/product'
import { Pagination } from '~/zod/pagination/pagination'

export interface ProductState {
	products: Pagination<Product>
	product: Product | null
	pending: boolean
	error: FetchError<unknown> | null
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
			pageTotalResults: 0,
			pageSize: 0,
			page: 0,
			results: []
		},
		product: null as Product | null,
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	getters: {
		getProductById: (state) => (id: number) => {
			return state.products.results?.find((product) => product.id === id)
		}
	},
	actions: {
		async fetchProducts({ offset, limit, ordering }: ProductQuery): Promise<void> {
			this.pending = true
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
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (products.value) {
				this.products = products.value
			}
			this.pending = pending.value
		},
		async fetchProduct(id: string | string[] | number): Promise<void> {
			this.pending = true
			const {
				data: product,
				error,
				pending
			} = await useFetch(`/api/product/${id}`, {
				method: 'get'
			})
			this.error = error.value
			this.product = product.value
			this.pending = pending.value
		},
		async createProduct(body: ProductCreateRequest): Promise<void> {
			this.pending = true
			const {
				data: newProduct,
				error,
				pending
			} = await useFetch(`/api/products`, {
				method: 'post',
				body: JSON.stringify(body)
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (newProduct.value) {
				this.products.results.push(newProduct.value)
			}
			this.pending = pending.value
		},
		async updateProductHits(id: string | string[]): Promise<void> {
			this.pending = true
			const { error, pending } = await useFetch(
				`/api/product/${id}/update-product-hits`,
				{
					method: 'post'
				}
			)
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			this.pending = pending.value
		}
	}
})
