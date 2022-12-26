import router from '@/Routes'
import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import session from '@/Api/Session'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AppBaseModule from '@/State/Common/AppBaseModule'
import LogInInputApi from '@/State/Auth/Interface/LogInInputApi'
import { Action, Module, Mutation } from 'vuex-module-decorators'

const toast = useToast()

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'auth'
})
export default class AuthModule extends AppBaseModule {
	TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'
	isProduction = process.env.NODE_ENV === 'production'
	isSessionAuthenticated = false
	initialState = {
		authenticating: false,
		error: false,
		token: ''
	}

	get getInitialState(): Record<string, unknown> {
		return this.initialState
	}

	get isAuthenticated(): boolean {
		return this.isSessionAuthenticated
		// return this.initialState.token != null  <--- this for token Auth
	}

	get authToken(): null | string {
		return this.initialState.token
	}

	@Mutation
	setSessionAuth(payload: boolean): void {
		this.isSessionAuthenticated = payload
	}

	@Mutation
	logInBegin(): void {
		this.initialState.authenticating = true
		this.initialState.error = false
	}

	@Mutation
	logInFailure(): void {
		this.initialState.authenticating = false
		this.initialState.error = true
	}

	@Mutation
	logInSuccess(): void {
		this.initialState.authenticating = true
		this.initialState.error = false
	}

	@Mutation
	afterLogOut(): void {
		this.initialState.authenticating = false
		this.initialState.error = false
		this.isSessionAuthenticated = false
	}

	@Mutation
	setToken(token: string): void {
		if (!this.isProduction) localStorage.setItem(this.TOKEN_STORAGE_KEY, token)
		session.defaults.headers.common['Authorization'] = 'Token ' + token
		this.initialState.token = token
	}

	@Mutation
	removeToken(): void {
		localStorage.removeItem(this.TOKEN_STORAGE_KEY)
		localStorage.removeItem('userid')
		session.defaults.headers.common['Authorization'] = ''
		delete session.defaults.headers.common['Authorization']
		this.initialState.token = ''
	}

	@Action
	async login(inputs: LogInInputApi): Promise<void> {
		await this.context.commit('logInBegin')
		return await api
			.post('login/', inputs)
			.then((response: AxiosResponse<Record<string, string>>) => {
				const token: string = response.data.auth_token
				this.context.commit('setToken', token)
				this.context.commit('setSessionAuth', true)
				router.push('/')
			})
			.then(() => {
				this.context.commit('logInSuccess')
				toast.success('Success')
			})
			.catch(() => {
				this.context.commit('logInFailure')
				toast.error(
					'Please enter a valid username and Password. Note that both fields may be case-sensitive.'
				)
			})
	}

	@Action
	async logout(): Promise<void> {
		await this.context.commit('logInBegin')
		return await api
			.post('logout/', {})
			.then(() => {
				this.context.commit('setSessionAuth', false)
				this.context.commit('afterLogOut')
			})
			.then(() => {
				this.context.commit('removeToken')
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
			.then((response: AxiosResponse<Record<string, boolean>>) => {
				this.context.commit('setSessionAuth', response.data.isAuthenticated)
			})
			.catch((e: Error) => {
				console.log(e)
			})

		// for token Auth
		if (this.isProduction && token) {
			this.context.commit('removeToken')
		}
		if (!this.isProduction && token) {
			this.context.commit('setToken', token)
			this.context.commit('logInSuccess', true)
		}
		return response
	}

	@Action
	async clearAllAccountSessions<T>(): Promise<T | void> {
		return await api
			.post('session/clear_all/', {})
			.then(() => {
				this.context.commit('afterLogOut')
				this.context.commit('removeToken')
				toast.success('Logged Out')
			})
			.catch((e: Error) => {
				console.log(e)
			})
			.finally(() => router.push('/'))
	}
}
