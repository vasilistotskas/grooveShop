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
          <small class="text-muted">{{ displayableDate(postBySlug.publishedAt) }}</small>
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
          :module="blogModule"
          :getter-type="'getIsCurrentPostInUserFavourites'"
          :getter-params="{ userEmail: userEmail }"
          :dispatch-type="'toggleFavourite'"
          :dispatch-params="{ postId: postBySlug.id, userId: userId }"
          :use-store="true"
        />
      </div>
    </div>
    <BlogComment />
  </div>
  <BlogComments v-if="postBySlug && Object.keys(postBySlug).length > 0" :post="postBySlug" />
</template>

<script lang="ts">
import {
  ImageFitOptions,
  ImagePositionOptions,
  ImageTypeOptions,
} from '@/Helpers/MediaStream/ImageUrlEnum'
import router from '@/Routes'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import BlogComment from '@/Components/Blog/BlogComment.vue'
import BlogComments from '@/Components/Blog/BlogComments.vue'
import { Options as Component, Vue } from 'vue-class-component'
import GrooveImage from '@/Components/Utilities/GrooveImage.vue'
import BlogAuthorLink from '@/Components/Blog/BlogAuthorLink.vue'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import FavouriteButton from '@/Components/Utilities/FavouriteButton.vue'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'

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
  userModule = getModule(UserModule)
  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  get breadCrumbPath() {
    const currentRouteMetaBreadcrumb = router.currentRoute.value.meta
      .breadcrumb as RouteMetaBreadcrumbFunction
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postBySlug(): BlogPostModel {
    return this.blogModule.getPostBySlug
  }

  get isAuthenticated(): boolean {
    return this.authModule.isAuthenticated
  }

  get userEmail(): string {
    return this.userModule.getUserData.email
  }

  get userId(): number {
    return this.userModule.getUserData.id
  }

  created(): void {
    this.blogModule.fetchPostBySlugFromRemote()
    this.blogModule.fetchCommentsByPost()
    if (this.isAuthenticated) {
      this.blogModule.fetchCommentByUserToPost(this.userModule.getUserData.email)
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
@import '@/Assets/Styles/Pages/Blog/BlogPost';
</style>
