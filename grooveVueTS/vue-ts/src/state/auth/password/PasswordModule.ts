import { useToast } from 'vue-toastification'
import AppBaseModule from "@/state/common/AppBaseModule"
import { Module, Mutation } from 'vuex-module-decorators'

const toast = useToast()

import {
    BaseAuthenticationTypes
} from '@/api/auth_types'

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

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_BEGIN]() {
        this.resetLoading = true
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_CLEAR]() {
        this.resetCompleted = false
        this.resetError = false
        this.resetLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_FAILURE]() {
        this.resetError = true
        this.resetLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_RESET_SUCCESS]() {
        this.resetCompleted = true
        this.resetError = false
        this.resetLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_BEGIN]() {
        this.emailLoading = true
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_CLEAR]() {
        this.emailCompleted = false
        this.emailError = false
        this.emailLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_FAILURE]() {
        this.emailError = true
        this.emailLoading = false
    }

    @Mutation
    [BaseAuthenticationTypes.PASSWORD_EMAIL_SUCCESS]() {
        this.emailCompleted = true
        this.emailError = false
        this.emailLoading = false
    }

    // @Action
    // async resetPassword(uid:any, token:any, password1:any, password2:any ): Promise<void> {
    //     this.context.commit(PASSWORD_RESET_BEGIN)
    //     return auth.resetAccountPassword(uid, token, password1, password2)
    //         .then(() => this.context.commit(PASSWORD_RESET_SUCCESS))
    //         .catch(() => this.context.commit(PASSWORD_RESET_FAILURE))
    // }


    // async sendPasswordResetEmail(email: any): Promise<void> {
    //     this.context.commit(PASSWORD_EMAIL_BEGIN)
    //     return auth.sendAccountPasswordResetEmail(email)
    //         .then(() => this.context.commit(PASSWORD_EMAIL_SUCCESS))
    //         .catch(() => this.context.commit(PASSWORD_EMAIL_FAILURE))
    // }


    async clearResetStatus(): Promise<void> {
        this.context.commit(BaseAuthenticationTypes.PASSWORD_RESET_CLEAR)
    }

    async clearEmailStatus(): Promise<void> {
        this.context.commit(BaseAuthenticationTypes.PASSWORD_EMAIL_CLEAR)
    }

}
