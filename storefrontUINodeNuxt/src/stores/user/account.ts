import { Account } from '~/zod/user/account'

export interface AccountState {
	account: Account | null
	pending: boolean
	error: string | undefined
}

export const useAccountStore = defineStore({
	id: 'account',
	state: (): AccountState => ({
		account: null as Account | null,
		pending: false,
		error: undefined as string | undefined
	}),
	getters: {
		getAccount: (state) => {
			return state.account
		}
	},
	actions: {
		async fetchAccount() {
			const {
				data: account,
				error,
				pending
			} = await useFetch(`/api/user_account_session`, {
				method: 'get'
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (account.value) {
				this.account = account.value
			}
		}
	}
})
