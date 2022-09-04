import store from '@/renderer/dynamicStore'
import api from '@/api/api.service'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserProfileModel from '@/state/user/data/UserProfileModel'

const toast = useToast()

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'user',
})
export default class UserModule extends AppBaseModule {
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
  }

  @Action
  fetchUserDataFromRemote(): Promise<AxiosResponse<Array<UserProfileModel>> | void> {
    return api
      .get('userprofile/data')
      .then(async (response: AxiosResponse<Array<UserProfileModel>>) => {
        const data = response.data
        this.context.commit('setUserData', data[0])
        this.context.commit('setUserId', data[0].id)
        this.context.commit('setUserEmail', data[0].email)
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
          string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]
        >
      | FormData
  ): Promise<void> {
    const user_id = await this.context.getters['getUserId']

    const response = await api
      .patch(`userprofile/${user_id}/`, data)
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
