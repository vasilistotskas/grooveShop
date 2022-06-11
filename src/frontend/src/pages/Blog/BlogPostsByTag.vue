<template>
  <div class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <h2>Posts in #{{ $route.params.tag }}</h2>
    <BlogPostList
      v-if="postsByTag"
      :posts="postsByTag"
    />
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options as Component, Vue } from 'vue-class-component'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogPostList from '@/components/Blog/BlogPostList.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'BlogPostsByTag',
  components: {
    BlogPostList,
    Breadcrumbs
  }
})

export default class BlogPostsByTag extends Vue {

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postsByTag(): Array<BlogPostModel> {
    return store.getters['blog/getPostsByTag']
  }

  async created(): Promise<void> {
    await store.dispatch('blog/fetchPostsByTagFromRemote')
  }

  async updated(): Promise<void> {
    await store.dispatch('blog/fetchPostsByTagFromRemote')
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Blog/BlogPostsByTag"

</style>