import router from '@/Routes'
import gql from 'graphql-tag'
import store from '@/DynamicStore'
import { isEmpty, some } from 'lodash'
import { ApolloQueryResult } from '@apollo/client'
import BlogTagModel from '@/State/Blog/BlogTagModel'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import { clientApollo } from '@/Apollo/ApolloProvider'
import AppBaseModule from '@/State/Common/AppBaseModule'
import BlogAuthorModel from '@/State/Blog/BlogAuthorModel'
import BlogCommentModel from '@/State/Blog/BlogCommentModel'
import BlogCategoryModel from '@/State/Blog/BlogCategoryModel'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserProfileModelGql from '@/State/User/Profile/UserProfileModelGql'

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'blog'
})
export default class BlogModule extends AppBaseModule {
	allPosts: Array<BlogPostModel> = []
	allTags: Array<BlogTagModel> = []
	allAuthors: Array<BlogAuthorModel> = []
	allCategories: Array<BlogCategoryModel> = []
	postsByTag: Array<BlogPostModel> = []
	postBySlug = new BlogPostModel()
	author = new BlogAuthorModel()
	commentsByUser: Array<BlogCommentModel> = []
	commentsByPost: Array<BlogCommentModel> = []
	commentByUserToPost = new BlogCommentModel()

	get getAllPosts(): Array<BlogPostModel> {
		return this.allPosts
	}

	get getAllTags(): Array<BlogTagModel> {
		return this.allTags
	}

	get getAllAuthors(): Array<BlogAuthorModel> {
		return this.allAuthors
	}

	get getAllCategories(): Array<BlogCategoryModel> {
		return this.allCategories
	}

	get getPostsByTag(): Array<BlogPostModel> {
		return this.postsByTag
	}

	get getPostBySlug(): BlogPostModel {
		return this.postBySlug
	}

	get getPublishedPosts(): Array<BlogPostModel> {
		return this.allPosts.filter((post) => post.isPublished)
	}

	get getAuthorById(): BlogAuthorModel {
		return this.author
	}

	get getCommentsByUser(): Array<BlogCommentModel> {
		return this.commentsByUser
	}

	get getCommentsByPost(): Array<BlogCommentModel> {
		return this.commentsByPost
	}

	get getCommentByUserToPost(): BlogCommentModel {
		return this.commentByUserToPost
	}

	get getUserCommentToPostEmpty(): boolean {
		const commentByUserToPost = this.context.getters['getCommentByUserToPost']
		return isEmpty(commentByUserToPost)
	}

	get getIsCurrentPostInUserFavourites(): (data: { userEmail: string }) => boolean {
		return (data: { userEmail: string }) => {
			const postLikes = this.context.getters['getPostBySlug'].likes
			return some(postLikes, { email: data.userEmail })
		}
	}

	@Mutation
	setAllPosts(data: Array<BlogPostModel>): void {
		this.allPosts = data
	}

	@Mutation
	setAllTags(data: Array<BlogTagModel>): void {
		this.allTags = data
	}

	@Mutation
	setAllAuthors(data: Array<BlogAuthorModel>): void {
		this.allAuthors = data
	}

	@Mutation
	setAllCategories(data: Array<BlogCategoryModel>): void {
		this.allCategories = data
	}

	@Mutation
	setPostsByTag(data: Array<BlogPostModel>): void {
		this.postsByTag = data
	}

	@Mutation
	setPostBySlug(data: BlogPostModel): void {
		this.postBySlug = data
	}

	@Mutation
	setAuthorById(data: BlogAuthorModel): void {
		this.author = data
	}

	@Mutation
	setCommentsByUser(data: Array<BlogCommentModel>): void {
		this.commentsByUser = data
	}

	@Mutation
	setCommentsByPost(data: Array<BlogCommentModel>): void {
		this.commentsByPost = data
	}

