import { map } from 'lodash'
import api from '@/api/api.service'
import AppBaseModule from '@/state/common/AppBaseModule'
import CategoryModel from '@/state/category/CategoryModel'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class CategoryModule extends AppBaseModule {
  category = new CategoryModel()
  categoriesTree = new CategoryModel()

  get getCategory(): CategoryModel {
    return this.category
  }

  get getCategoriesTree(): CategoryModel {
    return this.categoriesTree
  }

  @Mutation
  setCategory(category: CategoryModel): void {
    this.category = category
  }

  @Mutation
  setCategoriesTree(categories: CategoryModel): void {
    this.categoriesTree = categories
  }

  @Action
  fetchCategoriesTreeFromRemote(): Promise<void> {
    return api
      .get('categories/categoriesTree/')
      .then((response: any) => {
        const data = response.data
        const categories = map(data, (rawCategory) => new CategoryModel(rawCategory))
        this.context.commit('setCategoriesTree', categories)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  fetchCategoryFromRemote(categorySlug: CategoryModel['slug']): Promise<void> {
    return api
      .get(`categories/${categorySlug}/`)
      .then((response: any) => {
        const data = response.data[0]
        const category = new CategoryModel(data)
        this.context.commit('setCategory', category)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }
}
