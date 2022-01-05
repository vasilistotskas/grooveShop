<template>
  <div v-if="authorByEmail" class="container mt-7 mb-5">
    <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
    <h2>{{ displayName }}</h2>
    <a :href="authorByEmail.website" target="_blank" rel="noopener noreferrer">Website</a>
    <p>{{ authorByEmail.bio }}</p>

    <h3>Posts by {{ displayName }}</h3>
    <PostList v-if="authorPostSet" :posts="authorPostSet" :showAuthor="false" />
  </div>
</template>

<script lang="ts">
import store from "@/store"
import router from "@/routes"
import PostModel from "@/state/blog/PostModel"
import AuthorModel from "@/state/blog/AuthorModel"
import { Options, Vue } from "vue-class-component"
import PostList from '@/components/Blog/PostList.vue'
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.vue"

@Options({
  name: "Author",
  components: {
    PostList,
    Breadcrumbs
  }
})

export default class Author extends Vue {

  async created(): Promise<void> {
    await store.dispatch('blog/authorByEmailFromRemote')
  }

  async updated(): Promise<void> {
    await store.dispatch('blog/authorByEmailFromRemote')
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get authorByEmail(): AuthorModel {
    return store.getters['blog/getAuthorByEmail']
  }

  get authorPostSet(): PostModel[] {
    return this.authorByEmail.postSet
  }

  get displayName (): string {
    return (this.authorByEmail.user?.firstName && this.authorByEmail.user?.lastName && `${this.authorByEmail.user?.firstName} ${this.authorByEmail.user?.lastName}`) || `${this.authorByEmail.user?.email}`
  }
}
</script>
