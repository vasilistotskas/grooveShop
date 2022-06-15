import store from '@/store'
import router from '@/routes'
import api from '@/api/api.service'
import session from '@/api/session'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import { BaseAuthenticationTypes } from '@/state/auth/Enum/BaseAuthenticationTypes'

const toast = useToast()

@Module({ namespaced: true })
export default class AuthModule extends AppBaseModule {
  TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'
  isProduction = process.env.NODE_ENV === 'production'
  isSessionAuthenticated = false

  initialState = {
    authenticating: false,
    error: false,
    token: null,
  }

  get getInitialState(): Record<string, unknown> {
    return this.initialState
  }

  get isAuthenticated(): boolean {
    return this.isSessionAuthenticated
    // return this.initialState.token != null  <--- this for token auth
  }

  get authToken(): null | string {
    return this.initialState.token
  }

  @Mutation
  [BaseAuthenticationTypes.SET_SESSION_AUTH](payload: any): void {
    this.isSessionAuthenticated = payload
  }

  @Mutation
  [BaseAuthenticationTypes.LOGIN_BEGIN](): void {
    this.initialState.authenticating = true
    this.initialState.error = false
  }

  @Mutation
  [BaseAuthenticationTypes.LOGIN_FAILURE](): void {
    this.initialState.authenticating = false
    this.initialState.error = true
  }

  @Mutation
  [BaseAuthenticationTypes.LOGIN_SUCCESS](): void {
    this.initialState.authenticating = true
    this.initialState.error = false
  }

  @Mutation
  [BaseAuthenticationTypes.LOGOUT](): void {
    this.initialState.authenticating = false
    this.initialState.error = false
    this.isSessionAuthenticated = false
  }

  @Mutation
  [BaseAuthenticationTypes.SET_TOKEN](token: any): void {
    if (!this.isProduction) localStorage.setItem(this.TOKEN_STORAGE_KEY, token)
    session.defaults.headers.common['Authorization'] = 'Token ' + token
    this.initialState.token = token
  }

  @Mutation
  [BaseAuthenticationTypes.REMOVE_TOKEN](): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY)
    localStorage.removeItem('userid')
    session.defaults.headers.common['Authorization'] = ''
    delete session.defaults.headers.Authorization
    this.initialState.token = null
  }

  @Action
  async login(inputs: any): Promise<void> {
    await this.context.commit(BaseAuthenticationTypes.LOGIN_BEGIN)
    return api
      .post('login/', inputs)
      .then((response: any) => {
        const token: string = response.data.auth_token
        this.context.commit(BaseAuthenticationTypes.SET_TOKEN, token)
        router.push('/')
      })
      .then(() => {
        this.context.commit(BaseAuthenticationTypes.LOGIN_SUCCESS)
        toast.success('Success')
      })
      .catch(() => {
        this.context.commit(BaseAuthenticationTypes.LOGIN_FAILURE)
        toast.error('Please enter a valid username and password. Note that both fields may be case-sensitive.')
      })
  }

  @Action
  async logout(): Promise<void> {
    await this.context.commit(BaseAuthenticationTypes.LOGIN_BEGIN)
    return api
      .post('logout/', {})
      .then(() => {
        this.context.commit(BaseAuthenticationTypes.LOGOUT)
      })
      .then(() => {
        this.context.commit(BaseAuthenticationTypes.REMOVE_TOKEN)
        toast.success('Logged Out')
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  async initialize(): Promise<void> {
    const token = localStorage.getItem(this.TOKEN_STORAGE_KEY)

    const response = await api
      .get('session/')
      .then((response: any) => {
        this.context.commit(BaseAuthenticationTypes.SET_SESSION_AUTH, response.data.isAuthenticated)
      })
      .catch((e: Error) => {
        console.log(e)
      })

    // for token auth
    if (this.isProduction && token) {
      this.context.commit(BaseAuthenticationTypes.REMOVE_TOKEN)
    }
    if (!this.isProduction && token) {
      this.context.commit(BaseAuthenticationTypes.SET_TOKEN, token)
      this.context.commit(BaseAuthenticationTypes.LOGIN_SUCCESS, true)
    }
    return response
  }

  @Action
  clearAllAccountSessions(): Promise<void> {
    return api
      .post('session/clear_all/', {})
      .then(() => {
        this.context.commit(BaseAuthenticationTypes.LOGOUT)
        this.context.commit(BaseAuthenticationTypes.REMOVE_TOKEN)
        store.commit('product/favourite/unsetFavourites')
        store.commit('product/favourite/unsetUserFavourites')
        store.commit('product/review/unsetUserToProductReview')
        store.commit('product/review/unsetUserReviews')
        store.commit('country/unsetUserCountryData')
        toast.success('Logged Out')
      })
      .catch((e: Error) => {
        console.log(e)
      })
      .finally(() => router.push('/'))
  }
}
