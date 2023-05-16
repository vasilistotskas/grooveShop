import { FetchError } from 'ofetch'
import { Account, AccountPutRequest, ZodAccount } from '~/zod/user/account'
import { Favourite, FavouriteCreateRequest } from '~/zod/product/favourite'
import { Review, ReviewCreateRequest, ReviewPutRequest } from '~/zod/product/review'
import { Order } from '~/zod/order/order'
import { parseDataAs } from '~/zod/parser'
import { Address } from '~/zod/user/address'

export interface UserState {
	account: Account | null
	favourites: Favourite[] | null
	reviews: Review[] | null
	orders: Order[] | null
	addresses: Address[] | null
	pending: boolean
	error: FetchError<unknown> | null
}

export const useUserStore = defineStore({
	id: 'user',
	state: (): UserState => ({
		account: null as Account | null,
		favourites: null as Favourite[] | null,
		reviews: null as Review[] | null,
		orders: null as Order[] | null,
		addresses: null as Address[] | null,
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	getters: {
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
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (account.value) {
				this.account = account.value.account
				this.favourites = account.value.favourites
				this.reviews = account.value.reviews
				this.orders = account.value.orders
				this.addresses = account.value.addresses
			}
			this.pending = pending.value
		},
		async updateAccount(id: number, body: AccountPutRequest) {
			const {
				data: account,
				error,
				pending
			} = await useFetch(`/api/user-account/${id}`, {
				method: 'put',
				body
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (account.value) {
				this.account = account.value
			}
			this.pending = pending.value
		},
		async updateAccountImage(id: number, body: FormData) {
			const config = useRuntimeConfig()
			const csrfToken = useCookie('csrftoken')
			const sessionID = useCookie('sessionid')
			const { data, pending, error } = await useFetch(
				`${config.public.apiBaseUrl}/user/account/${id}/`,
				{
					headers: {
						Cookie: `csrftoken=${csrfToken.value}; sessionid=${sessionID.value}`,
						'X-CSRFToken': csrfToken.value || ''
					},
					method: 'PATCH',
					body
				}
			)
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			const account = await parseDataAs(data.value, ZodAccount).catch((error) => {
				this.error = error?.data
				return null
			})
			if (account) {
				this.account = account
			}
			this.pending = pending.value
		},
		async addFavourite(body: FavouriteCreateRequest) {
			const {
				data: favourite,
				error,
				pending
			} = await useFetch(`/api/product-favourites`, {
				method: 'post',
				body
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (favourite.value) {
				this.favourites?.push(favourite.value)
			}
			this.pending = pending.value
		},
		async removeFavourite(id: number) {
			const { error, pending } = await useFetch(`/api/product-favourites/${id}`, {
				method: 'delete'
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			this.favourites =
				this.favourites?.filter((favourite) => favourite.id !== id) || null
			this.pending = pending.value
		},
		async addReview(body: ReviewCreateRequest) {
			const {
				data: review,
				error,
				pending
			} = await useFetch(`/api/product-reviews`, {
				method: 'post',
				body
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (review.value) {
				this.reviews?.push(review.value)
			}
			this.pending = pending.value
		},
		async updateReview(id: number, body: ReviewPutRequest) {
			const {
				data: review,
				error,
				pending
			} = await useFetch(`/api/product-reviews/${id}`, {
				method: 'put',
				body
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (review.value) {
				this.reviews =
					this.reviews?.map((review) => {
						if (review.id === id) {
							return review
						}
						return review
					}) || null
			}
			this.pending = pending.value
		},
		async removeReview(id: number) {
			const { error, pending } = await useFetch(`/api/product-reviews/${id}`, {
				method: 'delete'
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			this.reviews = this.reviews?.filter((review) => review.id !== id) || null
			this.pending = pending.value
		}
	}
})
