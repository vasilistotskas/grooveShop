import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";

@Module({ namespaced: true })
export default class CategoryModule
    extends AppBaseModule
{
    categories: Array<any> = []

    get getCategories(): Array<any> {
        return this.categories
    }

    @Mutation
    setCategories(categories: Array<any>): void {
        this.categories = categories
    }

    @Action
    async categoriesFromRemote(): Promise<void> {
        await api.get('products/categories/')
            .then((response: ResponseData) => {
                const categories = response.data
                this.context.commit('setCategories', categories)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


}