import api from "@/api/api.service"
import { useToast } from 'vue-toastification'
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import { Action, Module, Mutation } from 'vuex-module-decorators'

const toast = useToast()
import {
    BaseAuthenticationTypes
} from '@/api/auth_types'
import router from "@/routes";


@Module({ namespaced: true })
export default class SignUpModule
    extends AppBaseModule
{
    activationCompleted = false
    activationError = false
    activationLoading = false
    registrationCompleted = false
    registrationError = false
    registrationLoading = false

    get getActivationCompleted (): boolean {
        return this.activationCompleted
    }

    get getActivationError (): boolean {
        return this.activationError
    }
    get getActivationLoading (): boolean {
        return this.activationLoading
    }
    get getRegistrationCompleted (): boolean {
        return this.registrationCompleted
    }
    get getRegistrationError (): boolean {
        return this.registrationError
    }
    get getRegistrationLoading (): boolean {
        return this.registrationLoading
    }

    @Mutation
    [BaseAuthenticationTypes.ACTIVATION_BEGIN]() {
        this.activationLoading = true
    }

    @Mutation
    [BaseAuthenticationTypes.ACTIVATION_CLEAR]() {
        this.activationCompleted = false
        this.activationError = false
        this.activationLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.ACTIVATION_FAILURE]() {
        this.activationError = true
        this.activationLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.ACTIVATION_SUCCESS]() {
        this.activationCompleted = true
        this.activationError = false
        this.activationLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.REGISTRATION_BEGIN]() {
        this.registrationLoading = true
    }

    @Mutation
    [BaseAuthenticationTypes.REGISTRATION_CLEAR]() {
        this.registrationCompleted = false
        this.registrationError = false
        this.registrationLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.REGISTRATION_FAILURE]() {
        this.registrationError = true
        this.registrationLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.REGISTRATION_SUCCESS]() {
        this.registrationCompleted = true
        this.registrationError = false
        this.registrationLoading = false
    }

    @Action
    async createAccount(formData: any): Promise<void> {
        this.context.commit(BaseAuthenticationTypes.REGISTRATION_BEGIN)
        await api.post('djoser/users/', formData)
            .then((response: ResponseData) => {
                this.context.commit(BaseAuthenticationTypes.REGISTRATION_SUCCESS)
                toast.success('Success, you can log in!')
            })
            .catch((error: Error) => {
                this.context.commit(BaseAuthenticationTypes.REGISTRATION_FAILURE)
                toast.error('This name is already taken')
            })
    }

    @Action
    async activateAccount(): Promise<void> {
        const uid = router.currentRoute.value.params.uid
        const activationToken = router.currentRoute.value.params.token

        this.context.commit(BaseAuthenticationTypes.ACTIVATION_BEGIN)

        await api.get(`accounts/activate/${uid}/${activationToken}`)
            .then((response: ResponseData) => {
                this.context.commit(BaseAuthenticationTypes.ACTIVATION_SUCCESS)
                toast.success('Your account has been activated! Log in Here.')
            })
            .catch((error: Error) => {
                this.context.commit(BaseAuthenticationTypes.ACTIVATION_FAILURE)
                toast.success('Activation failed , resend activation link Here.')
            })
    }

    clearRegistrationStatus() {
        this.context.commit(BaseAuthenticationTypes.REGISTRATION_CLEAR)
    }

    clearActivationStatus() {
        this.context.commit(BaseAuthenticationTypes.ACTIVATION_CLEAR)
    }

}