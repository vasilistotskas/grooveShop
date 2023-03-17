export interface AuthState {
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}
export const useAuthStore = defineStore({
	id: 'auth',
	state: (): AuthState => ({
		isAuthenticated: false,
		loading: false,
		error: null as string | null
	}),
	getters: {
		getIsAuthenticated: (state) => {
			return state.isAuthenticated
		}
	},
	actions: {
		async initAuth() {
			this.loading = true
			try {
				const { data: auth } = await useFetch(`/api/auth`, {
					method: 'get'
				})
				if (auth.value) {
					this.isAuthenticated = auth.value.isAuthenticated
				}
			} catch (error) {
				if (error instanceof TypeError) {
					this.error = error.message
				}
				if (error instanceof Error) {
					this.error = error.message
				}
			} finally {
				this.loading = false
			}
		}
	}
})
