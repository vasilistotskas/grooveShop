export type ProductEvents = {
	fetchProductFromRemote: void
} & ProductReviewEvents

export type ProductReviewEvents = {
	setProductReviewsAverage: number
	setProductReviewsCounter: number
	unsetUserToProductReview: void
	unsetProductReviews: void
	toggleReview: FormData
	fetchUserToProductReviewFromRemote: void
	deleteCurrentProductReview: {
		userId: number
		productId: number
	}
}
