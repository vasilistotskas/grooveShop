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
	}

	@Action
	async fetchAllTagsFromRemote(): Promise<void> {
		const tags = await clientApollo.query({
			query: gql`query {
                allTags {
                  name
                }
              }`
		})
		return this.context.commit('setAllTags', tags.data.allTags)
	}

	@Action
	async fetchAllAuthorsFromRemote(): Promise<void> {
		const authors = await clientApollo.query({
			query: gql`query {
                allAuthors {
                  website
                  bio
                  user {
                    firstName
                    lastName
                    email
                  }
                }
              }`
		})
		return this.context.commit('setAllAuthors', authors.data.allAuthors)
	}

	@Action
	async fetchAllCategoriesFromRemote(): Promise<void> {
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
	}

	@Action
	async fetchPostsByTagFromRemote(): Promise<void> {
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
	}

	@Action
	async fetchPostBySlugFromRemote(): Promise<void> {
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
	}

	@Action
	async fetchAuthorByEmailFromRemote(): Promise<void> {
		const author = await clientApollo.query({
			query: gql`query ($email: String!) {
                authorByEmail(email: $email) {
                  website
                  bio
                  user {
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
	}

	@Action
	async fetchCommentsByUser(): Promise<void> {
		const comments = await clientApollo.query({
			query: gql`query ($userEmail: String!) {
                commentsByUser(userEmail: $userEmail) {
                  content
                  createdAt
                  isApproved
                  numberOfLikes
                  user {
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
	}

	@Action
	async fetchCommentsByPost(): Promise<void> {
		const comments = await clientApollo.query({
			query: gql`query ($postId: Int!) {
                commentsByPost(postId: $postId) {
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
                }
              }`,
			variables: {
				postId: this.context.getters['getPostBySlug'].id
			}
		})
		return this.context.commit('setCommentsByPost', comments.data.commentsByPost)
	}

	@Action
	async fetchCommentByUserToPost(): Promise<void> {
		const comments = await clientApollo.query({
			query: gql`query ($postId: Int!, $userEmail: String!) {
                commentByUserToPost(postId: $postId, userEmail: $userEmail) {
                  content
                  createdAt
                  isApproved
                  numberOfLikes
				  user {
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
				postId: this.context.getters['getPostBySlug'].id,
				userEmail: store.getters['user/data/getUserData'].email
			}
		})
		return this.context.commit('setCommentByUserToPost', comments.data.commentByUserToPost)
	}

	@Action
	async createCommentToPost(content: string): Promise<void> {
		const comment = await clientApollo.query({
			query: gql`mutation ($post_id: ID!, $user_email: String!, $content: String!) {
                createComment(postId: $post_id, userEmail: $user_email, content: $content) {
				  comment {
			        content
				    post {
					  id
				    }
					user {
					  email
					}
				  }
                }
              }`,
			variables: {
				post_id: this.context.getters['getPostBySlug'].id,
				user_email: store.getters['user/data/getUserData'].email,
				content: content,
			}
		})
		return this.context.commit('setCommentByUserToPost', comment.data.createComment)
	}

	@Action
	async updateCommentLikes(commentId: number): Promise<ApolloQueryResult<any>> {
		const comment = await clientApollo.query({
			query: gql`mutation ($id: ID!, $user_email: String!) {
                updateCommentLikes(id:$id, userEmail: $user_email) {
					comment {
						post {
							id
						}
						user {
							email
						}
					}
                }
              }`,
			variables: {
				id: commentId,
				user_email: store.getters['user/data/getUserData'].email
			}
		})
		return comment
	}

	@Action
	async updatePostLikes(postId: number): Promise<ApolloQueryResult<any>> {
		const post = await clientApollo.query({
			query: gql`mutation ($id: ID!, $user_email: String!) {
                updatePostLikes(id:$id, userEmail: $user_email) {
				  post {
				    id
				  }
                }
              }`,
			variables: {
				id: postId,
				user_email: store.getters['user/data/getUserData'].email
			}
		})
		return post
	}
}
