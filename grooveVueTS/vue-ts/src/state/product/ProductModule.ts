import { map } from 'lodash'
import ProductModel from '@/state/product/ProductModel'
import {Module, Action, Mutation} from 'vuex-module-decorators'
import router from "@/routes"
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"

@Module({ namespaced: true })
export default class ProductModule
	extends AppBaseModule
{
	product = new ProductModel()
	latestProducts = [new ProductModel()]
	product_id!: number

	get getProductData(): ProductModel {
		return this.product
	}

	get getProductId(): number {
		return this.product_id
	}

	get getLatestProductData(): ProductModel[] {
		return this.latestProducts
	}

	get addToCartButtonText(): string {
		return (this.product.active === "False" || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
	}

	@Mutation
	setProduct(product: ProductModel): void {
		this.product = product
	}

	@Mutation
	setProductId(productId: number): void {
		this.product_id = productId
	}

	@Mutation
	setLatestProduct(latestProducts: ProductModel[]): void {
		this.latestProducts = latestProducts
	}

	@Action
	async productFromRemote(): Promise<void> {
		let category_id = router.currentRoute.value.params.category_id
		let product_slug = router.currentRoute.value.params.product_slug

		await api.get(`products/${product_slug}/${category_id}`)
			.then((response: ResponseData) => {
				const data = response.data
				let product = new ProductModel(data)
				this.context.commit('setProduct', product)
				this.context.commit('setProductId', data.id)
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
	async updateProductHits(): Promise<void> {
		let category_id = router.currentRoute.value.params.category_id
		let product_slug = router.currentRoute.value.params.product_slug

		if (this.product){
			await api.patch(`products/${product_slug}/${category_id}/`)
				.catch((e: Error) => {
					console.log(e)
				})
		}
	}

}
