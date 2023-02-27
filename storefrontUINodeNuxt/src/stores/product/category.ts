import { Category } from '~/zod/product/category'

export interface CategoryState {
	categories: Category[]
	category: Category | null
	loading: boolean
	error: string | null
}

export const useCategoryStore = defineStore({
	id: 'productCategory',
	state: (): CategoryState => ({
		categories: [] as Category[],
		category: null as Category | null,
		loading: false,
		error: null as string | null
	}),
	getters: {
		getCategoryById: (state) => (id: number) => {
			return state.categories.find((category) => category.id === id)
		}
	},
	actions: {
		async fetchCategories() {
			const config = useRuntimeConfig()
			this.categories = []
			this.loading = true
			try {
				this.categories = await fetch(
					`${config.public.apiBaseUrl}/product/category`
				).then((response) => response.json())
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
		async fetchCategory(categoryId: string | string[]) {
			const config = useRuntimeConfig()
			this.category = null
			this.loading = true
			try {
				this.category = await fetch(
					`${config.public.apiBaseUrl}/product/category/${categoryId}`
				).then((response) => response.json())
			} catch (error) {
				if (error instanceof TypeError) {
					this.error = error.message
				}
				if (error instanceof Error) {
					this.error = error.message
				}
			}
		}
	}
})
