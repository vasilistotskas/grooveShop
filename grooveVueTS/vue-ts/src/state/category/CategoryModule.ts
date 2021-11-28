import {map} from "lodash"
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from '@/state/common/AppBaseModule'
import CategoryModel from "@/state/category/CategoryModel"
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class CategoryModule
    extends AppBaseModule
{
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
    async categoriesTreeFromRemote(): Promise<void> {
        await api.get('products/categoriesTree/')
            .then((response: ResponseData) => {
                const data = response.data
                const categories = map(data, rawCategory => new CategoryModel(rawCategory))
                this.context.commit('setCategoriesTree', categories)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async fetchCategoryFromRemote(categoryId: CategoryModel['id']): Promise<void> {
        await api.get(`products/${categoryId}/`)
           .then((response: ResponseData) => {
               const data = response.data[0]
               let category = new CategoryModel(data)
               this.context.commit('setCategory', category)
           })
           .catch((e: Error) => {
               console.log(e)
           })
    }
}
