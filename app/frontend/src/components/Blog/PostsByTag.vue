<template>
  <div class="container mt-8 mb-5">
    <h2>Posts in #{{ $route.params.tag }}</h2>
    <PostList :posts="postsByTag" v-if="postsByTag" />
  </div>
</template>

<script lang="ts">
import store from "@/store"
import PostModel from "@/state/blog/PostModel"
import { Options, Vue } from "vue-class-component"
import PostList from '@/components/Blog/PostList.vue'

@Options({
  name: "PostsByTag",
  components: {
    PostList
  }
})

export default class PostsByTag extends Vue {

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
