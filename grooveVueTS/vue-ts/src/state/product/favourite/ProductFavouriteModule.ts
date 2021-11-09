import {Action, Module, Mutation} from "vuex-module-decorators"
import AppBaseModule from "@/state/common/AppBaseModule"
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import ProductFavouriteModel from "@/state/product/favourite/ProductFavouriteModel"
import router from "@/routes"
import store from "@/store"
import { useToast } from 'vue-toastification'

const toast = useToast()

@Module({ namespaced: true })
export default class ProductFavouriteModule
    extends AppBaseModule
{

    favourites = [new ProductFavouriteModel()]

    get getFavouriteData(): ProductFavouriteModel[] {
        return this.favourites
    }

    get getStateIsCurrentProductInFavourites(): boolean {
        let productId = Number(router.currentRoute.value.params.product_id)
        const exists = this.favourites.filter(i => i.product_id === productId)
        return !!exists.length
    }

    @Mutation
    setUserFavourites(favourites: ProductFavouriteModel[]) {
        this.favourites = favourites
    }

    @Mutation
    unsetUserFavourites() {
        this.favourites = []
    }

    @Action
    async toggleFavourite(product: ProductFavouriteModel): Promise<string | undefined> {
        const IsAuthenticated: boolean = store.getters['user/data/getIsAuthenticated']
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
                this.context.commit('setUserFavourites', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async addToFavourites(): Promise<void> {

        let productId = router.currentRoute.value.params.product_id
        let data = {
            "user_id": store.getters['user/data/getUserId'],
            "product_id": productId
        }
        let user_id = data.user_id

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

        let user_id = store.getters['user/data/getUserId']
        let product_id = router.currentRoute.value.params.product_id

        try {
            await api.delete(`favourites/delete/${user_id}/${product_id}`)
            toast.success("Removed from favourites")
        } catch (error) {
            throw error
        }

        await this.context.dispatch('userFavouritesFromRemote', user_id)
    }

}
