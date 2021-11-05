import { map } from 'lodash'
import ProductModel from '@/state/product/ProductModel'
import {Module, Action, Mutation} from 'vuex-module-decorators'
import router from "@/routes"
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import UserReviewModel from "@/state/user/review/UserReviewModel"
import store from "@/store"

@Module({ namespaced: true })
export default class ProductModule
	extends AppBaseModule
{
	product = new ProductModel()
	latestProducts = [new ProductModel()]
	productReviews: Array<UserReviewModel> = []
	userToProductReview = new UserReviewModel()

	get getProductData(): ProductModel {
		return this.product
	}

	get getLatestProductData(): ProductModel[] {
		return this.latestProducts
	}

	get addToCartButtonText(): string {
		return (this.product.active === "False" || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
	}

	get getProductReviews(): UserReviewModel[] {
		return this.productReviews
	}

	get getUserToProductReview(): UserReviewModel {
		return this.userToProductReview
	}

	@Mutation
	setProduct(product: ProductModel): void {
		this.product = product
	}

	@Mutation
	setLatestProduct(latestProducts: ProductModel[]): void {
		this.latestProducts = latestProducts
	}

	@Mutation
	setProductReviews(productReviews: UserReviewModel[]): void {
		this.productReviews = productReviews
	}

	@Mutation
	setUserToProductReview(userToProductReview: UserReviewModel): void {
		this.productReviews.push(userToProductReview)
		this.userToProductReview = userToProductReview
	}

	@Mutation
	updateUserToProductReview(userToProductReview: UserReviewModel): void {
		// this.userToProductReview = userToProductReview
		//@TODO edw prepei na kanoume update to product review kai na to vlepei to store
	}

	@Action
	async productFromRemote(): Promise<void> {
		// let category_slug = router.currentRoute.value.params.category_slug
		let product_slug = router.currentRoute.value.params.product_slug
		await api.get(`products/product/${product_slug}`)
			.then((response: ResponseData) => {
				const data = response.data
				let product = new ProductModel(data)
				this.context.commit('setProduct', product)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async latestProductsFromRemote(): Promise<void> {
		await api.get('latest-products/')
			.then((response: ResponseData) => {
				const data = response.data
				const latestProduct = map(data, rawProduct => new ProductModel(rawProduct))
				this.context.commit('setLatestProduct', latestProduct)
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
	async updateProductHits(): Promise<void> {
		let product_slug = router.currentRoute.value.params.product_slug
		if (this.product){
			await api.patch(`products/product/${product_slug}/`)
				.catch((e: Error) => {
					console.log(e)
				})
		}
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
