import { FetchError } from 'ofetch'
import { Account } from '~/zod/user/account'

export interface AccountState {
	account: Account | null
	pending: boolean
	error: FetchError<any> | null
}

export const useAccountStore = defineStore({
	id: 'account',
	state: (): AccountState => ({
		account: null as Account | null,
		pending: false,
		error: null as FetchError<any> | null
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
			this.pending = pending.value
			this.error = error.value
			if (account.value) {
				this.account = account.value
			}
		}
	}
})
