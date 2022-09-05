import router from '@/routes'
import store from '@/dynamicStore'
import api from '@/api/api.service'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import ResetPasswordApiData from '@/state/auth/Interface/ResetPasswordApiData'
import UpdatePasswordApiData from '@/state/auth/Interface/UpdatePasswordApiData'

const toast = useToast()

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'password',
})
export default class PasswordModule extends AppBaseModule {
  emailCompleted = false
  emailError = false
  emailLoading = false
  resetCompleted = false
  resetError = false
  resetLoading = false
  changeCompleted = false
  changeError = false
  changeLoading = false

  get getEmailCompleted(): boolean {
    return this.emailCompleted
  }

  get getEmailError(): boolean {
    return this.emailError
  }

  get getEmailLoading(): boolean {
    return this.emailLoading
  }

  get getResetCompleted(): boolean {
    return this.resetCompleted
  }

  get getResetError(): boolean {
    return this.resetError
  }

  get getResetLoading(): boolean {
    return this.resetLoading
  }

  get getChangeCompleted(): boolean {
    return this.changeCompleted
  }

  get getChangeError(): boolean {
    return this.changeError
  }

  get getChangeLoading(): boolean {
    return this.changeLoading
  }

  @Mutation
  passwordResetBegin(): void {
    this.resetLoading = true
  }

  @Mutation
  passwordResetClear(): void {
    this.resetCompleted = false
    this.resetError = false
    this.resetLoading = false
  }

  @Mutation
  passwordResetFailure(): void {
    this.resetError = true
    this.resetLoading = false
  }

  @Mutation
  passwordResetSuccess(): void {
    this.resetCompleted = true
    this.resetError = false
    this.resetLoading = false
  }

  @Mutation
  passwordChangeFailure(): void {
    this.changeError = true
    this.changeLoading = false
  }

  @Mutation
  passwordChangeSuccess(): void {
    this.changeCompleted = true
    this.changeError = false
    this.changeLoading = false
  }

  @Mutation
  passwordEmailBegin(): void {
    this.emailLoading = true
  }

  @Mutation
  passwordEmailClear(): void {
    this.emailCompleted = false
    this.emailError = false
    this.emailLoading = false
  }

  @Mutation
  passwordEmailFailure(): void {
    this.emailError = true
    this.emailLoading = false
  }

  @Mutation
  passwordEmailSuccess(): void {
    this.emailCompleted = true
    this.emailError = false
    this.emailLoading = false
  }

  @Action
  updateUserPassword(data: UpdatePasswordApiData): Promise<void> {
    return api
      .post('djoser/users/set_password/', data)
      .then(() => this.context.commit('passwordChangeSuccess'))
      .then(() => {
        router.push('/log-in').then(() => toast.success('Password Updated, login to continue'))
      })
      .catch((e: Error) => {
        this.context.commit('passwordChangeFailure')
        router
          .push('/user-account/password')
          .then(() => toast.error('Current Password is not correct'))
        console.log(e)
      })
  }

  @Action
  sendPasswordResetEmail(email: string): Promise<void> {
    return api
      .post('djoser/users/reset_password/', email)
      .then(() => this.context.commit('passwordEmailSuccess'))
      .catch(() => {
        this.context.commit('passwordEmailFailure')
      })
  }

  @Action
  resetPasswordConfirm(data: ResetPasswordApiData): Promise<void> {
    const reset_data = {
      uid: data.uid,
      token: data.token,
      new_password: data.password1,
    }
    return api
      .post('djoser/users/reset_password_confirm/', reset_data)
      .then(() => this.context.commit('passwordResetSuccess'))
      .catch(() => {
        this.context.commit('passwordResetFailure')
      })
  }

  @Action
  async clearResetStatus(): Promise<void> {
    return this.context.commit('passwordResetClear')
  }

  @Action
  async clearEmailStatus(): Promise<void> {
    return this.context.commit('passwordEmailClear')
  }
}
