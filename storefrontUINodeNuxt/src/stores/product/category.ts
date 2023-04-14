import { FetchError } from 'ofetch'
import { Category } from '~/zod/product/category'
import { ProductQuery } from '~/zod/product/product'
import { Pagination } from '~/zod/pagination/pagination'

export interface CategoryState {
	categories: Pagination<Category> | null
	category: Category | null
	pending: boolean
	error: FetchError<unknown> | null
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
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	getters: {
		getCategoryById: (state) => (id: number) => {
			return state.categories?.results?.find((category) => category.id === id)
		}
	},
	actions: {
		async fetchCategories({ offset, limit, ordering }: ProductQuery): Promise<void> {
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
			this.pending = pending.value
			this.error = error.value
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
			this.pending = pending.value
			this.error = error.value
			if (category.value) {
				this.category = category.value
			}
		}
	}
})
