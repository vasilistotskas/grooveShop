import { Account } from '~/zod/user/account'

export interface AccountState {
	account: Account | null
	loading: boolean
	error: string | null
}

export const useAccountStore = defineStore({
	id: 'account',
	state: (): AccountState => ({
		account: null as Account | null,
		loading: false,
		error: null as string | null
	}),
	getters: {
		getAccount: (state) => {
			return state.account
		}
	},
	actions: {
		async fetchAccount() {
			const config = useRuntimeConfig()
			this.account = null
			this.loading = true
			try {
				this.account = await fetch(
					`${config.public.apiBaseUrl}/user/account/session`
				).then((response) => response.json())
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
