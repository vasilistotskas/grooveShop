import { Action, Module, Mutation } from 'vuex-module-decorators'
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import ProductReviewModel from "@/state/product/review/ProductReviewModel"
import router from "@/routes";
import store from "@/store";
import { useToast } from 'vue-toastification'
import { some } from 'lodash'

const toast = useToast()

@Module({ namespaced: true })
export default class ProductReviewModule
    extends AppBaseModule
{
    reviews = [new ProductReviewModel()]
    productReviews: Array<ProductReviewModel> = []
    userToProductReview = new ProductReviewModel()

    get getUserReviews(): ProductReviewModel[] {
        return this.reviews

    }
    get getProductReviews(): ProductReviewModel[] {
        return this.productReviews
    }

    get getUserToProductReview(): ProductReviewModel {
        return this.userToProductReview
    }

    get userHasAlreadyReviewedProduct(): boolean {
        let user_id = store.getters['user/data/getUserId']
        return some(this.productReviews, ['user_id', user_id])
    }

    @Mutation
    setUserReviews(reviews: Array<any>): void {
        this.reviews = reviews
    }

    @Mutation
    setProductReviews(productReviews: ProductReviewModel[]): void {
        this.productReviews = productReviews
    }

    @Mutation
    setUserToProductReview(userToProductReview: ProductReviewModel): void {
        this.productReviews.push(userToProductReview)
        this.userToProductReview = userToProductReview
    }

    @Mutation
    updateUserToProductReview(userToProductReview: ProductReviewModel): void {
        // this.userToProductReview = userToProductReview
        //@TODO edw prepei na kanoume update to product review kai na to vlepei to store
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
                this.context.commit('setUserToProductReview', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }


    @Action
    async userToProductReviewFromRemote(data: any): Promise<void> {
        let user_id = store.getters['user/data/getUserId']
        let product_id: Number = store.getters['product/getProductId']

        await api.get(`reviews/review/${user_id}/${product_id}/`, data)
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
                this.context.commit('updateUserToProductReview', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async deleteCurrentProductReview(): Promise<void> {
        let user_id = store.getters['user/data/getUserId']
        let product_id: Number = store.getters['product/getProductId']

        await api.delete(`reviews/review/${user_id}/${product_id}/`)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setProductReviews', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }
}
