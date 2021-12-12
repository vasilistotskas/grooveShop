import store from "@/store"
import { forEach } from 'lodash'
import api from "@/api/api.service"
import { useToast } from 'vue-toastification'
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import {Action, Module, Mutation} from "vuex-module-decorators"
import ProductFavouriteModel from "@/state/product/favourite/ProductFavouriteModel"

const toast = useToast()

@Module({ namespaced: true })
export default class ProductFavouriteModule
    extends AppBaseModule
{

    favourites = [new ProductFavouriteModel()]
    userFavourites = [new ProductFavouriteModel()]

    get getFavouriteData(): ProductFavouriteModel[] {
        return this.favourites
    }

    get getUserFavouriteData(): ProductFavouriteModel[] {
        return this.userFavourites
    }

    get getStateIsCurrentProductInFavourites(): boolean {
        let product_id: number = store.getters['product/getProductId']
        const exists = this.favourites.filter(i => i.product_id === product_id)
        return !!exists.length
    }

    @Mutation
    setFavourites(favourites: ProductFavouriteModel[]): void {
        this.favourites = favourites
    }

    @Mutation
    unsetFavourites(): void {
        this.favourites = []
    }

    @Mutation
    setUserFavourites(favourites: ProductFavouriteModel[]): void {
        this.userFavourites = favourites
    }

    @Mutation
    unsetUserFavourites(): void {
        this.userFavourites = []
    }

    @Action
    async toggleFavourite(product: ProductFavouriteModel): Promise<string | undefined> {
        let IsAuthenticated: boolean = store.getters['user/data/getIsAuthenticated']
        if(IsAuthenticated){
            try {
                if(!this.getStateIsCurrentProductInFavourites) {
                    await this.context.dispatch('addToFavourites', product)
                    return 'The product was added to the favourites'
                } else {
                    await this.context.dispatch('removeFromFavourites', product)
                    return 'The product was removed from favourites'
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            toast.error("You are not logged in")
        }
    }

    @Action
    async userFavouritesFromRemote(user_id: number): Promise<void> {

        await api.get(`favourites/${user_id}`)
            .then((response: ResponseData) => {
                let data = response.data
                this.context.commit('setFavourites', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async userFavouriteProductsFromRemote(user_id: number): Promise<void> {

        await api.get(`favourites/products/${user_id}`)
            .then((response: ResponseData) => {
                let data = response.data
                const transformedData: any[] = []
                forEach(data, function(value, key) {
                    transformedData.push(value.product_object)
                });
                this.context.commit('setUserFavourites', transformedData)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async addToFavourites(): Promise<void> {

        let product_id: number = store.getters['product/getProductId']
        let data = {
            "user_id": store.getters['user/data/getUserId'],
            "product_id": product_id
        }
        let user_id: number = data.user_id

        try {
            await api.post(`favourites/${user_id}/`, data)
            toast.success("Added to favourites")
        } catch (error) {
            throw error
        }

        await this.context.dispatch('userFavouritesFromRemote', user_id)
    }

    @Action
    async removeFromFavourites(): Promise<void> {

        let user_id: number = store.getters['user/data/getUserId']
        let product_id: number = store.getters['product/getProductId']

        try {
            await api.delete(`favourites/delete/${user_id}/${product_id}`)
            toast.success("Removed from favourites")
        } catch (error) {
            throw error
        }

        await this.context.dispatch('userFavouritesFromRemote', user_id)
    }

}
