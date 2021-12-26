<template>
  <div class="container mt-8 mb-5" v-if="post && Object.keys(post).length > 0">
    <div class="card mb-3">
      <img class="img-fluid" v-bind:src="axiosBaseUrl + '/static/media/' + post.image" :alt="post.title">
      <div class="card-body">
        <span class="card-title">{{ post.title }}: {{ post.subtitle }}</span>
        By <AuthorLink :author="post.author" />
        <p class="card-text">{{ post.metaDescription }}</p>
        <p class="card-text">{{ post.body }}</p>
        <p class="card-text"><small class="text-muted">{{ displayableDate(post.publishDate) }}</small></p>
        <ul>
          <li class="post__tags" v-for="tag in post.tags" :key="tag.name">
            <router-link :to="`/tag/${tag.name}`" aria-label="Blog Tag">#{{ tag.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AuthorLink from '@/components/Blog/AuthorLink.vue'
export default {
  name: 'Post',
  components: {
    AuthorLink,
  },
  data () {
    return {
      post: null,
    }
  },
  async created () {
    const post = await this.$apollo.query({
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
        slug: this.$route.params.slug,
      },
    })
    this.post = post.data.postBySlug
  },
  computed: {
    axiosBaseUrl () {
      return this.$store.getters['app/axiosBaseUrl']
    }
  },
  methods: {
    displayableDate (date) {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(date))
    }
  }
}
</script>
