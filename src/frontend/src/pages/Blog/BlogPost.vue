<template>
  <div v-if="postBySlug && Object.keys(postBySlug).length > 0" class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="card mb-3">
      <GrooveImage
        :alt="postBySlug.title"
        :file-name="postBySlug.mainImageFilename"
        :use-media-stream="true"
        :img-type="ImageTypeOptions.BLOG"
        :img-width="300"
        :img-height="550"
      />
      <div class="card-body">
        <span class="card-title">{{ postBySlug.title }}: {{ postBySlug.subtitle }}</span>
        By
        <BlogAuthorLink :author="postBySlug.author" />
        <p class="card-text">
          {{ postBySlug.metaDescription }}
        </p>
        <p class="card-text" v-html="postBySlug.body" />
        <p class="card-text">
          <small class="text-muted">{{ displayableDate(postBySlug.publishDate) }}</small>
        </p>
        <ul>
          <li v-for="tag in postBySlug.tags" :key="tag.name" class="post__tags">
            <RouterLink :title="tag.name" :to="`/tag/${tag.name}`" aria-label="Blog Tag">
              #{{ tag.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="favourite-button-content">
        <FavouriteButton
          :model="postBySlug"
          :getter-type="'blog/getIsCurrentPostInUserFavourites'"
          :dispatch-type="'blog/toggleFavourite'"
          :use-store="true"
        />
      </div>
    </div>
    <BlogComment />
  </div>
  <BlogComments v-if="postBySlug && Object.keys(postBySlug).length > 0" :post="postBySlug" />
</template>

<script lang="ts">
import router from '@/routes'
import { RouteParams } from 'vue-router'
import {
  ImageFitOptions,
  ImagePositionOptions,
  ImageTypeOptions,
} from '@/helpers/MediaStream/ImageUrlEnum'
import BlogModule from '@/state/blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/state/auth/auth/AuthModule'
import BlogPostModel from '@/state/blog/BlogPostModel'
import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import BlogComment from '@/components/Blog/BlogComment.vue'
import BlogComments from '@/components/Blog/BlogComments.vue'
import { Options as Component, Vue } from 'vue-class-component'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import BlogAuthorLink from '@/components/Blog/BlogAuthorLink.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import FavouriteButton from '@/components/Utilities/FavouriteButton.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'BlogPost',
  components: {
    BlogAuthorLink,
    Breadcrumbs,
    BlogComment,
    BlogComments,
    GrooveImage,
    FavouriteButton,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
})
export default class BlogPost extends Vue {
  blogModule = getModule(BlogModule)
  authModule = getModule(AuthModule)
  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: (data: RouteParams) => Array<BreadcrumbItemInterface> = router
      .currentRoute.value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postBySlug(): BlogPostModel {
    return this.blogModule.getPostBySlug
  }

  get isAuthenticated(): boolean {
    return this.authModule.isAuthenticated
  }

  async created(): Promise<void> {
    await this.blogModule.fetchPostBySlugFromRemote()
    await this.blogModule.fetchCommentsByPost()
    if (this.isAuthenticated) {
      await this.blogModule.fetchCommentByUserToPost()
    }
  }

  unmounted(): void {
    this.blogModule.clearPostData()
  }

  public displayableDate(date: string): string {
    const options: DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'medium' }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/pages/Blog/BlogPost';
</style>
