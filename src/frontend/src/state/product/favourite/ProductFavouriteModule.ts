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

	favourites = [new ProductFavouriteModel()]
	userFavourites = [new ProductFavouriteModel()]

	get getFavouriteData(): Array<ProductFavouriteModel> {
		return this.favourites
	}

	get getUserFavouriteData(): Array<ProductFavouriteModel> {
		return this.userFavourites
	}

	get getStateIsCurrentProductInFavourites(): boolean {
		const product_id: number = store.getters['product/getProductId']
		const exists = this.favourites.filter(i => i.product_id === product_id)
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
				if (!this.getStateIsCurrentProductInFavourites) {
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
	fetchUserFavouritesFromRemote(user_id: number): Promise<void> {
		return api.get(`favourites/${ user_id }`)
			.then((response: any) => {
				const data = response.data
				this.context.commit('setFavourites', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	fetchUserFavouriteProductsFromRemote(user_id: number): Promise<void> {
		return api.get(`favourites/products/${ user_id }`)
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
		const product_id: number = store.getters['product/getProductId']
		const data = {
			'user_id': store.getters['user/data/getUserId'],
			product_id
		}
		const user_id: number = data.user_id

		try {
			await api.post(`favourites/${ user_id }/`, data)
			toast.success('Added to favourites')
		} catch (error) {
			throw error
		}

		return await this.context.dispatch('fetchUserFavouritesFromRemote', user_id)
	}

	@Action
	async removeFromFavourites(): Promise<void> {
		const user_id: number = store.getters['user/data/getUserId']
		const product_id: number = store.getters['product/getProductId']

		try {
			await api.delete(`favourites/delete/${ user_id }/${ product_id }`)
			toast.success('Removed from favourites')
		} catch (error) {
			throw error
		}
		return await this.context.dispatch('fetchUserFavouritesFromRemote', user_id)
	}

}
