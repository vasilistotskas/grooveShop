import { FetchError } from 'ofetch'
import { Favourite, FavouriteQuery } from '~/zod/product/favourite'
import { Pagination } from '~/zod/pagination/pagination'

export interface FavouriteState {
	favourites: Pagination<Favourite>
	pending: boolean
	error: FetchError<unknown> | null
}

export const useFavouriteStore = defineStore({
	id: 'favourite',
	state: (): FavouriteState => ({
		favourites: {
			links: {
				next: null,
				prev: null
			},
			count: 0,
			totalPages: 0,
			pageSize: 0,
			page: 0,
			results: []
		},
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	actions: {
		async fetchFavourites({
			page,
			ordering,
			userId,
			expand
		}: FavouriteQuery): Promise<void> {
			const {
				data: favourites,
				error,
				pending
			} = await useFetch(`/api/product-favourites`, {
				method: 'get',
				params: {
					page,
					ordering,
					userId,
					expand
				}
			})
			this.pending = pending.value
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (favourites.value) {
				this.favourites = favourites.value
			}
		}
	}
})
