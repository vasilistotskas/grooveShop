import { map } from 'lodash'
import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import AppBaseModule from '@/State/Common/AppBaseModule'
import CategoryModel from '@/State/Category/CategoryModel'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'category'
})
export default class CategoryModule extends AppBaseModule {
	category!: CategoryModel
	categories: Array<CategoryModel> = []

	get getCategory(): CategoryModel {
		return this.category
	}

	get getCategories(): Array<CategoryModel> {
		return this.categories
	}

	@Mutation
	setCategory(category: CategoryModel): void {
		this.category = category
	}

	@Mutation
	setCategories(categories: Array<CategoryModel>): void {
		this.categories = categories
	}

	@Action
	async fetchCategoriesFromRemote(): Promise<void> {
		return await api
			.get('product/category/')
			.then((response: AxiosResponse<PaginatedModel<CategoryModel>>) => {
				const data = response.data
				const categories = data.results
				this.context.commit('setCategories', categories)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async fetchCategoryFromRemote(categorySlug: string | string[]): Promise<void> {
		return await api
			.get(`category/${categorySlug}/`)
			.then((response: AxiosResponse<CategoryModel>) => {
				const data = response.data
				this.context.commit('setCategory', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
