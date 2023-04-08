import { FetchError } from 'ofetch'
import { ProductCreateRequest, Product } from '~/zod/product/product'
import { Pagination } from '~/zod/pagination/pagination'
import { ProductsQuery } from '~/zod/products/products'

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
			this.pending = pending.value
			this.error = error.value
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
		async updateProductHits(productId: string | string[]): Promise<void> {
			const { error, pending } = await useFetch(
				`/api/product/${productId}/update-product-hits`,
				{
					method: 'post'
				}
			)
			this.pending = pending.value
			this.error = error.value
		}
	}
})
