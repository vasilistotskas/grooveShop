import { map } from 'lodash'
import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import AppBaseModule from '@/State/Common/AppBaseModule'
import CategoryModel from '@/State/Category/CategoryModel'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'category'
})
export default class CategoryModule extends AppBaseModule {
	category!: CategoryModel
	categoriesTree: Array<CategoryModel> = []

	get getCategory(): CategoryModel {
		return this.category
	}

	get getCategoriesTree(): Array<CategoryModel> {
		return this.categoriesTree
	}

	@Mutation
	setCategory(category: CategoryModel): void {
		this.category = category
	}

	@Mutation
	setCategoriesTree(categories: Array<CategoryModel>): void {
		this.categoriesTree = categories
	}

	@Action
	async fetchCategoriesTreeFromRemote(): Promise<void> {
		return await api
			.get('categories/categoriesTree/')
			.then((response: AxiosResponse<Array<CategoryModel>>) => {
				const data = response.data
				const categories = map(data, (rawCategory) => new CategoryModel(rawCategory))
				this.context.commit('setCategoriesTree', categories)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async fetchCategoryFromRemote(categorySlug: CategoryModel['slug']): Promise<void> {
		return await api
			.get(`categories/${categorySlug}/`)
			.then((response: AxiosResponse<Array<CategoryModel>>) => {
				const data = response.data[0]
				this.context.commit('setCategory', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
