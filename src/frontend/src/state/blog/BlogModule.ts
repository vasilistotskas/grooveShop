import store from '@/store'
import router from '@/routes'
import gql from 'graphql-tag'
import { ApolloQueryResult } from '@apollo/client'
import BlogTagModel from '@/state/blog/BlogTagModel'
import BlogPostModel from '@/state/blog/BlogPostModel'
import { clientApollo } from '../../../apollo.provider'
import AppBaseModule from '@/state/common/AppBaseModule'
import BlogAuthorModel from '@/state/blog/BlogAuthorModel'
import BlogCommentModel from '@/state/blog/BlogCommentModel'
import BlogCategoryModel from '@/state/blog/BlogCategoryModel'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
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
	commentByUserToPost: Array<BlogCommentModel> = []

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
		return this.allPosts.filter(post => post.published)
	}

	get getAuthorByEmail(): BlogAuthorModel {
		return this.author
	}

	get getCommentsByUser(): Array<BlogCommentModel> {
		return this.commentsByUser
	}

	get getCommentsByPost(): Array<BlogCommentModel> {
		return this.commentsByPost
	}

	get getCommentByUserToPost(): Array<BlogCommentModel> {
		return this.commentByUserToPost
	}

	get getUserHasAlreadyCommentedPost(): boolean {
		return this.getCommentByUserToPost && Object.keys(this.getCommentByUserToPost).length > 0
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
	setAuthorByEmail(data: BlogAuthorModel): void {
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
	setCommentByUserToPost(data: Array<BlogCommentModel>): void {
		this.commentByUserToPost = data
	}

	@Action
	async fetchAllPostsFromRemote(): Promise<void> {
		try {
			const posts = await clientApollo.query({
				query: gql`query {
                allPosts {
				  id
                  title
                  subtitle
                  publishDate
                  published
                  metaDescription
                  mainImageAbsoluteUrl
                  mainImageFilename
                  numberOfLikes
                  slug
                  category {
                    id
                  }
                  author {
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
              }`
			})
			return this.context.commit('setAllPosts', posts.data.allPosts)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAllTagsFromRemote(): Promise<void> {
		try {
			const tags = await clientApollo.query({
				query: gql`query {
                allTags {
                  name
                }
              }`
			})
			return this.context.commit('setAllTags', tags.data.allTags)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAllAuthorsFromRemote(): Promise<void> {
		try {
			const authors = await clientApollo.query({
				query: gql`query {
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
              }`
			})
			return this.context.commit('setAllAuthors', authors.data.allAuthors)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAllCategoriesFromRemote(): Promise<void> {
		try {
			const categories = await clientApollo.query({
				query: gql`query {
                allCategories {
                  name
                  slug
                  description
                }
              }`
			})
			return this.context.commit('setAllCategories', categories.data.allCategories)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchPostsByTagFromRemote(): Promise<void> {
		try {
			const posts = await clientApollo.query({
				query: gql`query ($tag: String!) {
                postsByTag(tag: $tag) {
				  id
                  title
                  subtitle
                  publishDate
                  published
                  metaDescription
                  mainImageAbsoluteUrl
                  mainImageFilename
				  numberOfLikes
				  category {
                    id
                  }
                  slug
                  author {
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
              }`,
				variables: {
					tag: router.currentRoute.value.params.tag
				}
			})
			return this.context.commit('setPostsByTag', posts.data.postsByTag)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchPostBySlugFromRemote(): Promise<void> {
		try {
			const post = await clientApollo.query({
				query: gql`query ($slug: String!) {
			    postBySlug(slug: $slug) {
				  id
				  title
				  subtitle
				  publishDate
				  metaDescription
				  mainImageAbsoluteUrl
				  mainImageFilename
				  numberOfLikes
				  slug
				  body
				  category {
				    id
				  }
				  author {
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
			  }`,
				variables: {
					slug: router.currentRoute.value.params.slug
				}
			})
			return this.context.commit('setPostBySlug', post.data.postBySlug)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchAuthorByEmailFromRemote(): Promise<void> {
		try {
			const author = await clientApollo.query({
				query: gql`query ($email: String!) {
                authorByEmail(email: $email) {
                  website
                  bio
                  user {
                    id
                    firstName
                    lastName
                    email
                  }
                  postSet {
                    title
                    subtitle
                    publishDate
                    published
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
                }
              }`,
				variables: {
					email: router.currentRoute.value.params.email
				}
			})
			return this.context.commit('setAuthorByEmail', author.data.authorByEmail)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchCommentsByUser(): Promise<void> {
		try {
			const comments = await clientApollo.query({
				query: gql`query ($userEmail: String!) {
                commentsByUser(userEmail: $userEmail) {
                  id
                  content
                  createdAt
                  isApproved
                  numberOfLikes
                  user {
                    id
                    firstName
                    lastName
                    email
                  }
				  post {
				  	id
                    title
                    subtitle
                    publishDate
                    published
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
                }
              }`,
				variables: {
					userEmail: store.getters['user/data/getUserEmail']
				}
			})
			return this.context.commit('setCommentsByUser', comments.data.commentsByUser)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchCommentsByPost(): Promise<void> {
		try {
			const comments = await clientApollo.query({
				query: gql`query ($postId: Int!) {
                commentsByPost(postId: $postId) {
                  id
                  content
                  createdAt
                  isApproved
                  numberOfLikes
				  post {
				  	id
                    title
                    subtitle
                    publishDate
                    published
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
              }`,
				variables: {
					postId: Number(this.context.getters['getPostBySlug'].id)
				}
			})
			return this.context.commit('setCommentsByPost', comments.data.commentsByPost)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async fetchCommentByUserToPost(): Promise<void> {
		try {
			const comment = await clientApollo.query({
				query: gql`query ($postId: Int!, $userEmail: String!) {
                commentByUserToPost(postId: $postId, userEmail: $userEmail) {
                  id
                  content
                  createdAt
                  isApproved
                  numberOfLikes
				  user {
				  	id
                    firstName
                    lastName
                    email
                  }
				  post {
				  	id
                    title
                    subtitle
                    publishDate
                    published
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
                }
              }`,
				variables: {
					postId: Number(this.context.getters['getPostBySlug'].id),
					userEmail: store.getters['user/data/getUserData'].email
				}
			})
			return this.context.commit('setCommentByUserToPost', comment.data.commentByUserToPost[0])
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async createCommentToPost(content: string): Promise<void> {
		try {
			const comment = await clientApollo.mutate({
				mutation: gql`mutation ($post_id: ID!, $user_email: String!, $content: String!) {
                createComment(postId: $post_id, userEmail: $user_email, content: $content) {
				  comment {
				    id
			        content
				    post {
					  id
				    }
					user {
					  id
					  email
					}
				  }
                }
              }`,
				variables: {
					post_id: Number(this.context.getters['getPostBySlug'].id),
					user_email: String(store.getters['user/data/getUserData'].email),
					content: String(content),
				}
			})
			return this.context.commit('setCommentByUserToPost', comment.data.createComment)
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async deleteCommentFromPost(): Promise<void> {
		try {
			const comment = await clientApollo.mutate({
				mutation: gql`mutation ($comment_id: ID!) {
			    deleteComment(commentId: $comment_id) {
				  deleted
			    }
			  }`,
				variables: {
					comment_id: Number(this.context.getters['getCommentByUserToPost'].id)
				}
			})
			return comment.data.deleteComment
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async updateCommentLikes(): Promise<Promise<ApolloQueryResult<any>> | undefined> {
		try {
			const comment = await clientApollo.mutate({
				mutation: gql`mutation ($id: ID!, $user_email: String!) {
                updateCommentLikes(id:$id, userEmail: $user_email) {
				  comment {
					id
					post {
					  id
					}
					user {
					  id
					  email
					}
				  }
                }
              }`,
				variables: {
					id: Number(this.context.getters['getCommentByUserToPost'].id),
					user_email: store.getters['user/data/getUserData'].email
				}
			})
			return comment.data.updateCommentLikes
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}

	@Action
	async updatePostLikes(postId: number): Promise<Promise<ApolloQueryResult<any>> | undefined> {
		try {
			const post = await clientApollo.mutate({
				mutation: gql`mutation ($id: ID!, $user_email: String!) {
                updatePostLikes(id:$id, userEmail: $user_email) {
				  post {
				    id
				  }
                }
              }`,
				variables: {
					id: Number(postId),
					user_email: store.getters['user/data/getUserData'].email
				}
			})
			return post.data.updatePostLikes
		} catch (error) {
			console.log(JSON.stringify(error, null, 2))
		}
	}
}
