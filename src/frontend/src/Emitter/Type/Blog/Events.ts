export type BlogPostEvents = {
	updateCommentToPost: string
	createCommentToPost: {
		content: string
	}
	fetchCommentByUserToPost
	deleteCommentFromPost
}
