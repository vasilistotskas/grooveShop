export interface AuthState {
	isAuthenticated: boolean
	error: string | null
}
export const useAuthStore = defineStore({
	id: 'auth',
	state: (): AuthState => ({
		isAuthenticated: false,
		error: null as string | null
	}),
	getters: {
		getIsAuthenticated: (state) => {
			return state.isAuthenticated
		}
	},
	actions: {
		async initAuth() {
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
			}
		}
	}
})
