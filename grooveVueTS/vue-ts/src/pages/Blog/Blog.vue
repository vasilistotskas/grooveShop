<template>
  <div class="container content-min-height mt-8 mb-5">
    <PostList v-if="allPosts" :posts="allPosts" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import PostList from '@/components/Blog/PostList.vue'
export default {
  name: 'Blog',
  components: {
    PostList,
  },
  apollo: {
    allPosts: {
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
              username
              firstName
              lastName
            }
          }
          tags {
            name
          }
        }
      }`,
    }
  },
  mounted() {
    document.title = 'Blog'
  }
}
</script>
