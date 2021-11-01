import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import router from "@/routes";

@Module({ namespaced: true })
export default class UserModule
    extends AppBaseModule
{
    errors: Array<any> = []
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
                console.log(e)
            })
    }

    @Action
    async userSignUp(formData: object): Promise<void> {
        await api.post('djoser/users/', formData)
            .then((response: ResponseData) => {
                router.push('/log-in')
            })
            .catch((error: Error) => {
                if (error) {
                    for (const property in error) {
                        this.errors.push(`${error}`)
                    }
                    console.log(JSON.stringify(error))
                } else if (error) {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(JSON.stringify(error))
                }
            })
    }

}