<template>
  <div v-if="authorByEmail" class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <h2>{{ displayName }}</h2>
    <a
      :href="authorByEmail.website"
      :title="`Visit Website of ${displayName}`"
      rel="noopener noreferrer"
      target="_blank"
      >Website</a
    >
    <p>{{ authorByEmail.bio }}</p>

    <h3>Posts by {{ displayName }}</h3>
    <BlogAuthorPostList
      v-if="authorPostSet"
      :posts="authorPostSet"
      :show-author="false"
      :author="authorByEmail"
    />
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { RouteParams } from 'vue-router'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogAuthorModel from '@/state/blog/BlogAuthorModel'
import { Options as Component, Vue } from 'vue-class-component'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import BlogAuthorPostList from '@/components/Blog/BlogAuthorPostList.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'BlogAuthor',
  components: {
    BlogAuthorPostList,
    Breadcrumbs,
  },
})
export default class BlogAuthor extends Vue {
  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: (data: RouteParams) => Array<BreadcrumbItemInterface> = router
      .currentRoute.value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get authorByEmail(): BlogAuthorModel {
    return store.getters['blog/getAuthorByEmail']
  }

  get authorPostSet(): Array<BlogPostModel> {
    return this.authorByEmail.postSet
  }

  get displayName(): string {
    return (
      (this.authorByEmail.user?.firstName &&
        this.authorByEmail.user?.lastName &&
        `${this.authorByEmail.user?.firstName} ${this.authorByEmail.user?.lastName}`) ||
      `${this.authorByEmail.user?.email}`
    )
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
@import '@/assets/styles/pages/Blog/BlogAuthor';
</style>
