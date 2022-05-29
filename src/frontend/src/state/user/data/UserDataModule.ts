import store from '@/store'
import api from '@/api/api.service'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserProfileModel from '@/state/user/data/UserProfileModel'

const toast = useToast()

@Module({ namespaced: true })
export default class UserDataModule extends AppBaseModule {
	user_id!: number | undefined
	user_email!: string | undefined
	data = new UserProfileModel()

	get getUserId(): number | undefined {
		return this.user_id
	}

	get getUserEmail(): string | undefined {
		return this.user_email
	}

	get getUserData(): UserProfileModel {
		return this.data
	}

	@Mutation
	setUserData(data: UserProfileModel): void {
		this.data = data
	}

	@Mutation
	setUserId(user_id: number) {
		this.user_id = user_id
	}

	@Mutation
	setUserEmail(user_email: string) {
		this.user_email = user_email
	}

	@Mutation
	unsetUserData(): void {
		this.data = new UserProfileModel()
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
	fetchUserDataFromRemote(): Promise<void> {
		return api.get('userprofile/data')
			.then((response: any) => {
				const data = response.data
				this.context.commit('setUserData', data[0])
				this.context.commit('setUserId', data[0].id)
				this.context.commit('setUserEmail', data[0].email)
				store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
				store.dispatch('product/favourite/fetchUserFavouritesFromRemote', response.data[0].user)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateUserDetails(data: any): Promise<void> {
		const user_id = await this.context.getters['getUserId']

		try {
			const response = await api.patch(`userprofile/${ user_id }/`, data)
				.then((response: any) => this.context.commit('setUserData', response.data))
				.catch((e: Error) => {
					console.log(e)
				})
			toast.success('Profile Updated')
			return response
		} catch (error) {
			throw error
		}
	}
}
