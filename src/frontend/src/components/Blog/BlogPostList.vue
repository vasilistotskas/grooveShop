<template>
  <div class="blog-post-list-container">
    <div v-if="posts && Object.keys(posts).length > 0" class="blog-post-list-wrapper">
      <BlogPostCard v-for="post in posts" :key="post.title" :post="post" :author="post.author" />
    </div>
    <div v-else>
      <span class="blog-post-list-no_posts">No Posts Found</span>
    </div>
    <TipSidebar :all-tips="allTips" />

    <!--    <BlogTagsSidebar-->
    <!--      :authors="allAuthors"-->
    <!--      :tags="allTags"-->
    <!--    />-->
  </div>
</template>

<script lang="ts">
import store from '@/store'
import TipModel from '@/state/tip/TipModel'
import BlogPostModel from '@/state/blog/BlogPostModel'
import TipSidebar from '@/components/Tip/TipSidebar.vue'
import BlogPostCard from '@/components/Blog/BlogPostCard.vue'
import { Options as Component, Vue } from 'vue-class-component'
import BlogTagsSidebar from '@/components/Blog/BlogTagsSidebar.vue'

@Component({
  name: 'BlogPostList',
  components: {
    BlogTagsSidebar,
    TipSidebar,
    BlogPostCard,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
})
export default class BlogPostList extends Vue {
  showAuthor = false
  posts: Array<BlogPostModel> = []

  get allTags(): Array<BlogPostModel> {
    return store.getters['blog/getAllTags']
  }

  get allAuthors(): Array<BlogPostModel> {
    return store.getters['blog/getAllAuthors']
  }

  get allTips(): Array<TipModel> {
    return store.getters['tip/getAllTips']
  }

  async mounted(): Promise<void> {
    await Promise.all([
      store.dispatch('blog/fetchAllTagsFromRemote'),
      store.dispatch('blog/fetchAllAuthorsFromRemote'),
      store.dispatch('blog/fetchAllCategoriesFromRemote'),
      store.dispatch('tip/fetchAllTipsFromRemote'),
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Blog/BlogPostList';
</style>
