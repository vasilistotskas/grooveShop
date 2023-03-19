import { Category } from '~/zod/product/category'
import { ProductsQuery } from '~/zod/products/products'
import { Pagination } from '~/zod/pagination/pagination'

export interface CategoryState {
	categories: Pagination<Category> | null
	category: Category | null
	pending: boolean
	error: string | undefined
}

export const useCategoryStore = defineStore({
	id: 'productCategory',
	state: (): CategoryState => ({
		categories: {
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
		category: null as Category | null,
		pending: false,
		error: undefined as string | undefined
	}),
	getters: {
		getCategoryById: (state) => (id: number) => {
			return state.categories?.results?.find((category) => category.id === id)
		}
	},
	actions: {
		async fetchCategories({ offset, limit, ordering }: ProductsQuery): Promise<void> {
			const {
				data: categories,
				error,
				pending
			} = await useFetch(`/api/product-categories`, {
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
			if (categories.value) {
				this.categories = categories.value
			}
		},
		async fetchCategory(categoryId: string | string[]): Promise<void> {
			const {
				data: category,
				error,
				pending
			} = await useFetch(`/api/product-category/${categoryId}`, {
				method: 'get'
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (category.value) {
				this.category = category.value
			}
		}
	}
})
