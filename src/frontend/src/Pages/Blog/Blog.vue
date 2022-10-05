<template>
  <div class="container content-min-height mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <BlogPostList v-if="allPosts" :posts="allPosts" />
    <InstagramFeed :count="8" :pagination="false" :caption="false" :use-slider="true" />
  </div>
</template>

<script lang="ts">
import router from '@/Routes'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import BlogPostList from '@/Components/Blog/BlogPostList.vue'
import { Options as Component, Vue } from 'vue-class-component'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import InstagramFeed from '@/Components/Utilities/InstagramFeed.vue'

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

  get breadCrumbPath() {
    return router.currentRoute.value.meta.breadcrumb
  }

  get allPosts(): Array<BlogPostModel> {
    return this.blogModule.getAllPosts
  }

  mounted(): void {
    document.title = 'Blog'

    this.blogModule.fetchAllPostsFromRemote()
  }
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Blog/Blog';
</style>
