import { Category } from '~/zod/product/category'
import { ProductQuery } from '~/zod/product/product'
import { Paginated } from '~/zod/pagination/paginated'

export interface CategoryState {
	categories: Paginated<Category>
	category: Category | null
	loading: boolean
	error: string | null
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
		loading: false,
		error: null as string | null
	}),
	getters: {
		getCategoryById: (state) => (id: number) => {
			return state.categories.results?.find((category) => category.id === id)
		}
	},
	actions: {
		async fetchCategories({ offset, limit, ordering }: ProductQuery): Promise<void> {
			this.loading = true
			try {
				const { data: categories } = await useFetch(`/api/product_categories`, {
					method: 'get',
					params: {
						offset,
						limit,
						ordering
					}
				})
				if (categories.value) {
					this.categories = categories.value
				}
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
		async fetchCategory(categoryId: string | string[]): Promise<void> {
			this.category = null
			this.loading = true
			try {
				const { data: category } = await useFetch(`/api/product_category/${categoryId}`, {
					method: 'get'
				})
				if (category.value) {
					this.category = category.value
				}
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
