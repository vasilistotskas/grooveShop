import { FetchError } from 'ofetch'
import { Account } from '~/zod/user/account'
import { CreateRequest, Favourite } from '~/zod/product/favourite'

export interface UserState {
	account: Account | null
	favourites: Favourite[] | null
	pending: boolean
	error: FetchError<any> | null
}

export const useUserStore = defineStore({
	id: 'account',
	state: (): UserState => ({
		account: null as Account | null,
		favourites: null as Favourite[] | null,
		pending: false,
		error: null as FetchError<any> | null
	}),
	getters: {
		getAccount: (state) => {
			return state.account
		},
		getFavourites: (state) => {
			return state.favourites
		},
		getIsProductInFavourites: (state) => (id: number) => {
			return state.favourites?.some((favourite) => favourite.product === id) || false
		},
		getUserToProductFavourite: (state) => (id: number) => {
			return state.favourites?.find((favourite) => favourite.product === id) || null
		}
	},
	actions: {
		async fetchAccount() {
			const {
				data: account,
				error,
				pending
			} = await useFetch(`/api/user-account-session`, {
				method: 'get'
			})
			this.pending = pending.value
			this.error = error.value
			if (account.value) {
				this.account = account.value.account
				this.favourites = account.value.favourites
			}
		},
		async addFavourite(body: CreateRequest) {
			const {
				data: favourite,
				error,
				pending
			} = await useFetch(`/api/product-favourites`, {
				method: 'post',
				body
			})
			this.pending = pending.value
			this.error = error.value
			if (favourite.value) {
				this.favourites?.push(favourite.value)
			}
		},
		async removeFavourite(id: number) {
			const { error, pending } = await useFetch(`/api/product-favourites/${id}`, {
				method: 'delete'
			})
			this.pending = pending.value
			this.error = error.value
			if (!error.value) {
				this.favourites =
					this.favourites?.filter((favourite) => favourite.id !== id) || null
			}
		}
	}
})
