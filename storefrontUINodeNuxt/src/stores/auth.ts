import { FetchError } from 'ofetch/dist/node'

export interface AuthState {
	isAuthenticated: boolean
	pending: boolean
	error: FetchError<any> | null
}
export const useAuthStore = defineStore({
	id: 'auth',
	state: (): AuthState => ({
		isAuthenticated: false,
		pending: false,
		error: null as FetchError<any> | null
	}),
	getters: {
		getIsAuthenticated: (state) => {
			return state.isAuthenticated
		}
	},
	actions: {
		async initAuth() {
			this.pending = true
			const {
				data: auth,
				error,
				pending
			} = await useFetch(`/api/auth`, {
				method: 'get'
			})
			this.pending = pending.value
			this.error = error.value
			if (auth.value) {
				this.isAuthenticated = auth.value.isAuthenticated
			}
		}
	}
})
