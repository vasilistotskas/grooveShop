import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserProfileModel from '@/State/User/Profile/UserProfileModel'
import UserProfileApiData from '@/State/User/Interface/UserProfileApiData'

const toast = useToast()

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'user'
})
export default class UserModule extends AppBaseModule {
	userProfile!: UserProfileModel

	get getUserProfile(): UserProfileModel {
		return this.userProfile
	}

	@Mutation
	setUserProfile(userProfile: UserProfileModel): void {
		this.userProfile = userProfile
	}

	@Mutation
	unsetUserProfile(): void {
		this.userProfile = new UserProfileModel()
	}

	@Action
	async fetchUserProfileFromRemote(): Promise<AxiosResponse<
		Array<UserProfileModel>
	> | void> {
		return await api
			.get('user/profile')
			.then(async (response: AxiosResponse<Array<UserProfileModel>>) => {
				const userProfile = response.data
				this.context.commit('setUserProfile', userProfile[0])
				return response
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateUserProfile(data: FormData | UserProfileApiData): Promise<void> {
		const userId = await this.context.getters['getUserProfile'].id

		const response = await api
			.patch(`user/profile/${userId}/`, data)
			.then((response: AxiosResponse<UserProfileModel>) => {
				this.context.commit('setUserProfile', response.data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
		toast.success('Profile Updated')
		return response
	}
}
