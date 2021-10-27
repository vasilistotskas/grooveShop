import {first, filter, map, get} from 'lodash'
import Product from '@/state/product/Product'
import {Module, Action, Mutation} from 'vuex-module-decorators'
import router from "@/routes";
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import AppBaseModule from "@/state/common/AppBaseModule";

@Module({ namespaced: true })
export default class ProductModule
	extends AppBaseModule
{
	product = new Product()

	latestProducts = [new Product()]

	get getProductData(): Product {
		return this.product
	}

	get getLatestProductData(): Product[] {
		return this.latestProducts
	}

	get addToCartButtonText(): string {
		return (this.product.active === "False" || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
	}

	@Mutation
	setProduct(product: Product): void {
		this.product = product
	}

	@Mutation
	setLatestProduct(latestProducts: Product[]): void {
		this.latestProducts = latestProducts
	}

	@Action
	async getProduct(): Promise<void> {
		let category_slug = router.currentRoute.value.params.category_slug
		let product_slug = router.currentRoute.value.params.product_slug
		await api.get(`products/${category_slug}/${product_slug}`)
			.then((response: ResponseData) => {
				const data = response.data
				let product = new Product(data)
				this.context.commit('setProduct', product)
			})
			.catch((e: Error) => {
				console.log(e);
			})
	}

	@Action
	async updateProductHits(): Promise<void> {
		let category_slug = router.currentRoute.value.params.category_slug
		let product_slug = router.currentRoute.value.params.product_slug
		if (this.product){
			await api.patch(`products/${category_slug}/${product_slug}/`)
				.catch((e: Error) => {
					console.log(e);
				})
		}
	}

	@Action
	async getLatestProducts(): Promise<void> {
		await api.get('latest-products/')
			.then((response: ResponseData) => {
				const data = response.data
				const latestProduct = map(data, rawProduct => new Product(rawProduct))
				this.context.commit('setLatestProduct', latestProduct)
			})
			.catch((e: Error) => {
				console.log(e);
			})
	}

	@Action
	findItemById(itemId: number): Product {
		return first(
			filter(this.context.getters['getItems'],
				(item) => item.id === itemId)
		)
	}

}
