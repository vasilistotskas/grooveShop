import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserAccountModel from '@/State/User/Account/UserAccountModel'
import UserAccountApiData from '@/State/User/Interface/UserAccountApiData'

const toast = useToast()

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'user'
})
export default class UserModule extends AppBaseModule {
	userAccount!: UserAccountModel

	get getUserAccount(): UserAccountModel {
		return this.userAccount
	}

	@Mutation
	setUserAccount(userAccount: UserAccountModel): void {
		this.userAccount = userAccount
	}

	@Mutation
	unsetUserAccount(): void {
		this.userAccount = new UserAccountModel()
	}

	@Action
	async fetchUserAccountFromRemote(): Promise<AxiosResponse<UserAccountModel> | void> {
		return await api
			.get('user/account/session/')
			.then(async (response: AxiosResponse<UserAccountModel>) => {
				const userAccount = response.data
				this.context.commit('setUserAccount', userAccount)
				return response
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateUserAccount(data: FormData | UserAccountApiData): Promise<void> {
		const userId = await this.context.getters['getUserAccount'].id

		const response = await api
			.patch(`user/account/${userId}/`, data)
			.then((response: AxiosResponse<UserAccountModel>) => {
				this.context.commit('setUserAccount', response.data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
		toast.success('Profile Updated')
		return response
	}
}
