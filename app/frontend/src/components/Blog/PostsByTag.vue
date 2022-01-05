<template>
  <div class="container mt-7 mb-5">
    <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
    <h2>Posts in #{{ $route.params.tag }}</h2>
    <PostList :posts="postsByTag" v-if="postsByTag" />
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
  name: "PostsByTag",
  components: {
    PostList,
    Breadcrumbs
  }
})

export default class PostsByTag extends Vue {

  async created(): Promise<void> {
    await store.dispatch('blog/postsByTagFromRemote')
  }

  async updated(): Promise<void> {
    await store.dispatch('blog/postsByTagFromRemote')
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postsByTag(): PostModel[] {
    return store.getters['blog/getPostsByTag']
  }

}
</script>
