import { map } from 'lodash'
import ProductModel from '@/state/product/ProductModel'
import {Module, Action, Mutation} from 'vuex-module-decorators'
import router from "@/routes"
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import UserReviewModel from "@/state/user/review/UserReviewModel"

@Module({ namespaced: true })
export default class ProductModule
	extends AppBaseModule
{
	product = new ProductModel()
	latestProducts = [new ProductModel()]
	reviews = [new UserReviewModel()]

	get getProductData(): ProductModel {
		return this.product
	}

	get getLatestProductData(): ProductModel[] {
		return this.latestProducts
	}

	get addToCartButtonText(): string {
		return (this.product.active === "False" || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
	}

	get getProductReviews(): UserReviewModel[] { return this.reviews }

	@Mutation
	setProduct(product: ProductModel): void {
		this.product = product
	}

	@Mutation
	setLatestProduct(latestProducts: ProductModel[]): void {
		this.latestProducts = latestProducts
	}

	@Mutation
	setProductReviews(reviews: Array<any>): void { this.reviews = reviews }

	@Action
	async getProductFromRemote(): Promise<void> {
		let category_slug = router.currentRoute.value.params.category_slug
		let product_slug = router.currentRoute.value.params.product_slug
		await api.get(`products/${category_slug}/${product_slug}`)
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
	async updateProductHits(): Promise<void> {
		let category_slug = router.currentRoute.value.params.category_slug
		let product_slug = router.currentRoute.value.params.product_slug
		if (this.product){
			await api.patch(`products/${category_slug}/${product_slug}/`)
				.catch((e: Error) => {
					console.log(e)
				})
		}
	}

	@Action
	async getLatestProducts(): Promise<void> {
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
	async getCurrentProductReviews(productId: number): Promise<void> {
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
	async createCurrentProductReview(productId: number, data: any): Promise<void> {
		await api.post(`reviews/product/${productId}/`, data)
			.then((response: ResponseData) => {
				const data = response.data
				this.context.commit('setProductReviews', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateCurrentProductReview(userId:number, productId: number, data: any): Promise<void> {
		await api.patch(`reviews/review/${userId}/${productId}/`, data)
			.then((response: ResponseData) => {
				const data = response.data
				this.context.commit('setProductReviews', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async deleteCurrentProductReview(userId:number, productId: number): Promise<void> {
		await api.delete(`reviews/review/${userId}/${productId}/`)
			.then((response: ResponseData) => {
				const data = response.data
				this.context.commit('setProductReviews', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

}
