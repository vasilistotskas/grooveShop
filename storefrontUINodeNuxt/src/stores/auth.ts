export interface AuthState {
	isAuthenticated: boolean
	pending: boolean
	error: string | undefined
}
export const useAuthStore = defineStore({
	id: 'auth',
	state: (): AuthState => ({
		isAuthenticated: false,
		pending: false,
		error: undefined as string | undefined
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
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (auth.value) {
				this.isAuthenticated = auth.value.isAuthenticated
			}
		}
	}
})
