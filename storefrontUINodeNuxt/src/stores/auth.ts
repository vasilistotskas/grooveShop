import { FetchError } from 'ofetch'

export interface AuthState {
	isAuthenticated: boolean
	pending: boolean
	error: FetchError<unknown> | null
}
export const useAuthStore = defineStore({
	id: 'auth',
	state: (): AuthState => ({
		isAuthenticated: false,
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	actions: {
		async fetchAuth() {
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
