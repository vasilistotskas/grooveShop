<template>
  <div class="container content-min-height mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <PostList v-if="allPosts" :posts="allPosts"/>
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
  name: 'Blog',
  components: {
    PostList,
    Breadcrumbs
  }
})

export default class Blog extends Vue {

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get allPosts(): PostModel[] {
    return store.getters['blog/getAllPosts']
  }

  async mounted(): Promise<void> {
    document.title = 'Blog'

    await store.dispatch('blog/allPostsFromRemote')
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Blog/Blog"

</style>
