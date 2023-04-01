import { FetchError } from 'ofetch'
import { Pagination } from '~/zod/pagination/pagination'
import { Review, ReviewQuery } from '~/zod/product/review'

export interface ReviewsState {
	reviews: Pagination<Review>
	pending: boolean
	error: FetchError<any> | null
}

export const useReviewsStore = defineStore({
	id: 'productReviews',
	state: (): ReviewsState => ({
		reviews: {
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
		pending: false,
		error: null as FetchError<any> | null
	}),
	getters: {
		getReviewById: (state) => (id: number) => {
			return state.reviews.results?.find((review) => review.id === id)
		}
	},
	actions: {
		async fetchReviews({ product_id, user_id, page, ordering, expand }: ReviewQuery) {
			const {
				data: reviews,
				error,
				pending
			} = await useFetch(`/api/product-reviews`, {
				method: 'get',
				params: {
					product_id,
					user_id,
					page,
					ordering,
					expand
				}
			})
			this.pending = pending.value
			this.error = error.value

			if (reviews.value) {
				this.reviews = reviews.value
			}
		}
	}
})
