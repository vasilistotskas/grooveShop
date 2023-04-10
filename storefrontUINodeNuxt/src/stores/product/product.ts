import { FetchError } from 'ofetch'
import { ProductCreateRequest, Product, ProductQuery } from '~/zod/product/product'
import { Pagination } from '~/zod/pagination/pagination'

export interface ProductState {
	products: Pagination<Product>
	product: Product | null
	pending: boolean
	error: FetchError<any> | null
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
		pending: true,
		error: null as FetchError<any> | null
	}),
	getters: {
		getProductById: (state) => (id: number) => {
			return state.products.results?.find((product) => product.id === id)
		}
	},
	actions: {
		async fetchProducts({ offset, limit, ordering }: ProductQuery): Promise<void> {
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
			this.pending = pending.value
			this.error = error.value
			if (products.value) {
				this.products = products.value
			}
		},
		async fetchProduct(id: string | string[] | number): Promise<void> {
			const {
				data: product,
				error,
				pending
			} = await useFetch(`/api/product/${id}`, {
				method: 'get'
			})
			this.pending = pending.value
			this.error = error.value
			this.product = product.value
		},
		async createProduct(body: ProductCreateRequest): Promise<void> {
			const {
				data: newProduct,
				error,
				pending
			} = await useFetch(`/api/products`, {
				method: 'post',
				body: JSON.stringify(body)
			})
			this.pending = pending.value
			this.error = error.value
			if (newProduct.value) {
				this.products.results.push(newProduct.value)
			}
		},
		async updateProductHits(id: string | string[]): Promise<void> {
			const { error, pending } = await useFetch(
				`/api/product/${id}/update-product-hits`,
				{
					method: 'post'
				}
			)
			this.pending = pending.value
			this.error = error.value
		}
	}
})
