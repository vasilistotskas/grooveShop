import { FetchError } from 'ofetch'
import { Pagination } from '~/zod/pagination/pagination'
import {
	Review,
	ReviewCreateRequest,
	ReviewPutRequest,
	ReviewQuery
} from '~/zod/product/review'

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
		},
		async fetchUserToProductReview({ product_id, user_id, expand }: ReviewQuery) {
			const {
				data: review,
				error,
				pending
			} = await useFetch(`/api/product-reviews`, {
				method: 'get',
				params: {
					product_id,
					user_id,
					expand
				}
			})
			this.pending = pending.value
			this.error = error.value

			if (review.value) {
				return review.value.results[0]
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
				this.reviews.results.push(review.value)
			}
		},
		async deleteReview(id: number) {
			const { error, pending } = await useFetch(`/api/product-reviews/${id}`, {
				method: 'delete'
			})
			this.pending = pending.value
			this.error = error.value
			if (!error.value) {
				const index = this.reviews.results.findIndex((review) => review.id === id)
				this.reviews.results.splice(index, 1)
			}
		},
		async updateReview(id: number, body: ReviewPutRequest) {
			const {
				data: review,
				error,
				pending
			} = await useFetch(`/api/product-reviews/${id}`, {
				method: 'put',
				body: JSON.stringify(body)
			})
			this.pending = pending.value
			this.error = error.value
			if (review.value) {
				const index = this.reviews.results.findIndex((review) => review.id === id)
				this.reviews.results[index] = {
					comment: review.value.comment,
					createdAt: review.value.createdAt,
					id: review.value.id,
					isPublished: review.value.isPublished,
					publishedAt: review.value.publishedAt,
					rate: review.value.rate,
					status: review.value.status,
					updatedAt: review.value.updatedAt,
					uuid: review.value.uuid,
					product: this.reviews.results[index].product,
					user: this.reviews.results[index].user
				}
			}
		}
	}
})
