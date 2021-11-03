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
    categories = new CategoryModel()

    get getCategory(): CategoryModel {
        return this.category
    }

    get getCategories(): CategoryModel {
        return this.categories
    }

    @Mutation
    setCategory(category: CategoryModel): void {
        this.category = category
    }

    @Mutation
    setCategories(categories: CategoryModel): void {
        this.categories = categories
    }

    @Action
    async categoriesFromRemote(): Promise<void> {
        await api.get('products/categories/')
            .then((response: ResponseData) => {
                const data = response.data
                const categories = map(data, rawCategory => new CategoryModel(rawCategory))
                this.context.commit('setCategories', categories)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async fetchCategoryFromRemote(categorySlug: CategoryModel['slug']) {
       await api.get(`products/${categorySlug}/`)
           .then((response: ResponseData) => {
               const data = response.data
               let category = new CategoryModel(data)
               this.context.commit('setCategory', category)
           })
           .catch((e: Error) => {
               console.log(e)
           })
    }
}
