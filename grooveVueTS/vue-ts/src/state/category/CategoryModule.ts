import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import CategoryModel from "@/state/category/CategoryModel"
import {map} from "lodash"

@Module({ namespaced: true })
export default class CategoryModule
    extends AppBaseModule
{
    category = new CategoryModel()
    categoriesTree = new CategoryModel()
    categoriesUnorganized = new CategoryModel()

    get getCategory(): CategoryModel {
        return this.category
    }

    get getCategoriesTree(): CategoryModel {
        return this.categoriesTree
    }

    get getCategoriesUnorganized(): CategoryModel {
        return this.categoriesUnorganized
    }

    @Mutation
    setCategory(category: CategoryModel): void {
        this.category = category
    }

    @Mutation
    setCategoriesTree(categories: CategoryModel): void {
        this.categoriesTree = categories
    }

    @Mutation
    setCategoriesUnorganized(categories: CategoryModel): void {
        this.categoriesUnorganized = categories
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
    async categoriesUnorganizedFromRemote(): Promise<void> {
        await api.get('products/categoriesUnorganized/')
            .then((response: ResponseData) => {
                const data = response.data
                const categories = map(data, rawCategory => new CategoryModel(rawCategory))
                this.context.commit('setCategoriesUnorganized', categories)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async fetchCategoryFromRemote(categorySlug: CategoryModel['slug']) {
       await api.get(`products/category/${categorySlug}/`)
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
