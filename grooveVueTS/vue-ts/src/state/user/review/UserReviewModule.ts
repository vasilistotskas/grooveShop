import { Action, Module, Mutation } from 'vuex-module-decorators'
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import UserReviewModel from "@/state/user/review/UserReviewModel"

@Module({ namespaced: true })
export default class UserReviewModule
    extends AppBaseModule
{
    reviews = [new UserReviewModel()]

    get getUserReviews(): UserReviewModel[] { return this.reviews }

    @Mutation
    setUserReviews(reviews: Array<any>): void { this.reviews = reviews }

    @Action
    async getCurrentUserProductReviews(userId: number): Promise<void> {

        await api.get(`reviews/user/${userId}/`)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserReviews', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }
}
