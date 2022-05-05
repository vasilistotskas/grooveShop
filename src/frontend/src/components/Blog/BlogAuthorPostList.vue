<template>
  <div class="blog-main-content">
    <div
      v-if="posts && Object.keys(posts).length > 0"
      class="grid-post-list"
    >
      <BlogPostCard
        v-for="post in posts"
        :key="post.title"
        :post="post"
        :author="author"
        class="cardSpecialEffect"
      />
    </div>
    <div v-else>
      <span>No Posts Found</span>
    </div>
    <BlogSidebar
      :authors="allAuthors"
      :tags="allTags"
    />
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogSidebar from '@/components/Blog/BlogSidebar.vue'
import BlogPostCard from '@/components/Blog/BlogPostCard.vue'

@Options({
  name: 'BlogAuthorPostList',
  components: {
    BlogSidebar,
    BlogPostCard
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true
    },
    author: {
      type: Object,
      required: false
    }
  }
})

export default class BlogAuthorPostList extends Vue {
  showAuthor: boolean = false
  posts: Array<BlogPostModel> = []
  author!: object

  get allTags(): Array<BlogPostModel> {
    return store.getters['blog/getAllTags']
  }

  get allAuthors(): Array<BlogPostModel> {
    return store.getters['blog/getAllAuthors']
  }

  async mounted(): Promise<void> {
    await Promise.all([
      store.dispatch('blog/fetchAllTagsFromRemote'),
      store.dispatch('blog/fetchAllAuthorsFromRemote'),
      store.dispatch('blog/fetchAllCategoriesFromRemote')
    ])
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogPostList"

</style>
