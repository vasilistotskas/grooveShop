<template>
  <div class="container content-min-height mt-8 mb-5">
    <PostList v-if="allPosts" :posts="allPosts" />
  </div>
</template>

<script lang="ts">
import store from "@/store"
import PostModel from "@/state/blog/PostModel"
import { Options, Vue } from "vue-class-component"
import PostList from '@/components/Blog/PostList.vue'

@Options({
  name: "Blog",
  components: {
    PostList
  }
})

export default class Blog extends Vue {

  async mounted(): Promise<void> {
    document.title = 'Blog'
    await store.dispatch('blog/allPostsFromRemote')
  }

  get allPosts(): PostModel[] {
    return store.getters['blog/getAllPosts']
  }
}
</script>
