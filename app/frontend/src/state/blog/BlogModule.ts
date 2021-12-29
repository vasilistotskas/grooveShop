import router from "@/routes"
import gql from 'graphql-tag'
import PostModel from "@/state/blog/PostModel"
import { clientApollo } from '../../../apollo.provider'
import AuthorModel from "@/state/blog/AuthorModel"
import AppBaseModule from "@/state/common/AppBaseModule"
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class BlogModule
    extends AppBaseModule
{
    allPosts: Array<PostModel> = []
    postsByTag: Array<PostModel> = []
    postBySlug = new PostModel()
    author = new AuthorModel()

    get getAllPosts (): PostModel[] {
        return this.allPosts
    }

    get getPostsByTag (): PostModel[] {
        return this.postsByTag
    }

    get getPostBySlug (): PostModel {
        return this.postBySlug
    }

    get getPublishedPosts (): PostModel[] {
        return this.allPosts.filter(post => post.published)
    }

    get getAuthorByEmail (): AuthorModel {
        return this.author
    }

    @Mutation
    setAllPosts(data: PostModel[]): void {
        this.allPosts = data
    }

    @Mutation
    setPostsByTag(data: PostModel[]): void {
        this.postsByTag = data
    }

    @Mutation
    setPostBySlug(data: PostModel): void {
        this.postBySlug = data
    }

    @Mutation
    setAuthorByEmail(data: AuthorModel): void {
        this.author = data
    }

    @Action
    async allPostsFromRemote(): Promise<void> {
        const posts = await clientApollo.query({
            query: gql`query {
                allPosts {
                  title
                  subtitle
                  publishDate
                  published
                  metaDescription
                  image
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
                tag: router.currentRoute.value.params.tag,
            },
        })
        this.context.commit('setAllPosts', posts.data.allPosts)
    }

    @Action
    async postsByTagFromRemote(): Promise<void> {
        const posts = await clientApollo.query({
            query: gql`query ($tag: String!) {
                postsByTag(tag: $tag) {
                  title
                  subtitle
                  publishDate
                  published
                  metaDescription
                  image
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
                tag: router.currentRoute.value.params.tag,
            },
        })
        this.context.commit('setPostsByTag', posts.data.postsByTag)
    }

    @Action
    async postBySlugFromRemote(): Promise<void> {
        const post = await clientApollo.query({
            query: gql`query ($slug: String!) {
              postBySlug(slug: $slug) {
                title
                subtitle
                publishDate
                metaDescription
                image
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
                slug: router.currentRoute.value.params.slug,
            },
        })
        this.context.commit('setPostBySlug', post.data.postBySlug)
    }

    @Action
    async authorByEmailFromRemote(): Promise<void> {
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
                    image
                    slug
                    tags {
                      name
                    }
                  }
                }
              }`,
            variables: {
                email: router.currentRoute.value.params.email,
            },
        })
        this.context.commit('setAuthorByEmail', author.data.authorByEmail)
    }
}
