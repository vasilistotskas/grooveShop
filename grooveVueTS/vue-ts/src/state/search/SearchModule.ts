import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import ProductModel from "@/state/product/ProductModel"
import AppBaseModule from "@/state/common/AppBaseModule"
import {Module, Action, Mutation} from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ProductModule
    extends AppBaseModule
{
    results = [new ProductModel()]

    get getResultData(): ProductModel[] {
        return this.results
    }

    @Mutation
    setSearchResults(data: ProductModel[]): void { this.results = data }

    @Action
    async getSearchResults(params: object): Promise<void> {
        await api.post('products/search/', params)
            .then((response: ResponseData) => {
                const data = response.data
                let results = new ProductModel(data)
                this.context.commit('setSearchResults', results)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

}