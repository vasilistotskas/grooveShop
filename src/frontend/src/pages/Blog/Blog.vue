<template>
  <div class="container content-min-height mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <BlogPostList
      v-if="allPosts"
      :posts="allPosts"
    />
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogPostList from '@/components/Blog/BlogPostList.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Options({
  name: 'Blog',
  components: {
    BlogPostList,
    Breadcrumbs
  }
})

export default class Blog extends Vue {

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get allPosts(): Array<BlogPostModel> {
    return store.getters['blog/getAllPosts']
  }

  async mounted(): Promise<void> {
    document.title = 'Blog'

    await store.dispatch('blog/fetchAllPostsFromRemote')
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Blog/Blog"

</style>
