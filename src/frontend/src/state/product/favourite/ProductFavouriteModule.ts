import store from '@/store'
import { forEach } from 'lodash'
import api from '@/api/api.service'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import ProductFavouriteModel from '@/state/product/favourite/ProductFavouriteModel'

const toast = useToast()

@Module({ namespaced: true })
export default class ProductFavouriteModule extends AppBaseModule {

	favourites: Array<ProductFavouriteModel> = []
	userFavourites: Array<ProductFavouriteModel> = []

	get getFavouriteData(): Array<ProductFavouriteModel> {
		return this.favourites
	}

	get getUserFavouriteData(): Array<ProductFavouriteModel> {
		return this.userFavourites
	}

	get getIsCurrentProductInUserFavourites(): boolean {
		const productId: number = store.getters['product/getProductId']
		const favouriteProducts = this.context.getters['getFavouriteData']
		const exists = favouriteProducts.filter((i: ProductFavouriteModel) => i.product_id === productId)
		return !!exists.length
	}

	@Mutation
	setFavourites(favourites: Array<ProductFavouriteModel>): void {
		this.favourites = favourites
	}

	@Mutation
	unsetFavourites(): void {
		this.favourites = []
	}

	@Mutation
	setUserFavourites(favourites: Array<ProductFavouriteModel>): void {
		this.userFavourites = favourites
	}

	@Mutation
	unsetUserFavourites(): void {
		this.userFavourites = []
	}

	@Action
	async toggleFavourite(product: ProductFavouriteModel): Promise<any> {
		const IsAuthenticated: boolean = store.getters['auth/isAuthenticated']
		if (IsAuthenticated) {
			try {
				if (!this.getIsCurrentProductInUserFavourites) {
					await this.context.dispatch('addToFavourites', product)
					return 'The product was added to the favourites'
				} else {
					await this.context.dispatch('removeFromFavourites', product)
					return 'The product was removed from favourites'
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			return toast.error('You are not logged in')
		}
	}

	@Action
	fetchUserFavouritesFromRemote(userId: number): Promise<void> {
		return api.get(`favourites/${ userId }`)
			.then((response: any) => {
				const data = response.data
				this.context.commit('setFavourites', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	fetchUserFavouriteProductsFromRemote(userId: number): Promise<void> {
		return api.get(`favourites/products/${ userId }`)
			.then((response: any) => {
				const data = response.data.results
				const transformedData: any[] = []
				forEach(data, function (value) {
					transformedData.push(value.product_object)
				})
				this.context.commit('setUserFavourites', transformedData)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async addToFavourites(): Promise<void> {
		const productId: number = store.getters['product/getProductId']
		const data = {
			'user_id': store.getters['user/getUserId'],
			productId
		}
		const userId: number = data.user_id

		try {
			await api.post(`favourites/${ userId }/`, data)
			toast.success('Added to favourites')
		} catch (error) {
			throw error
		}

		return await this.context.dispatch('fetchUserFavouritesFromRemote', userId)
	}

	@Action
	async removeFromFavourites(): Promise<void> {
		const userId: number = store.getters['user/getUserId']
		const productId: number = store.getters['product/getProductId']

		try {
			await api.delete(`favourites/delete/${ userId }/${ productId }`)
			toast.success('Removed from favourites')
		} catch (error) {
			throw error
		}
		return await this.context.dispatch('fetchUserFavouritesFromRemote', userId)
	}

}
