import { map } from 'lodash'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import ProductModel from '@/State/Product/ProductModel'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Module, Action, Mutation } from 'vuex-module-decorators'
import { useRouter } from 'vue-router'

@Module({
	namespaced: true,
	name: 'product'
})
export default class ProductModule extends AppBaseModule {
	router = useRouter()
	product!: ProductModel
	latestProducts: Array<ProductModel> = []

	get getProductData(): ProductModel {
		return this.product
	}

	get getLatestProductData(): ProductModel[] {
		return this.latestProducts
	}

	get addToCartButtonText(): string {
		return this.product?.active === 'False' || this.product?.stock <= 0
			? 'Out Of Stock'
			: 'Add To Cart'
	}

	@Mutation
	setProduct(product: ProductModel): void {
		this.product = product
	}

	@Mutation
	setLatestProduct(latestProducts: ProductModel[]): void {
		this.latestProducts = latestProducts
	}

	@Action
	async fetchProductFromRemote(): Promise<void> {
		const category_slug = this.router.currentRoute.value.params.category_slug
		const product_slug = this.router.currentRoute.value.params.product_slug

		return await api
			.get(`products/${category_slug}/${product_slug}`)
			.then((response: AxiosResponse<ProductModel>) => {
				const data = response.data
				this.context.commit('setProduct', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async fetchLatestProductsFromRemote(): Promise<void> {
		return await api
			.get('latest-products/')
			.then((response: AxiosResponse<Array<ProductModel>>) => {
				const data = response.data
				const latestProduct = map(data, (rawProduct) => new ProductModel(rawProduct))
				this.context.commit('setLatestProduct', latestProduct)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateProductHits(): Promise<unknown> {
		const category_slug = this.router.currentRoute.value.params.category_slug
		const product_slug = this.router.currentRoute.value.params.product_slug

		if (!category_slug && product_slug) {
			return Promise.resolve()
		}

		return await api
			.patch(`products/${category_slug}/${product_slug}/`)
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
