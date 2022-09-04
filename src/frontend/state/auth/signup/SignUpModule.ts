import router from '@/routes'
import store from '@/renderer/dynamicStore'
import api from '@/api/api.service'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import ToastRegisterActivationFail from '@/components/Toast/ToastRegisterActivationFail.vue'

const toast = useToast()

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'signup',
})
export default class SignUpModule extends AppBaseModule {
  registrationEmail?: string | undefined
  activationCompleted = false
  activationError = false
  activationLoading = false
  reActivationMailSent = true
  registrationCompleted = false
  registrationError = false
  registrationLoading = false

  get getRegistrationEmail(): string | undefined {
    return this.registrationEmail
  }

  get getActivationCompleted(): boolean {
    return this.activationCompleted
  }

  get getActivationError(): boolean {
    return this.activationError
  }

  get getReActivationMailSent(): boolean {
    return this.reActivationMailSent
  }

  get getActivationLoading(): boolean {
    return this.activationLoading
  }

  get getRegistrationCompleted(): boolean {
    return this.registrationCompleted
  }

  get getRegistrationError(): boolean {
    return this.registrationError
  }

  get getRegistrationLoading(): boolean {
    return this.registrationLoading
  }

  @Mutation
  setRegistrationEmail(email: string | undefined): void {
    this.registrationEmail = email
    if (email !== undefined) {
      localStorage.setItem('registrationEmail', email)
    }
  }

  @Mutation
  unsetRegistrationEmail(): void {
    this.registrationEmail = ''
    localStorage.removeItem('registrationEmail')
  }

  @Mutation
  activationBegin(): void {
    this.activationLoading = true
  }

  @Mutation
  activationClear(): void {
    this.activationCompleted = false
    this.activationError = false
    this.activationLoading = false
  }

  @Mutation
  activationFailure(): void {
    this.activationError = true
    this.activationLoading = false
  }

  @Mutation
  activationSuccess(): void {
    this.activationCompleted = true
    this.activationError = false
    this.activationLoading = false
    this.reActivationMailSent = false
  }

  @Mutation
  reActivationEmailSend(): void {
    this.reActivationMailSent = true
    this.activationError = false
    this.activationLoading = false
  }

  @Mutation
  registrationBegin(): void {
    this.registrationLoading = true
  }

  @Mutation
  registrationClear(): void {
    this.registrationCompleted = false
    this.registrationError = false
    this.registrationLoading = false
  }

  @Mutation
  registrationFailure(): void {
    this.registrationError = true
    this.registrationLoading = false
  }

  @Mutation
  registrationSuccess(): void {
    this.registrationCompleted = true
    this.registrationError = false
    this.registrationLoading = false
  }

  @Action
  async createAccount(formData: FormData): Promise<void> {
    await this.context.commit('registrationBegin')
    return api
      .post('djoser/users/', formData)
      .then(() => {
        this.context.commit('registrationSuccess')
        toast.success('Success, an activation link has been sent to your email!')
      })
      .catch(() => {
        this.context.commit('registrationFailure')
        toast.error('This name is already taken')
      })
  }

  @Action
  async activateAccount(): Promise<void> {
    const uid = router.currentRoute.value.params.uid
    const activationToken = router.currentRoute.value.params.token

    await this.context.commit('activationBegin')

    return api
      .get(`accounts/activate/${uid}/${activationToken}`)
      .then(() => {
        this.context.commit('activationSuccess')
        toast.success('Your account has been activated! You can now Log in.')
      })
      .catch(() => {
        this.context.commit('activationFailure')
        toast.error(ToastRegisterActivationFail)
      })
  }

  @Action
  async activationEmailResend(email: string): Promise<void> {
    const data = {
      email,
    }

    await this.context.commit('activationBegin')
    return api
      .post('accounts/resend_activation_mail/', data)
      .then(() => {
        this.context.commit('reActivationEmailSend')
        toast.success('A new activation link has been sent to your email.')
      })
      .catch(() => {
        this.context.commit('activationFailure')
        toast.error(ToastRegisterActivationFail)
      })
  }

  @Action
  async clearRegistrationStatus(): Promise<void> {
    return this.context.commit('registrationClear')
  }

  @Action
  async clearActivationStatus(): Promise<void> {
    return this.context.commit('activationClear')
  }
}
