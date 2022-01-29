import router from '@/routes'
import api from '@/api/api.service'
import { useToast } from 'vue-toastification'

import AppBaseModule from '@/state/common/AppBaseModule'
import { BaseAuthenticationTypes } from '@/api/auth_types'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import ToastRegisterActivationFail from '@/components/Toast/ToastRegisterActivationFail.vue'

const toast = useToast()

@Module({ namespaced: true })
export default class SignUpModule
	extends AppBaseModule {
	registrationEmail = ''
	activationCompleted = false
	activationError = false
	activationLoading = false
	reActivationMailSent = true
	registrationCompleted = false
	registrationError = false
	registrationLoading = false

	get getRegistrationEmail(): string {
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
	setRegistrationEmail(email: any): void {
		this.registrationEmail = email
		localStorage.setItem('registrationEmail', email)
	}

	@Mutation
	unsetRegistrationEmail(): void {
		this.registrationEmail = ''
		localStorage.removeItem('registrationEmail')
	}

	@Mutation
	[BaseAuthenticationTypes.ACTIVATION_BEGIN](): void {
		this.activationLoading = true
	}

	@Mutation
	[BaseAuthenticationTypes.ACTIVATION_CLEAR](): void {
		this.activationCompleted = false
		this.activationError = false
		this.activationLoading = false
	}

	@Mutation
	[BaseAuthenticationTypes.ACTIVATION_FAILURE](): void {
		this.activationError = true
		this.activationLoading = false
	}

	@Mutation
	[BaseAuthenticationTypes.ACTIVATION_SUCCESS](): void {
		this.activationCompleted = true
		this.activationError = false
		this.activationLoading = false
		this.reActivationMailSent = false
	}

	@Mutation
	[BaseAuthenticationTypes.RE_ACTIVATION_MAIL_SENT](): void {
		this.reActivationMailSent = true
		this.activationError = false
		this.activationLoading = false
	}

	@Mutation
	[BaseAuthenticationTypes.REGISTRATION_BEGIN](): void {
		this.registrationLoading = true
	}

	@Mutation
	[BaseAuthenticationTypes.REGISTRATION_CLEAR](): void {
		this.registrationCompleted = false
		this.registrationError = false
		this.registrationLoading = false
	}

	@Mutation
	[BaseAuthenticationTypes.REGISTRATION_FAILURE](): void {
		this.registrationError = true
		this.registrationLoading = false
	}

	@Mutation
	[BaseAuthenticationTypes.REGISTRATION_SUCCESS](): void {
		this.registrationCompleted = true
		this.registrationError = false
		this.registrationLoading = false
	}

	@Action
	async createAccount(formData: any): Promise<void> {
		this.context.commit(BaseAuthenticationTypes.REGISTRATION_BEGIN)
		await api.post('djoser/users/', formData)
			.then(() => {
				this.context.commit(BaseAuthenticationTypes.REGISTRATION_SUCCESS)
				toast.success('Success, an activation link has been sent to your email!')
			})
			.catch(() => {
				this.context.commit(BaseAuthenticationTypes.REGISTRATION_FAILURE)
				toast.error('This name is already taken')
			})
	}

	@Action
	async activateAccount(): Promise<void> {
		const uid = router.currentRoute.value.params.uid
		const activationToken = router.currentRoute.value.params.token

		this.context.commit(BaseAuthenticationTypes.ACTIVATION_BEGIN)

		await api.get(`accounts/activate/${ uid }/${ activationToken }`)
			.then(() => {
				this.context.commit(BaseAuthenticationTypes.ACTIVATION_SUCCESS)
				toast.success('Your account has been activated! You can now Log in.')
			})
			.catch(() => {
				this.context.commit(BaseAuthenticationTypes.ACTIVATION_FAILURE)
				toast.error(ToastRegisterActivationFail)
			})
	}

	@Action
	async activationEmailResend(email: any): Promise<void> {
		const data = {
			email
		}
		this.context.commit(BaseAuthenticationTypes.ACTIVATION_BEGIN)
		await api.post('accounts/resend_activation_mail/', data)
			.then(() => {
				this.context.commit(BaseAuthenticationTypes.RE_ACTIVATION_MAIL_SENT)
				toast.success('A new activation link has been sent to your email.')
			})
			.catch(() => {
				this.context.commit(BaseAuthenticationTypes.ACTIVATION_FAILURE)
				toast.error(ToastRegisterActivationFail)
			})
	}

	@Action
	async clearRegistrationStatus(): Promise<void> {
		this.context.commit(BaseAuthenticationTypes.REGISTRATION_CLEAR)
	}

	@Action
	async clearActivationStatus(): Promise<void> {
		this.context.commit(BaseAuthenticationTypes.ACTIVATION_CLEAR)
	}

}
