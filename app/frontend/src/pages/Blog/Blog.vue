<template>
  <div class="container content-min-height mt-7 mb-5">
    <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
    <PostList v-if="allPosts" :posts="allPosts" />
  </div>
</template>

<script lang="ts">
import store from "@/store"
import router from "@/routes"
import PostModel from "@/state/blog/PostModel"
import { Options, Vue } from "vue-class-component"
import PostList from '@/components/Blog/PostList.vue'
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.vue"

@Options({
  name: "Blog",
  components: {
    PostList,
    Breadcrumbs
  }
})

export default class Blog extends Vue {

  async mounted(): Promise<void> {
    document.title = 'Blog'

    await store.dispatch('blog/allPostsFromRemote')
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get allPosts(): PostModel[] {
    return store.getters['blog/getAllPosts']
  }

}
</script>

<style lang="scss" scoped></style>
