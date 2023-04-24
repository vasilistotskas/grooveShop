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
	error: FetchError<unknown> | null
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
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	getters: {
		getReviewById: (state) => (id: number) => {
			return state.reviews.results?.find((review) => review.id === id)
		}
	},
	actions: {
		async fetchReviews({ productId, userId, page, ordering, expand }: ReviewQuery) {
			this.pending = true
			const {
				data: reviews,
				error,
				pending
			} = await useFetch(`/api/product-reviews`, {
				method: 'get',
				params: {
					productId,
					userId,
					page,
					ordering,
					expand
				}
			})
			this.error = error.value
			if (reviews.value) {
				this.reviews = reviews.value
			}
			this.pending = pending.value
		},
		async fetchUserToProductReview({ productId, userId, expand }: ReviewQuery) {
			this.pending = true
			const {
				data: review,
				error,
				pending
			} = await useFetch(`/api/product-reviews`, {
				method: 'get',
				params: {
					productId,
					userId,
					expand
				}
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (review.value) {
				return review.value.results[0]
			}
			this.pending = pending.value
		},
		async addReview(body: ReviewCreateRequest) {
			this.pending = true
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
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (review.value) {
				// If current page results are less than pageSize then add review to results
				if (this.reviews.results.length < this.reviews.pageSize) {
					this.reviews.results.push(review.value)
				}
			}
			this.pending = pending.value
		},
		async deleteReview(id: number) {
			this.pending = true
			const { error, pending } = await useFetch(`/api/product-reviews/${id}`, {
				method: 'delete'
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			const index = this.reviews.results.findIndex((review) => review.id === id)
			// If current review in results listing delete it
			if (index !== -1) {
				this.reviews.results.splice(index, 1)
			}
			this.pending = pending.value
		},
		async updateReview(id: number, body: ReviewPutRequest) {
			this.pending = true
			const {
				data: review,
				error,
				pending
			} = await useFetch(`/api/product-reviews/${id}`, {
				method: 'put',
				body: JSON.stringify(body)
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (review.value) {
				const index = this.reviews.results.findIndex((review) => review.id === id)
				// If current review in results listing update it
				if (index !== -1) {
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
			this.pending = pending.value
		}
	}
})
