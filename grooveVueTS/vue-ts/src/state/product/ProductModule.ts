import {first, filter, map, get} from 'lodash'
import Product from '@/state/product/Product'
import ProductDTO from '@/state/product/ProductDTO'
import ProductKey from '@/state/product/ProductKey'
import {Module, Action, Mutation} from 'vuex-module-decorators'
import router from "@/routes";
import api from "@/api/api.service";
import AbstractBasketableBaseEntityModule
	from '@/state/common/AbstractBasketableBaseEntityModule'
import ResponseData from "@/state/types/ResponseData";
import AppBaseModule from "@/state/common/AppBaseModule";

@Module({ namespaced: true })
export default class ProductModule
	extends AppBaseModule
{
	product = new Product(
		0, '', 0, '', '', 0, 0, 0, 0,
		0, 0, 0, 0, '', 0, 0, '',
		'', 0, 0, []
	)

	latestProducts: Record<ProductKey, Product> = []

	get getProductData(): Product {
		return this.product
	}

	get getLatestProductData(): Record<ProductKey, Product> {
		return this.latestProducts
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
				let product = new Product(
					data.id,
					data.name,
					data.category,
					data.get_absolute_url,
					data.description,
					data.price,
					data.vat,
					data.vat_percent,
					data.vat_value,
					data.final_price,
					data.hits,
					data.likes_counter,
					data.stock,
					data.active,
					data.discount_percent,
					data.discount_value,
					data.date_added,
					data.main_image,
					data.review_avarege,
					data.review_counter,
					data.images
				)
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
				const latestProduct = map(
					data,
					product => new Product(
						product.id,
						product.name,
						product.category,
						product.get_absolute_url,
						product.description,
						product.price,
						product.vat,
						product.vat_percent,
						product.vat_value,
						product.final_price,
						product.hits,
						product.likes_counter,
						product.stock,
						product.active,
						product.discount_percent,
						product.discount_value,
						product.date_added,
						product.main_image,
						product.review_avarege,
						product.review_counter,
						product.images
					)
				)
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
