import router from '@/routes'
import { cloneDeep } from 'lodash'
import store from '@/dynamicStore'
import api from '@/api/api.service'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/state/common/AppBaseModule'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import PaginatedModel from '@/state/pagination/Model/PaginatedModel'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'

const toast = useToast()

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'productReview',
})
export default class ProductReviewModule extends AppBaseModule {
  namespace = PaginationNamespaceTypesEnum.USER_REVIEWS
  productReviews: Array<ProductReviewModel> = []
  productReviewsAverage = 0
  productReviewsCounter = 0

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

  get getUserReviews(): Array<ProductReviewModel> {
    return this.userReviews
  }

  get getUserToProductReview(): ProductReviewModel {
    return this.userToProductReview
  }

  get getUserHasAlreadyReviewedProduct(): boolean {
    return this.userToProductReview && Object.keys(this.userToProductReview).length > 0
  }

  @Mutation
  setProductReviews(data: { productReviews: Array<ProductReviewModel>; userId: number }): void {
    const productReviews = cloneDeep(data.productReviews)

    productReviews.forEach(function (item, i) {
      if (item.user_id === data.userId) {
        productReviews.splice(i, 1)
        productReviews.unshift(item)
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
    this.productReviews = <ProductReviewModel[]>{}
  }

  @Mutation
  createUserToProductReview(userToProductReview: ProductReviewModel): void {
    this.userToProductReview = userToProductReview
  }

  @Mutation
  removeUserToProductReview<T>(data: Record<string, T>): void {
    if (router.currentRoute.value.name === 'Product') {
      const paginationQuery: PaginationModel = PaginationModel.createPaginationModel({
        endpointUrl: `reviews/product/${data.product_id}`,
        queryParams: {
          page: store.getters['pagination/getCurrentPageNumber'](this.namespace),
          query: store.getters['pagination/getCurrentQuery'](this.namespace),
        },
        method: ApiBaseMethods.GET,
      })

      store
        .dispatch('pagination/fetchPaginatedResults', {
          params: paginationQuery,
          namespace: this.namespace,
        })
        .then(() => toast.error('Your review has been deleted'))
    }

    if (router.currentRoute.value.name === 'Reviews') {
      const paginationQuery: PaginationModel = PaginationModel.createPaginationModel({
        endpointUrl: `reviews/user/${data.user_id}`,
        queryParams: {
          page: store.getters['pagination/getCurrentPageNumber'](this.namespace),
          query: store.getters['pagination/getCurrentQuery'](this.namespace),
        },
        method: ApiBaseMethods.GET,
      })

      store
        .dispatch('pagination/fetchPaginatedResults', {
          params: paginationQuery,
          namespace: this.namespace,
        })
        .then(() => toast.error('Your review has been deleted'))
    }
  }

  @Mutation
  setUserReviews(reviews: Array<ProductReviewModel>): void {
    this.userReviews = reviews
  }

  @Mutation
  unsetUserReviews(): void {
    this.userReviews = <ProductReviewModel[]>{}
  }

  @Mutation
  setUserToProductReview(userToProductReview: ProductReviewModel): void {
    this.userToProductReview = userToProductReview
  }

  @Mutation
  updateUserToProductReview(id: number): void {
    const reviewId = this.productReviews.findIndex((u) => u.id === id)
    this.productReviews[reviewId] = this.userToProductReview
  }

  @Mutation
  unsetUserToProductReview(): void {
    this.userToProductReview = <ProductReviewModel>{}
  }

  @Action
  async toggleReview(data: FormData): Promise<void> {
    const IsAuthenticated: boolean = store.getters['auth/isAuthenticated']
    if (IsAuthenticated) {
      const product_id: string = store.getters['product/getProductId']
      const user_id: string = store.getters['user/getUserId']
      data.append('user_id', user_id)
      data.append('product_id', product_id)
      try {
        if (!this.getUserHasAlreadyReviewedProduct) {
          await this.context.dispatch('createCurrentProductReview', data)
        } else {
          await this.context.dispatch('updateCurrentProductReview', data)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error('You are not logged in')
      return
    }
  }

  @Action
  fetchCurrentUserReviews<T>(userId: number): Promise<void> {
    return api
      .get(`reviews/user/${userId}/`)
      .then((response: AxiosResponse<PaginatedModel<T>>) => {
        const data = response.data
        this.context.commit('setUserReviews', data)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  fetchCurrentProductReviewsFromRemote(productId: number, userId: number): Promise<void> {
    return api
      .get(`reviews/product/${productId}/`)
      .then((response: AxiosResponse<PaginatedModel<ProductReviewModel>>) => {
        const data = response.data
        this.context.commit('setProductReviews', { productReviews: data, userId: userId })
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  createCurrentProductReview<T>(data: FormData): Promise<void> {
    const product_id: number = store.getters['product/getProductId']
    return api
      .post(`reviews/product/${product_id}/`, data)
      .then((response: AxiosResponse<PaginatedModel<T>>) => {
        const data = response.data
        this.context.commit('createUserToProductReview', data)
        toast.success('Your review has been created')
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  fetchUserToProductReviewFromRemote(data: {
    productId: number
    userId: number | undefined
  }): Promise<void> | ProductReviewModel {
    if (!data.userId) {
      return new ProductReviewModel()
    }
    return api
      .get(`reviews/review/${data.userId}/${data.productId}/`)
      .then((response: AxiosResponse<ProductReviewModel>) => {
        const data = response.data
        this.context.commit('setUserToProductReview', data)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  updateCurrentProductReview(data: FormData): Promise<void> {
    const user_id: number = store.getters['user/getUserId']
    const product_id: number = store.getters['product/getProductId']

    return api
      .patch(`reviews/review/${user_id}/${product_id}/`, data)
      .then((response: AxiosResponse<ProductReviewModel>) => {
        const data = response.data
        this.context.commit('setUserToProductReview', data)
        this.context.commit('updateUserToProductReview', data.id)
        toast.success('Your review has been updated')
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  deleteCurrentProductReview(data: Record<string, number>): Promise<void> {
    return api
      .delete(`reviews/review/${data.userId}/${data.productId}/`)
      .then(() => {
        this.context.commit('removeUserToProductReview', data)
        this.context.commit('unsetUserToProductReview')
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }
}
