<template>
  <div v-if="author" class="container mt-8 mb-5">
    <h2>{{ displayName }}</h2>
    <a :href="author.website" target="_blank" rel="noopener noreferrer">Website</a>
    <p>{{ author.bio }}</p>

    <h3>Posts by {{ displayName }}</h3>
    <PostList :posts="author.postSet" :showAuthor="false" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import PostList from '@/components/Blog/PostList.vue'
export default {
  name: 'Author',
  components: {
    PostList,
  },
  data () {
    return {
      author: null,
    }
  },
  async created () {
    const user = await this.$apollo.query({
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
        email: this.$route.params.email,
      },
    })
    this.author = user.data.authorByEmail
  },
  computed: {
    displayName () {
      return (this.author.user.firstName && this.author.user.lastName && `${this.author.user.firstName} ${this.author.user.lastName}`) || `${this.author.user.email}`
    },
  },
}
</script>
