<template>
  <div v-if="authorByEmail" class="container mt-8 mb-5">
    <h2>{{ displayName }}</h2>
    <a :href="authorByEmail.website" target="_blank" rel="noopener noreferrer">Website</a>
    <p>{{ authorByEmail.bio }}</p>

    <h3>Posts by {{ displayName }}</h3>
    <PostList v-if="authorPostSet" :posts="authorPostSet" :showAuthor="false" />
  </div>
</template>

<script lang="ts">
import store from "@/store"
import PostModel from "@/state/blog/PostModel"
import AuthorModel from "@/state/blog/AuthorModel"
import { Options, Vue } from "vue-class-component"
import PostList from '@/components/Blog/PostList.vue'

@Options({
  name: "Author",
  components: {
    PostList
  }
})

export default class Author extends Vue {

  get authorByEmail(): AuthorModel {
    return store.getters['blog/getAuthorByEmail']
  }

  get authorPostSet(): PostModel[] {
    return this.authorByEmail.postSet
  }

  async created(): Promise<void> {
    await store.dispatch('blog/authorByEmailFromRemote')
  }

  get displayName (): string {
    return (this.authorByEmail.user?.firstName && this.authorByEmail.user?.lastName && `${this.authorByEmail.user?.firstName} ${this.authorByEmail.user?.lastName}`) || `${this.authorByEmail.user?.email}`
  }
}
</script>
