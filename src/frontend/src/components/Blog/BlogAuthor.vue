<template>
  <div v-if="authorByEmail" class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <h2>{{ displayName }}</h2>
    <a :href="authorByEmail.website" :title="`Visit Website of ${displayName}`" rel="noopener noreferrer"
       target="_blank">Website</a>
    <p>{{ authorByEmail.bio }}</p>

    <h3>Posts by {{ displayName }}</h3>
    <PostList v-if="authorPostSet" :posts="authorPostSet" :show-author="false"/>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import PostModel from '@/state/blog/PostModel'
import AuthorModel from '@/state/blog/AuthorModel'
import { Options, Vue } from 'vue-class-component'
import PostList from '@/components/Blog/BlogPostList.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Options({
  name: 'BlogAuthor',
  components: {
    PostList,
    Breadcrumbs
  }
})

export default class BlogAuthor extends Vue {

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get authorByEmail(): AuthorModel {
    return store.getters['blog/getAuthorByEmail']
  }

  get authorPostSet(): PostModel[] {
    return this.authorByEmail.postSet
  }

  get displayName(): string {
    return (this.authorByEmail.user?.firstName && this.authorByEmail.user?.lastName && `${ this.authorByEmail.user?.firstName } ${ this.authorByEmail.user?.lastName }`) || `${ this.authorByEmail.user?.email }`
  }

  async created(): Promise<void> {
    await store.dispatch('blog/fetchAuthorByEmailFromRemote')
  }

  async updated(): Promise<void> {
    await store.dispatch('blog/fetchAuthorByEmailFromRemote')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogAuthor"

</style>