	@Mutation
	setCommentByUserToPost(data: BlogCommentModel): void {
		this.commentByUserToPost = data
	}

	@Mutation
	clearPostData(): void {
		this.postBySlug = new BlogPostModel()
		this.commentByUserToPost = new BlogCommentModel()
		this.commentsByPost = []
	}

	@Action
	async fetchAllPostsFromRemote(): Promise<Array<BlogPostModel> | undefined> {
		try {
			const posts = await clientApollo.query({
				query: gql`
					query {
						allPosts {
							id
							title
							subtitle
							publishedAt
							isPublished
							metaDescription
							mainImageAbsoluteUrl
							mainImageFilename
							numberOfLikes
							body
							slug
							category {
								id
							}
							likes {
								email
							}
							author {
								bio
								id
								website
								user {
									id
									email
									firstName
									lastName
								}
							}
							tags {
								name
							}
						}
					}
				`,
				fetchPolicy: 'no-cache'
			})

			const data = posts.data.allPosts
			this.context.commit('setAllPosts', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAllTagsFromRemote(): Promise<Array<BlogTagModel> | undefined> {
		try {
			const tags = await clientApollo.query({
				query: gql`
					query {
						allTags {
							name
						}
					}
				`
			})
			const data = tags.data.allTags
			this.context.commit('setAllTags', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAllAuthorsFromRemote(): Promise<Array<BlogAuthorModel> | undefined> {
		try {
			const authors = await clientApollo.query({
				query: gql`
					query {
						allAuthors {
							website
							bio
							user {
								id
								firstName
								lastName
								email
							}
						}
					}
				`
			})
			const data = authors.data.allAuthors
			this.context.commit('setAllAuthors', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAllCategoriesFromRemote(): Promise<Array<BlogCategoryModel> | undefined> {
		try {
			const categories = await clientApollo.query({
				query: gql`
					query {
						allCategories {
							name
							slug
							description
						}
					}
				`
			})
			const data = categories.data.allCategories
			this.context.commit('setAllCategories', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchPostsByTagFromRemote(): Promise<Array<BlogPostModel> | undefined> {
		try {
			const posts = await clientApollo.query({
				query: gql`
					query ($tag: String!) {
						postsByTag(tag: $tag) {
							id
							title
							subtitle
							publishedAt
							isPublished
							metaDescription
							mainImageAbsoluteUrl
							mainImageFilename
							numberOfLikes
							category {
								id
							}
							slug
							author {
								bio
								id
								website
								user {
									id
									email
									firstName
									lastName
								}
							}
							tags {
								name
							}
						}
					}
				`,
				variables: {
					tag: router.currentRoute.value.params.tag
				}
			})
			const data = posts.data.postsByTag
			this.context.commit('setPostsByTag', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchPostBySlugFromRemote(): Promise<BlogPostModel | undefined> {
		try {
			const post = await clientApollo.query({
				query: gql`
          query {
            postBySlug(slug: "${router.currentRoute.value.params.slug}") {
              id
              title
              subtitle
              publishedAt
              metaDescription
              mainImageAbsoluteUrl
              mainImageFilename
              numberOfLikes
              slug
              body
              likes {
                email
              }
              category {
                id
              }
              author {
                bio
                id
                website
                user {
                  id
                  email
                  firstName
                  lastName
                }
              }
              tags {
                name
              }
            }
          }
        `,
				fetchPolicy: 'no-cache'
			})
			const data = post.data.postBySlug
			this.context.commit('setPostBySlug', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAuthorByIdFromRemote(): Promise<BlogAuthorModel | undefined> {
		try {
			const author = await clientApollo.query({
				query: gql`
          query {
            authorById(pk: "${router.currentRoute.value.params.id}") {
              bio
              id
              user {
                email
                firstName
                id
                isActive
                lastName
              }
              website
            }
          }
        `
			})
			const data = author.data.authorById
			this.context.commit('setAuthorById', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchUserProfileByUserId(
		userId: number
	): Promise<UserProfileModelGql | undefined> {
		try {
			const userProfile = await clientApollo.query({
				query: gql`
					query ($userId: Int!) {
						userProfileByUserId(userId: $userId) {
							mainImageAbsoluteUrl
							mainImageFilename
						}
					}
				`,
				variables: {
					userId: userId
				}
			})
			return userProfile.data.userProfileByUserId
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchCommentsByUser(
		userEmail: string
	): Promise<Array<BlogCommentModel> | undefined> {
		try {
			const comments = await clientApollo.query({
				query: gql`
					query {
						commentsByUser(userEmail: "bill@bill.gr") {
							content
							createdAt
							id
							numberOfLikes
							isApproved
							post {
								body
								createdAt
								id
								isPublished
								likes {
									id
								}
								mainImageAbsoluteUrl
								mainImageFilename
								numberOfLikes
								publishedAt
								metaDescription
								slug
								subtitle
								title
								updatedAt
								tags {
									id
									name
								}
								author {
									id
									user {
										id
									}
								}
								category {
									id
								}
							}
							user {
								id
								email
							}
						}
					}
				`
			})
			const data = comments.data.commentsByUser
			this.context.commit('setCommentsByUser', data)
			return data
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchCommentsByPost(): Promise<Array<BlogCommentModel> | undefined> {
		try {
			const comments = await clientApollo.query({
				query: gql`
          query {
            commentsByPost(filters: {
              postId: ${Number(this.context.getters['getPostBySlug'].id)}
            }) {
              id
              content
              createdAt
              isApproved
              numberOfLikes
              post {
                id
                title
                subtitle
                publishedAt
                isPublished
                metaDescription
                mainImageAbsoluteUrl
                mainImageFilename
                slug
                numberOfLikes
                category {
                  id
                }
                tags {
                  name
                }
              }
              user {
                id
                firstName
                lastName
                email
              }
            }
          }
        `,
				variables: {
					postId: Number(this.context.getters['getPostBySlug'].id)
				}
			})

			const fetchedComments = comments.data.commentsByPost

			const commentsMergedWithUserProfile: Array<BlogCommentModel> =
				await this.context.dispatch('getCommentsMergedWithUserProfile', fetchedComments)

			this.context.commit('setCommentsByPost', commentsMergedWithUserProfile)

			return commentsMergedWithUserProfile
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async getCommentsMergedWithUserProfile(
		fetchedComments: Array<BlogCommentModel>
	): Promise<Array<BlogCommentModel>> {
		const commentsMergedWithUserProfile: Array<BlogCommentModel> = []

		for (const comment of fetchedComments) {
			const userProfile = {
				userProfile: await this.context.dispatch(
					'fetchUserProfileByUserId',
					Number(comment.user.id)
				)
			}

			const dataMerged = { ...comment, ...userProfile }
			commentsMergedWithUserProfile.push(dataMerged)
		}

		return commentsMergedWithUserProfile
	}

	@Action
	async getCommentMergedWithUserProfile(
		commentData: BlogCommentModel
	): Promise<BlogCommentModel> {
		const userProfile = {
			userProfile: await this.context.dispatch(
				'fetchUserProfileByUserId',
				Number(commentData.user.id)
			)
		}
		return { ...commentData, ...userProfile }
	}

	@Action
	async fetchCommentByUserToPost(
		userEmail: string
	): Promise<BlogCommentModel | undefined> {
		try {
			const comment = await clientApollo.query({
				query: gql`
          query {
            commentByUserToPost(postId: ${Number(
							this.context.getters['getPostBySlug'].id
						)}, userEmail: ${String(userEmail)}) {
              id
              content
            }
          }
        `
			})

			const commentData = comment.data.commentByUserToPost

			const dataMerged = await this.context.dispatch(
				'getCommentMergedWithUserProfile',
				commentData
			)

			this.context.commit('setCommentByUserToPost', dataMerged)

			return dataMerged
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async createCommentToPost(data: {
		content: string
		userEmail: string
	}): Promise<BlogCommentModel | undefined> {
		try {
			const comment = await clientApollo.mutate({
				mutation: gql`
					mutation ($postId: ID!, $userEmail: String!, $content: String!) {
						createComment(postId: $postId, userEmail: $userEmail, content: $content) {
							comment {
								content
								createdAt
								isApproved
								numberOfLikes
								post {
									id
									title
									subtitle
									publishedAt
									isPublished
									metaDescription
									mainImageAbsoluteUrl
									mainImageFilename
									slug
									numberOfLikes
								}
								user {
									id
									email
								}
							}
						}
					}
				`,
				variables: {
					postId: Number(this.context.getters['getPostBySlug'].id),
					userEmail: String(data.userEmail),
					content: String(data.content)
				}
			})

			const commentData = comment.data.createComment

			const dataMerged = await this.context.dispatch(
				'getCommentMergedWithUserProfile',
				commentData
			)

			this.context.commit('setCommentByUserToPost', dataMerged)
			return dataMerged
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async updateCommentToPost(content: string): Promise<BlogCommentModel | undefined> {
		try {
			const comment = await clientApollo.mutate({
				mutation: gql`
					mutation ($commentId: ID!, $content: String!) {
						updateComment(commentId: $commentId, content: $content) {
							comment {
								id
								content
								createdAt
								isApproved
								numberOfLikes
								post {
									id
									title
									subtitle
									publishedAt
									isPublished
									metaDescription
									mainImageAbsoluteUrl
									mainImageFilename
									slug
									numberOfLikes
								}
								user {
									id
									email
								}
							}
						}
					}
				`,
				variables: {
					commentId: Number(this.context.getters['getCommentByUserToPost'].id),
					content: String(content)
				}
			})

			const commentData = comment.data.updateComment.comment

			const dataMerged = await this.context.dispatch(
				'getCommentMergedWithUserProfile',
				commentData
			)

			this.context.commit('setCommentByUserToPost', dataMerged)

			return dataMerged
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async deleteCommentFromPost(): Promise<void> {
		try {
			const comment = await clientApollo.mutate({
				mutation: gql`
					mutation ($commentId: ID!) {
						deleteComment(commentId: $commentId) {
							deleted
						}
					}
				`,
				variables: {
					commentId: Number(this.context.getters['getCommentByUserToPost'].id)
				}
			})
			return comment.data.deleteComment
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async updateCommentLikes(
		userId: number
	): Promise<Promise<ApolloQueryResult<boolean>> | undefined> {
		try {
			const comment = await clientApollo.mutate({
				mutation: gql`
					mutation ($id: ID!, $userId: ID!) {
						updateCommentLikes(id: $id, userId: $userId) {
							comment {
								id
								post {
									id
								}
								user {
									id
									email
								}
								liked
							}
						}
					}
				`,
				variables: {
					id: Number(this.context.getters['getCommentByUserToPost'].id),
					userId: Number(userId)
				}
			})
			return comment.data.updateCommentLikes
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async updatePostLikes(data: {
		postId: number
		userId: number
	}): Promise<ApolloQueryResult<boolean> | undefined> {
		try {
			const post = await clientApollo.mutate({
				mutation: gql`
					mutation ($id: ID!, $userId: ID!) {
						updatePostLikes(id: $id, userId: $userId) {
							post {
								id
							}
							liked
						}
					}
				`,
				variables: {
					id: Number(data.postId),
					userId: Number(data.userId)
				}
			})
			return post.data.updatePostLikes.liked
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async toggleFavourite(data: { postId: number; userId: number }): Promise<boolean> {
		return await this.context.dispatch('updatePostLikes', {
			postId: data.postId,
			userId: data.userId
		})
	}
}
