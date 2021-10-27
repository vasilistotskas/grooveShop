import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import Category from "@/state/category/Category";
import {map} from "lodash";

@Module({ namespaced: true })
export default class CategoryModule
    extends AppBaseModule
{
    category = new Category()
    categories = new Category()

    get getCategory(): Category {
        return this.category
    }

    get getCategories(): Category {
        return this.categories
    }

    @Mutation
    setCategory(category: Category): void {
        this.category = category
    }

    @Mutation
    setCategories(categories: Category): void {
        this.categories = categories
    }

    @Action
    async categoriesFromRemote(): Promise<void> {
        await api.get('products/categories/')
            .then((response: ResponseData) => {
                const data = response.data
                const categories = map(data, rawCategory => new Category(rawCategory))
                this.context.commit('setCategories', categories)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async fetchCategory(categorySlug: Category['slug']) {
       await api.get(`products/${categorySlug}/`)
           .then((response: ResponseData) => {
               const data = response.data
               let category = new Category(data)
               this.context.commit('setCategory', category)
           })
           .catch((e: Error) => {
               console.log(e)
           })
    }
}
