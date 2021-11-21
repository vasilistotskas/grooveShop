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
    productReviewsAverage: Number = 0
    productReviewsCounter: Number = 0

    userReviews: Array<ProductReviewModel> = []
    userToProductReview = new ProductReviewModel()

    get getProductReviews(): ProductReviewModel[] {
        return this.productReviews
    }

    get getProductReviewsAverage(): Number {
        return this.productReviewsAverage
    }

    get getProductReviewsCounter(): Number {
        return this.productReviewsCounter
    }

    get getUserReviews(): ProductReviewModel[] {
        return this.userReviews
    }

    get getUserToProductReview(): ProductReviewModel {
        return this.userToProductReview
    }

    get userHasAlreadyReviewedProduct(): boolean {
        let user_id = store.getters['user/data/getUserId']
        let product_id: Number = store.getters['product/getProductId']
        return some(this.productReviews, { 'user_id': user_id, 'product_id': product_id })
    }

    @Mutation
    setProductReviews(productReviews: ProductReviewModel[]): void {

        let user_id = store.getters['user/data/getUserId']

        productReviews.forEach(function(item,i){
            if(item.user_id === user_id){
                productReviews.splice(i, 1);
                productReviews.unshift(item);
            }
        })

        this.productReviews = productReviews
    }

    @Mutation
    setProductReviewsAverage(average: Number): void {
        this.productReviewsAverage = average
    }

    @Mutation
    setProductReviewsCounter(counter: Number): void {
        this.productReviewsCounter = counter
    }

    @Mutation
    unsetProductReviews() {
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
    setUserReviews(reviews: Array<any>): void {
        this.userReviews = reviews
    }

    @Mutation
    unsetUserReviews() {
        // @ts-ignore
        this.userReviews = {}
    }

    @Mutation
    setUserToProductReview(userToProductReview: ProductReviewModel): void {
        this.userToProductReview = userToProductReview
    }

    @Mutation
    updateUserToProductReview(id: Number): void {
        const reviewId = this.productReviews.findIndex(u => u.id === id)
        this.productReviews[reviewId] = this.userToProductReview
    }

    @Mutation
    unsetUserToProductReview() {
        // @ts-ignore
        this.userToProductReview = {}
    }

    @Action
    async toggleReview(data: any): Promise<string | undefined> {
        let IsAuthenticated: boolean = store.getters['user/data/getIsAuthenticated']
        if(IsAuthenticated){
            let product_id: Number = store.getters['product/getProductId']
            let user_id = store.getters['user/data/getUserId']
            data.append('user_id', user_id)
            data.append('product_id', product_id)
            try {
                if(!this.userHasAlreadyReviewedProduct) {
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
        let product_id: Number = store.getters['product/getProductId']
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
        let product_id: Number = store.getters['product/getProductId']
        await api.post(`reviews/product/${product_id}/`, data)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('createUserToProductReview', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }


    @Action
    async userToProductReviewFromRemote(): Promise<void> {
        let user_id = store.getters['user/data/getUserId']
        let product_id: Number = store.getters['product/getProductId']

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
        let user_id = store.getters['user/data/getUserId']
        let product_id: Number = store.getters['product/getProductId']

        await api.patch(`reviews/review/${user_id}/${product_id}/`, data)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserToProductReview', data)
                this.context.commit('updateUserToProductReview', data.id)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async deleteCurrentProductReview(data: any): Promise<void> {
        let user_id = store.getters['user/data/getUserId']
        let product_id: Number = store.getters['product/getProductId']

        await api.delete(`reviews/review/${user_id}/${product_id}/`)
            .then((response: ResponseData) => {
                this.context.commit('removeUserToProductReview', data)
                this.context.commit('unsetUserToProductReview')
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }
}
