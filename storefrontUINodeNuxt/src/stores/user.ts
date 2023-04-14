import { FetchError } from 'ofetch'
import { Account, AccountPutRequest, ZodAccount } from '~/zod/user/account'
import { Favourite, FavouriteCreateRequest } from '~/zod/product/favourite'
import { Review, ReviewCreateRequest, ReviewPutRequest } from '~/zod/product/review'
import { Order } from '~/zod/order/order'
import { parseDataAs } from '~/zod/parser'

export interface UserState {
	account: Account | null
	favourites: Favourite[] | null
	reviews: Review[] | null
	orders: Order[] | null
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
			this.pending = pending.value
			this.error = error.value
			if (account.value) {
				this.account = account.value.account
				this.favourites = account.value.favourites
				this.reviews = account.value.reviews
				this.orders = account.value.orders
			}
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
			this.pending = pending.value
			this.error = error.value
			if (account.value) {
				this.account = account.value
			}
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
			this.pending = pending.value
			this.error = error.value
			const account = await parseDataAs(data.value, ZodAccount).catch((error) => {
				this.error = error?.data
				return null
			})
			if (account) {
				this.account = account
			}
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
			this.pending = pending.value
			this.error = error.value
			if (review.value) {
				this.reviews?.push(review.value)
			}
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
			this.pending = pending.value
			this.error = error.value
			if (review.value) {
				this.reviews =
					this.reviews?.map((review) => {
						if (review.id === id) {
							return review
						}
						return review
					}) || null
			}
		},
		async removeReview(id: number) {
			const { error, pending } = await useFetch(`/api/product-reviews/${id}`, {
				method: 'delete'
			})
			this.pending = pending.value
			this.error = error.value
			if (!error.value) {
				this.reviews = this.reviews?.filter((review) => review.id !== id) || null
			}
		}
	}
})
