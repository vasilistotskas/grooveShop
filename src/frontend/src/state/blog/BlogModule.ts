import router from '@/routes'
import gql from 'graphql-tag'
import BlogTagModel from '@/state/blog/BlogTagModel'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogAuthorModel from '@/state/blog/BlogAuthorModel'
import { clientApollo } from '../../../apollo.provider'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class BlogModule extends AppBaseModule {
	allPosts: Array<BlogPostModel> = []
	allTags: Array<BlogTagModel> = []
	allAuthors: Array<BlogAuthorModel> = []
	postsByTag: Array<BlogPostModel> = []
	postBySlug = new BlogPostModel()
	author = new BlogAuthorModel()

	get getAllPosts(): Array<BlogPostModel> {
		return this.allPosts
	}

	get getAllTags(): Array<BlogTagModel> {
		return this.allTags
	}

	get getAllAuthors(): Array<BlogAuthorModel> {
		return this.allAuthors
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

	@Action
	async fetchAllPostsFromRemote(): Promise<void> {
		const posts = await clientApollo.query({
			query: gql`query {
                allPosts {
                  title
                  subtitle
                  publishDate
                  published
                  metaDescription
                  mainImageAbsoluteUrl
                  mainImageFilename
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
	async fetchPostsByTagFromRemote(): Promise<void> {
		const posts = await clientApollo.query({
			query: gql`query ($tag: String!) {
                postsByTag(tag: $tag) {
                  title
                  subtitle
                  publishDate
                  published
                  metaDescription
                  mainImageAbsoluteUrl
                  mainImageFilename
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
                title
                subtitle
                publishDate
                metaDescription
                mainImageAbsoluteUrl
                mainImageFilename
                slug
                body
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
}
