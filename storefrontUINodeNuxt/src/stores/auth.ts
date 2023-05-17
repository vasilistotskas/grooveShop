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
			const {
				data: auth,
				error,
				pending
			} = await useFetch(`/api/auth`, {
				method: 'get'
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (auth.value) {
				this.isAuthenticated = auth.value.isAuthenticated
			}
			this.pending = pending.value
		}
	}
})
