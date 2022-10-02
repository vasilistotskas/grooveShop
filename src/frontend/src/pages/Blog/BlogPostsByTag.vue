<template>
  <div class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <h2>Posts in #{{ $route.params.tag }}</h2>
    <BlogPostList v-if="postsByTag" :posts="postsByTag" />
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import BlogModule from '@/state/blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogPostList from '@/components/Blog/BlogPostList.vue'
import { Options as Component, Vue } from 'vue-class-component'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { RouteMetaBreadcrumbFunction } from '@/routes/Type/BreadcrumbItemType'

@Component({
  name: 'BlogPostsByTag',
  components: {
    BlogPostList,
    Breadcrumbs,
  },
})
export default class BlogPostsByTag extends Vue {
  blogModule = getModule(BlogModule)

  get breadCrumbPath() {
    const currentRouteMetaBreadcrumb = router.currentRoute.value.meta
      .breadcrumb as RouteMetaBreadcrumbFunction
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postsByTag(): Array<BlogPostModel> {
    return this.blogModule.getPostsByTag
  }

  created(): void {
    this.blogModule.fetchPostsByTagFromRemote()
  }

  updated(): void {
    this.blogModule.fetchPostsByTagFromRemote()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Blog/BlogPostsByTag';
</style>
