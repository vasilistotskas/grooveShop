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
			this.account = null
			this.loading = true
			try {
				const { data: account } = await useFetch(`/api/user_account_session`, {
					method: 'get'
				})
				if (account.value) {
					this.account = account.value
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
