import { FetchError } from 'ofetch'
import { Pagination } from '~/zod/pagination/pagination'
import {
	Review,
	ReviewCreateRequest,
	ReviewPutRequest,
	ReviewQuery
} from '~/zod/product/review'

interface ErrorRecord {
	reviews: FetchError | null
}

interface PendingRecord {
	reviews: boolean
}

const errorsFactory = (): ErrorRecord => ({
	reviews: null
})

const pendingFactory = (): PendingRecord => ({
	reviews: false
})

export interface ReviewsState {
	reviews: Pagination<Review> | null
	pending: PendingRecord
	error: ErrorRecord
}

export const useReviewsStore = defineStore({
	id: 'product-reviews',
	state: (): ReviewsState => ({
		reviews: {
			links: {
				next: null,
				prev: null
			},
			count: 0,
			totalPages: 0,
			pageTotalResults: 0,
			pageSize: 0,
			page: 0,
			results: []
		},
		pending: pendingFactory(),
		error: errorsFactory()
	}),
	getters: {
		getReviewById:
			(state) =>
			(id: number): Review | null => {
				return state.reviews?.results?.find((review) => review.id === id) ?? null
			}
	},
	actions: {
		async fetchReviews({ productId, userId, page, ordering, expand }: ReviewQuery) {
			try {
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
				this.reviews = reviews.value
				this.error.reviews = error.value
				this.pending.reviews = pending.value
			} catch (error) {
				this.error.reviews = error as FetchError
			}
		},
		async fetchUserToProductReview({ productId, userId, expand }: ReviewQuery) {
			try {
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
				if (review.value?.results) {
					return review.value.results[0]
				}
				this.error.reviews = error.value
				this.pending.reviews = pending.value
			} catch (error) {
				this.error.reviews = error as FetchError
			}
		},
		async addReview(body: ReviewCreateRequest) {
			try {
				const {
					data: review,
					error,
					pending
				} = await useFetch(`/api/product-reviews`, {
					method: 'post',
					body
				})
				// If current page results are less than pageSize then add review to results
				if (
					review.value &&
					this.reviews?.results &&
					this.reviews.results?.length < this.reviews.pageSize
				) {
					this.reviews.results.push(review.value)
				}
				this.error.reviews = error.value
				this.pending.reviews = pending.value
			} catch (error) {
				this.error.reviews = error as FetchError
			}
		},
		async deleteReview(id: number) {
			try {
				const { error, pending } = await useFetch(`/api/product-reviews/${id}`, {
					method: 'delete'
				})
				const index = this.reviews?.results?.findIndex((review) => review.id === id)
				// If current review in results listing delete it
				if (index && index !== -1) {
					this.reviews?.results?.splice(index, 1)
				}
				this.error.reviews = error.value
				this.pending.reviews = pending.value
			} catch (error) {
				this.error.reviews = error as FetchError
			}
		},
		async updateReview(id: number, body: ReviewPutRequest) {
			try {
				const {
					data: review,
					error,
					pending
				} = await useFetch(`/api/product-reviews/${id}`, {
					method: 'put',
					body: JSON.stringify(body)
				})
				console.log('review.value', review.value)
				console.log('this.reviews?.results', this.reviews?.results)
				if (review.value && this.reviews?.results) {
					const index = this.reviews?.results?.findIndex((review) => review.id === id)
					// If current review in results listing update it
					if (index !== -1) {
						console.log('this.reviews.results[index]', this.reviews.results[index])
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
							product: this.reviews?.results[index].product,
							user: this.reviews?.results[index].user
						}
					}
				}
				this.error.reviews = error.value
				this.pending.reviews = pending.value
			} catch (error) {
				this.error.reviews = error as FetchError
			}
		}
	}
})
