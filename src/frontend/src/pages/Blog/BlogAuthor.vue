<template>
  <div v-if="authorById" class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <h2>{{ displayName }}</h2>
    <a
      :href="authorById.website"
      :title="`Visit Website of ${displayName}`"
      rel="noopener noreferrer"
      target="_blank"
      >Website</a
    >
    <p>{{ authorById.bio }}</p>

    <h3>Posts by {{ displayName }}</h3>
    <BlogAuthorPostList
      v-if="authorPostSet"
      :posts="authorPostSet"
      :show-author="false"
      :author="authorById"
    />
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import { RouteParams } from 'vue-router'
import BlogModule from '@/state/blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
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
  blogModule = getModule(BlogModule)

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: (data: RouteParams) => Array<BreadcrumbItemInterface> = router
      .currentRoute.value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get authorById(): BlogAuthorModel {
    return this.blogModule.getAuthorById
  }

  get authorPostSet(): Array<BlogPostModel> {
    return this.authorById.postSet
  }

  get displayName(): string {
    return (
      (this.authorById.user?.firstName &&
        this.authorById.user?.lastName &&
        `${this.authorById.user?.firstName} ${this.authorById.user?.lastName}`) ||
      `${this.authorById.user?.email}`
    )
  }

  async created(): Promise<void> {
    await this.blogModule.fetchAuthorByIdFromRemote()
  }

  async updated(): Promise<void> {
    await this.blogModule.fetchAuthorByIdFromRemote()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Blog/BlogAuthor';
</style>
