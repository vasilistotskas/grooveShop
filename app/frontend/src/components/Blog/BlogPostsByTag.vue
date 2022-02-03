<template>
  <div class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <h2>Posts in #{{ $route.params.tag }}</h2>
    <PostList v-if="postsByTag" :posts="postsByTag"/>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import PostModel from '@/store/blog/PostModel'
import { Options, Vue } from 'vue-class-component'
import PostList from '@/components/Blog/BlogPostList.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'

@Options({
  name: 'BlogPostsByTag',
  components: {
    PostList,
    Breadcrumbs
  }
})

export default class BlogPostsByTag extends Vue {

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postsByTag(): PostModel[] {
    return store.getters['blog/getPostsByTag']
  }

  async created(): Promise<void> {
    await store.dispatch('blog/postsByTagFromRemote')
  }

  async updated(): Promise<void> {
    await store.dispatch('blog/postsByTagFromRemote')
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogPostsByTag"

</style>