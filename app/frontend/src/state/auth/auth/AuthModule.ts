import session from '@/api/session'
import router from "@/routes"
import api from "@/api/api.service"
import { useToast } from 'vue-toastification'
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import { Action, Module, Mutation } from 'vuex-module-decorators'

import {
    BaseAuthenticationTypes
} from '@/api/auth_types'

const toast = useToast()

@Module({ namespaced: true })
export default class AuthModule
    extends AppBaseModule
{
    TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'
    isProduction = process.env.NODE_ENV === 'production'

    initialState = {
        authenticating: false,
        error: false,
        token: null
    }

    get getInitialState (): object {
        return this.initialState
    }

    get isAuthenticated (): boolean {
        return this.initialState.token != null
    }

    get authToken (): null | string {
        return this.initialState.token
    }

    @Mutation
    [BaseAuthenticationTypes.LOGIN_BEGIN]() {
        this.initialState.authenticating = true
        this.initialState.error = false
    }

    @Mutation
    [BaseAuthenticationTypes.LOGIN_FAILURE]() {
        this.initialState.authenticating = false
        this.initialState.error = true
    }

    @Mutation
    [BaseAuthenticationTypes.LOGIN_SUCCESS]() {
        this.initialState.authenticating = true
        this.initialState.error = false
    }

    @Mutation
    [BaseAuthenticationTypes.LOGOUT]() {
        this.initialState.authenticating = false
        this.initialState.error = false
    }

    @Mutation
    [BaseAuthenticationTypes.SET_TOKEN](token: any) {
        if (!this.isProduction) localStorage.setItem(this.TOKEN_STORAGE_KEY, token)
        session.defaults.headers.common["Authorization"] = "Token " + token
        this.initialState.token = token
    }

    @Mutation
    [BaseAuthenticationTypes.REMOVE_TOKEN]() {
        localStorage.removeItem(this.TOKEN_STORAGE_KEY)
        localStorage.removeItem("userid")
        session.defaults.headers.common["Authorization"] = ""
        delete session.defaults.headers.Authorization
        this.initialState.token = null
    }

    @Action
    async login(inputs:any): Promise<void> {
        await this.context.commit(BaseAuthenticationTypes.LOGIN_BEGIN)
        await api.post('login/', inputs)
            .then((response: ResponseData) => {
                const token: string = response.data.auth_token
                this.context.commit(BaseAuthenticationTypes.SET_TOKEN, token)
                router.push('/')
            })
            .then(() => this.context.commit(BaseAuthenticationTypes.LOGIN_SUCCESS))
            .catch((e: Error) => {
                this.context.commit(BaseAuthenticationTypes.LOGIN_FAILURE)
                toast.error('Please enter a valid username and password. Note that both fields may be case-sensitive.')
            })
    }

    @Action
    async logout(): Promise<void> {
        await this.context.commit(BaseAuthenticationTypes.LOGIN_BEGIN)
        await api.post('logout/', {})
            .then((response: ResponseData) => {
                this.context.commit(BaseAuthenticationTypes.LOGOUT)
            })
            .then(() =>this.context.commit(BaseAuthenticationTypes.REMOVE_TOKEN))
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async initialize(): Promise<void> {
        const token = localStorage.getItem(this.TOKEN_STORAGE_KEY)
        if (this.isProduction && token) {
            this.context.commit(BaseAuthenticationTypes.REMOVE_TOKEN)
        }
        if (!this.isProduction && token) {
            this.context.commit(BaseAuthenticationTypes.SET_TOKEN, token)
            this.context.commit(BaseAuthenticationTypes.LOGIN_SUCCESS, true)
        }
    }

}
