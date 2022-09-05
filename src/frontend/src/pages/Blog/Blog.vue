<template>
  <div class="container content-min-height mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <BlogPostList v-if="allPosts" :posts="allPosts" />
    <InstagramFeed :count="8" :pagination="false" :caption="false" :use-slider="true" />
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
import InstagramFeed from '@/components/Utilities/InstagramFeed.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'Blog',
  components: {
    BlogPostList,
    Breadcrumbs,
    InstagramFeed,
  },
})
export default class Blog extends Vue {
  blogModule = getModule(BlogModule)

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  get allPosts(): Array<BlogPostModel> {
    return this.blogModule.getAllPosts
  }

  async mounted(): Promise<void> {
    document.title = 'Blog'

    await this.blogModule.fetchAllPostsFromRemote()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Blog/Blog';
</style>
