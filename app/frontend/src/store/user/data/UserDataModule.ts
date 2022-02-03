import store from '@/store'
import api from '@/api/api.service'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/store/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserDetailsModel from '@/store/user/data/UserDetailsModel'

const toast = useToast()

@Module({
	name: 'Module/UserDataModule',
	namespaced: true,
	stateFactory: true
})
export default class UserDataModule
	extends AppBaseModule {
	user_id!: number | undefined
	data = new UserDetailsModel()

	get getUserId(): number | undefined {
		return this.user_id
	}

	get getUserData(): UserDetailsModel {
		return this.data
	}

	@Mutation
	setUserData(data: UserDetailsModel): void {
		this.data = data
	}

	@Mutation
	setUserId(user_id: number) {
		this.user_id = user_id
	}

	@Mutation
	unsetUserData(): void {
		this.data = new UserDetailsModel()
		this.user_id = undefined

		store.dispatch('auth/logout').then(() => {
			store.commit('product/favourite/unsetFavourites')
			store.commit('product/favourite/unsetUserFavourites')
			store.commit('product/review/unsetUserToProductReview')
			store.commit('product/review/unsetUserReviews')
			store.commit('user/order/unsetUserOrders')
			store.commit('country/unsetUserCountryData')
		})
	}

	@Action
	async userDataFromRemote(): Promise<void> {

		await api.get('userprofile/data')
			.then((response: any) => {
				const data = response.data
				this.context.commit('setUserData', data[0])
				this.context.commit('setUserId', data[0].id)
				store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
				store.dispatch('product/favourite/userFavouritesFromRemote', response.data[0].user)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateUserDetails(data: any): Promise<void> {
		const user_id = await this.context.getters['getUserId']

		try {
			await api.patch(`userprofile/${ user_id }/`, data)
				.then((response: any) => this.context.commit('setUserData', response.data))
				.catch((e: Error) => {
					console.log(e)
				})
			toast.success('Profile Updated')
		} catch (error) {
			throw error
		}
	}
}
