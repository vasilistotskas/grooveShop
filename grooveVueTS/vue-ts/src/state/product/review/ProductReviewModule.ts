import { Action, Module, Mutation } from 'vuex-module-decorators'
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import ProductReviewModel from "@/state/product/review/ProductReviewModel"
import router from "@/routes";
import store from "@/store";

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
    async currentProductReviewsFromRemote(productId: number): Promise<void> {
        await api.get(`reviews/product/${productId}/`)
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
        let product_id = router.currentRoute.value.params.product_id

        await api.post(`reviews/product/${product_id}/`, data)
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setProductReviews', data)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }


    @Action
    async userToProductReviewFromRemote(data: any): Promise<void> {
        let user_id = store.getters['user/data/getUserId']
        let product_id = router.currentRoute.value.params.product_id

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
        let product_id = router.currentRoute.value.params.product_id

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
        let product_id = router.currentRoute.value.params.product_id

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
