import {Action, Module, Mutation} from "vuex-module-decorators";
import AppBaseModule from "@/state/common/AppBaseModule";
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import UserFavouriteModel from "@/state/user/favourite/UserFavouriteModel";
import router from "@/routes";
import store from "@/store";

@Module({ namespaced: true })
export default class UserFavouriteModule
    extends AppBaseModule
{

    favourites = [new UserFavouriteModel()]

    get getFavouriteData(): UserFavouriteModel[] {
        return this.favourites
    }

    get getStateIsCurrentProductInFavourites(): boolean {
        let productId = Number(router.currentRoute.value.params.product_id)
        const exists = this.favourites.filter(i => i.product_id === productId)
        return !!exists.length
    }

    @Mutation
    setUserFavourites(favourites: UserFavouriteModel[]) {
        this.favourites = favourites
    }

    @Mutation
    unsetUserFavourites() {
        this.favourites = []
    }

    @Action
    async toggleFavourite(product: UserFavouriteModel): Promise<string> {
        store.dispatch('user/data/ensureUserIsAuthenticated')

        if (!this.getStateIsCurrentProductInFavourites) {
            await this.context.dispatch('addToFavourites', product)
            return 'The product was added to the favourites'
        } else {
            await this.context.dispatch('removeFromFavourites', product)
            return 'The product was removed from favourites'
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
                console.log(e);
            })
    }

    @Action
    async addToFavourites(): Promise<void> {
        await store.dispatch('user/data/ensureUserIsAuthenticated')

        let productId = router.currentRoute.value.params.product_id
        let data = {
            "user_id": store.getters['user/data/getUserId'],
            "product_id": productId
        }
        let user_id = data.user_id

        await api.post(`favourites/${user_id}/`, data)
        await this.context.dispatch('userFavouritesFromRemote', user_id)
    }

    @Action
    async removeFromFavourites(): Promise<void> {
        await store.dispatch('user/data/ensureUserIsAuthenticated')

        let user_id = store.getters['user/data/getUserId']
        let product_id = router.currentRoute.value.params.product_id

        await api.delete(`favourites/delete/${user_id}/${product_id}`)
        await this.context.dispatch('userFavouritesFromRemote', user_id)
    }

}
