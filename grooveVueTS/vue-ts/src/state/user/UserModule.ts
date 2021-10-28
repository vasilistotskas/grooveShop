import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";

@Module({ namespaced: true })
export default class UserModule
    extends AppBaseModule
{
    // reviews: Array<any> = []
    // favourites: Array<any> = []

    // get getUserReviews(): Array<any> { return this.reviews }
    // get getUserFavourites(): Array<any> { return this.favourites }

    // @Mutation
    // setUserReviews(reviews: Array<any>): void { this.reviews = reviews }
    //
    // @Mutation
    // setUserFavourites(favourites: Array<any>): void { this.favourites = favourites }

    @Action
    async userLogIn(formData: object): Promise<void> {
        await api.post('djoser/token/login', formData)
            .then((response: ResponseData) => {
                const token: string = response.data.auth_token
                localStorage.setItem("token", token)
                this.context.commit('data/setToken', token)
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

}