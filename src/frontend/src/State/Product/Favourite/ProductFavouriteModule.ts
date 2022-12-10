import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import ProductFavouriteModel from '@/State/Product/Favourite/ProductFavouriteModel'

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'productFavourite'
})
export default class ProductFavouriteModule extends AppBaseModule {
	favourites: Array<ProductFavouriteModel> = []
	userFavourites: Array<ProductFavouriteModel> = []

	get getFavouriteData(): Array<ProductFavouriteModel> {
		return this.favourites
	}

	get getUserFavouriteData(): Array<ProductFavouriteModel> {
		return this.userFavourites
	}

	get getIsCurrentProductInUserFavourites(): (data: { productId: number }) => boolean {
		return (data: { productId: number }) => {
			const favouriteProducts = this.context.getters['getFavouriteData']
			if (!favouriteProducts) {
				return false
			}
			const exists = favouriteProducts.filter(
				(i: ProductFavouriteModel) => i.product_id === data.productId
			)
			return !!exists.length
		}
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
	async toggleFavourite(data: { productId: number; userId: number }): Promise<boolean> {
		try {
			if (!this.getIsCurrentProductInUserFavourites({ productId: data.productId })) {
				return await this.context.dispatch('addProductToFavourites', data)
			} else {
				return await this.context.dispatch('removeProductFavourites', data)
			}
		} catch (error) {
			console.log(error)
		}

		return false
	}

	@Action
	async fetchUserFavouritesFromRemote(userId: number): Promise<void> {
		return await api
			.get(`favourites/${userId}`)
			.then((response: AxiosResponse<Array<ProductFavouriteModel>>) => {
				const data = response.data
				this.context.commit('setFavourites', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async addProductToFavourites(data: {
		productId: number
		userId: number
	}): Promise<boolean> {
		const productId: number = data.productId
		const userId = data.userId

		const payload = {
			user_id: userId,
			product_id: productId
		}

		await api.post(`favourites/${userId}/`, payload)

		await this.context.dispatch('fetchUserFavouritesFromRemote', userId)

		return true
	}

	@Action
	async removeProductFavourites(data: {
		productId: number
		userId: number
	}): Promise<boolean> {
		const userId: number = data.userId
		const productId: number = data.productId

		await api.delete(`favourites/delete/${userId}/${productId}`)

		await this.context.dispatch('fetchUserFavouritesFromRemote', userId)

		return false
	}
}
