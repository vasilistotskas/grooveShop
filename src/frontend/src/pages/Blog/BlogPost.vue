<template>
  <div
    v-if="postBySlug && Object.keys(postBySlug).length > 0"
    class="container mt-7 mb-5"
  >
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
        <p
          class="card-text"
          v-html="postBySlug.body"
        />
        <p class="card-text">
          <small class="text-muted">{{ displayableDate(postBySlug.publishDate) }}</small>
        </p>
        <ul>
          <li
            v-for="tag in postBySlug.tags"
            :key="tag.name"
            class="post__tags"
          >
            <RouterLink
              :title="tag.name"
              :to="`/tag/${tag.name}`"
              aria-label="Blog Tag"
            >
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
        />
      </div>
    </div>
    <BlogComment />
  </div>
  <BlogComments
    v-if="postBySlug && Object.keys(postBySlug).length > 0"
    :post="postBySlug"
  />
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogComment from '@/components/Blog/BlogComment.vue'
import BlogComments from '@/components/Blog/BlogComments.vue'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import BlogAuthorLink from '@/components/Blog/BlogAuthorLink.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import FavouriteButton from '@/components/Utilities/FavouriteButton.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'BlogPost',
  components: {
    BlogAuthorLink,
    Breadcrumbs,
    BlogComment,
    BlogComments,
    GrooveImage,
    FavouriteButton
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  }
})

export default class BlogPost extends Vue {

  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postBySlug(): BlogPostModel {
    return store.getters['blog/getPostBySlug']
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }
  
  async created(): Promise<void> {
    await store.dispatch('blog/fetchPostBySlugFromRemote')
    await store.dispatch('blog/fetchCommentsByPost')
    if (this.isAuthenticated) {
      await store.dispatch('blog/fetchCommentByUserToPost')
    }
  }

  public displayableDate(date: string): string {
    const options: any = { dateStyle: 'full', timeStyle: 'medium' }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }

}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/pages/Blog/BlogPost"

</style>