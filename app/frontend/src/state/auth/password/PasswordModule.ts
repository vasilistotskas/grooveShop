import api from "@/api/api.service"
import { useToast } from 'vue-toastification'
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import { BaseAuthenticationTypes } from '@/api/auth_types'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import router from "@/routes";

const toast = useToast()

@Module({ namespaced: true })
export default class PasswordModule
    extends AppBaseModule
{
    emailCompleted = false
    emailError = false
    emailLoading = false
    resetCompleted = false
    resetError = false
    resetLoading = false
    changeCompleted = false
    changeError = false
    changeLoading = false

    get getEmailCompleted (): boolean {
        return this.emailCompleted
    }

    get getEmailError (): boolean {
        return this.emailError
    }
    get getEmailLoading (): boolean {
        return this.emailLoading
    }
    get getResetCompleted (): boolean {
        return this.resetCompleted
    }
    get getResetError (): boolean {
        return this.resetError
    }
    get getResetLoading (): boolean {
        return this.resetLoading
    }
    get getChangeCompleted (): boolean {
        return this.changeCompleted
    }
    get getChangeError (): boolean {
        return this.changeError
    }
    get getChangeLoading (): boolean {
        return this.changeLoading
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_BEGIN](): void {
        this.resetLoading = true
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_CLEAR](): void {
        this.resetCompleted = false
        this.resetError = false
        this.resetLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_FAILURE](): void {
        this.resetError = true
        this.resetLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_SUCCESS](): void {
        this.resetCompleted = true
        this.resetError = false
        this.resetLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_CHANGE_FAILURE](): void {
        this.changeError = true
        this.changeLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_CHANGE_SUCCESS](): void {
        this.changeCompleted = true
        this.changeError = false
        this.changeLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_BEGIN](): void {
        this.emailLoading = true
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_CLEAR](): void {
        this.emailCompleted = false
        this.emailError = false
        this.emailLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_FAILURE](): void {
        this.emailError = true
        this.emailLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_SUCCESS](): void {
        this.emailCompleted = true
        this.emailError = false
        this.emailLoading = false
    }

    @Action
    async updateUserPassword(data: any): Promise<void> {
        await api.post('djoser/users/set_password/', data)
            .then((response: ResponseData) => this.context.commit(BaseAuthenticationTypes.PASSWORD_CHANGE_SUCCESS))
            .then(() => {
                toast.success("Password Updated, login to continue")
                router.push('/log-in')
            })
            .catch((e: Error) => {
                this.context.commit(BaseAuthenticationTypes.PASSWORD_CHANGE_FAILURE)
                toast.error("Current Password is not correct")
                router.push('/my-account/password')
                console.log(e)
            })
    }

    @Action
    async sendPasswordResetEmail(data: any): Promise<void> {
        await api.post('djoser/users/reset_password/', data)
            .then((response: ResponseData) => this.context.commit(BaseAuthenticationTypes.PASSWORD_EMAIL_SUCCESS))
            .catch((e: Error) => {
                this.context.commit(BaseAuthenticationTypes.PASSWORD_EMAIL_FAILURE)
            })
    }

    @Action
    async resetPasswordConfirm(data: any): Promise<void> {
        const reset_data = {
            uid: data.uid,
            token: data.token,
            new_password: data.password1
        }
        await api.post('djoser/users/reset_password_confirm/', reset_data)
            .then((response: ResponseData) => this.context.commit(BaseAuthenticationTypes.PASSWORD_RESET_SUCCESS))
            .catch((e: Error) => {
                this.context.commit(BaseAuthenticationTypes.PASSWORD_RESET_FAILURE)
            })
    }

    async clearResetStatus(): Promise<void> {
        this.context.commit(BaseAuthenticationTypes.PASSWORD_RESET_CLEAR)
    }

    async clearEmailStatus(): Promise<void> {
        this.context.commit(BaseAuthenticationTypes.PASSWORD_EMAIL_CLEAR)
    }

}
