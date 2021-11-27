import { Action, Module, Mutation } from 'vuex-module-decorators'
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import ProductReviewModel from "@/state/product/review/ProductReviewModel"
import store from "@/store"
import { useToast } from 'vue-toastification'
import { some, reject } from 'lodash'

const toast = useToast()

@Module({ namespaced: true })
export default class ProductReviewModule
    extends AppBaseModule
{
    productReviews: Array<ProductReviewModel> = []
    productReviewsAverage: number = 0
    productReviewsCounter: number = 0

    userReviews: Array<ProductReviewModel> = []
    userToProductReview = new ProductReviewModel()

    get getProductReviews(): ProductReviewModel[] {
        return this.productReviews
    }

    get getProductReviewsAverage(): number {
        return this.productReviewsAverage
    }

    get getProductReviewsCounter(): number {
        return this.productReviewsCounter
    }

    get getUserReviews(): ProductReviewModel[] {
        return this.userReviews
    }

    get getUserToProductReview(): ProductReviewModel {
        return this.userToProductReview
    }

    get getUserHasAlreadyReviewedProduct(): boolean {
        return this.userToProductReview && Object.keys(this.userToProductReview).length > 0
    }

    @Mutation
    setProductReviews(productReviews: ProductReviewModel[]): void {

        let user_id: number = store.getters['user/data/getUserId']

        productReviews.forEach(function(item,i){
            if(item.user_id === user_id){
                productReviews.splice(i, 1);
                productReviews.unshift(item);
            }
        })

        this.productReviews = productReviews
    }

    @Mutation
    setProductReviewsAverage(average: number): void {
        this.productReviewsAverage = average
    }

    @Mutation
    setProductReviewsCounter(counter: number): void {
        this.productReviewsCounter = counter
    }

    @Mutation
    unsetProductReviews(): void {
        // @ts-ignore
        this.productReviews = {}
    }

    @Mutation
    createUserToProductReview(userToProductReview: ProductReviewModel): void {
        this.productReviews.unshift(userToProductReview)
        this.userToProductReview = userToProductReview
    }

    @Mutation
    removeUserToProductReview(data: any): void {
        const reviewId = this.productReviews.findIndex(u => [u.user_id === data.user_id, u.product_id === data.product_id])
        this.productReviews.splice(reviewId, 1)
    }

    @Mutation
    setUserReviews(reviews: Array<ProductReviewModel>): void {
        this.userReviews = reviews
    }

    @Mutation
    unsetUserReviews(): void {
        // @ts-ignore
        this.userReviews = {}
    }

    @Mutation
    setUserToProductReview(userToProductReview: ProductReviewModel): void {
        this.userToProductReview = userToProductReview
    }

    @Mutation
    updateUserToProductReview(id: number): void {
        const reviewId = this.productReviews.findIndex(u => u.id === id)
        this.productReviews[reviewId] = this.userToProductReview
    }

    @Mutation
    unsetUserToProductReview(): void {
        // @ts-ignore
        this.userToProductReview = {}
    }

    @Action
    async toggleReview(data: any): Promise<string | undefined> {
        let IsAuthenticated: boolean = store.getters['user/data/getIsAuthenticated']
        if(IsAuthenticated){
            let product_id: number = store.getters['product/getProductId']
            let user_id: number = store.getters['user/data/getUserId']
            data.append('user_id', user_id)
            data.append('product_id', product_id)
            try {
                if(!this.getUserHasAlreadyReviewedProduct) {
                    await this.context.dispatch('createCurrentProductReview', data)
                    return 'Your review has been created'
                } else {
                    await this.context.dispatch('updateCurrentProductReview', data)
                    return 'Your review has been updated'
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            toast.error("You are not logged in")
        }
    }

    @Action
    async getCurrentUserReviews(userId: number): Promise<void> {
        await api.get(`reviews/user/${userId}/`)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserReviews', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async currentProductReviewsFromRemote(): Promise<void> {
        let product_id: number = store.getters['product/getProductId']
        await api.get(`reviews/product/${product_id}/`)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setProductReviews', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async createCurrentProductReview(data: any): Promise<void> {
        let product_id: number = store.getters['product/getProductId']
        await api.post(`reviews/product/${product_id}/`, data)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('createUserToProductReview', data)
                toast.success("Your review has been created")
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }


    @Action
    async userToProductReviewFromRemote(): Promise<void> {
        let user_id: number = store.getters['user/data/getUserId']
        let product_id: number = store.getters['product/getProductId']

        await api.get(`reviews/review/${user_id}/${product_id}/`)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserToProductReview', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async updateCurrentProductReview(data: any): Promise<void> {
        let user_id: number = store.getters['user/data/getUserId']
        let product_id: number = store.getters['product/getProductId']

        await api.patch(`reviews/review/${user_id}/${product_id}/`, data)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserToProductReview', data)
                this.context.commit('updateUserToProductReview', data.id)
                toast.success("Your review has been updated")
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async deleteCurrentProductReview(data: any): Promise<void> {
        let user_id: number = store.getters['user/data/getUserId']
        let product_id: number = store.getters['product/getProductId']

        await api.delete(`reviews/review/${user_id}/${product_id}/`)
            .then((response: ResponseData) => {
                this.context.commit('removeUserToProductReview', data)
                this.context.commit('unsetUserToProductReview')
                toast.error("Your review has been deleted")
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }
}
