import { cloneDeep } from 'lodash'
import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import ProductReviewModel from '@/State/Product/Review/ProductReviewModel'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

const toast = useToast()

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'productReview'
})
export default class ProductReviewModule extends AppBaseModule {
	namespace = PaginationNamespaceTypesEnum.USER_REVIEWS
	productReviews!: Array<ProductReviewModel>
	productReviewsAverage = 0
	productReviewsCounter = 0

	userReviews: Array<ProductReviewModel> = []
	userToProductReview = new ProductReviewModel()

	get getNamespace(): PaginationNamespaceTypesEnum {
		return this.namespace
	}

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
	setProductReviews(data: {
		productReviews: Array<ProductReviewModel>
		userId: number
	}): void {
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
	async toggleReview(data: {
		FormData: FormData
		IsAuthenticated: boolean
		productId: number
		userId: number | undefined
	}): Promise<void> {
		if (data.IsAuthenticated) {
			data.FormData.append('user_id', String(data.userId))
			data.FormData.append('product_id', String(data.productId))
			try {
				if (!this.getUserHasAlreadyReviewedProduct) {
					await this.context.dispatch('createCurrentProductReview', {
						FormData: data.FormData,
						productId: data.productId
					})
				} else {
					await this.context.dispatch('updateCurrentProductReview', {
						FormData: data.FormData,
						productId: data.productId,
						userId: data.userId
					})
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
	createCurrentProductReview<T>(data: {
		FormData: FormData
		productId: number
	}): Promise<void> {
		return api
			.post(`reviews/product/${data.productId}/`, data.FormData)
			.then((response: AxiosResponse<PaginatedModel<T>>) => {
				const responseData = response.data
				this.context.commit('createUserToProductReview', responseData)
				toast.success('Your Review has been created')
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
	updateCurrentProductReview(data: {
		FormData: FormData
		productId: number
		userId: number
	}): Promise<void> {
		return api
			.patch(`reviews/review/${data.userId}/${data.productId}/`, data.FormData)
			.then((response: AxiosResponse<ProductReviewModel>) => {
				const responseData = response.data
				this.context.commit('setUserToProductReview', responseData)
				this.context.commit('updateUserToProductReview', responseData.id)
				toast.success('Your Review has been updated')
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
				this.context.commit('unsetUserToProductReview')
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
