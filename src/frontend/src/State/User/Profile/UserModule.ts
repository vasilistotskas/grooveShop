import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserProfileModel from '@/State/User/Profile/UserProfileModel'

const toast = useToast()

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'user'
})
export default class UserModule extends AppBaseModule {
	data!: UserProfileModel

	get getUserData(): UserProfileModel {
		return this.data
	}

	@Mutation
	setUserData(data: UserProfileModel): void {
		this.data = data
	}

	@Mutation
	unsetUserData(): void {
		this.data = new UserProfileModel()
	}

	@Action
	async fetchUserDataFromRemote(): Promise<AxiosResponse<
		Array<UserProfileModel>
	> | void> {
		return await api
			.get('userprofile/data')
			.then(async (response: AxiosResponse<Array<UserProfileModel>>) => {
				const data = response.data
				this.context.commit('setUserData', data[0])
				return response
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateUserProfile(
		data:
			| Record<
					string,
					| string
					| number
					| boolean
					| readonly string[]
					| readonly number[]
					| readonly boolean[]
			  >
			| FormData
	): Promise<void> {
		const userId = await this.context.getters['getUserData'].id

		const response = await api
			.patch(`userprofile/${userId}/`, data)
			.then((response: AxiosResponse<UserProfileModel>) => {
				this.context.commit('setUserData', response.data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
		toast.success('Profile Updated')
		return response
	}
}
