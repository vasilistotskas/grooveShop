<template>
  <div v-if="postBySlug && Object.keys(postBySlug).length > 0" class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div class="card mb-3">
      <img
          :alt="postBySlug.title"
          :src="mediaStreamImage(ImageTypeOptions.SLIDES, postBySlug.mainImageFilename, '1920', '550')"
          class="img-fluid"
          height="550"
          width="1920"
          loading="lazy"
      />
      <div class="card-body">
        <span class="card-title">{{ postBySlug.title }}: {{ postBySlug.subtitle }}</span>
        By
        <AuthorLink :author="postBySlug.author"/>
        <p class="card-text">{{ postBySlug.metaDescription }}</p>
        <p class="card-text" v-html="postBySlug.body"></p>
        <p class="card-text"><small class="text-muted">{{ displayableDate(postBySlug.publishDate) }}</small></p>
        <ul>
          <li v-for="tag in postBySlug.tags" :key="tag.name" class="post__tags">
            <RouterLink :title="tag.name" :to="`/tag/${tag.name}`" aria-label="Blog Tag">#{{ tag.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import PostModel from '@/state/blog/PostModel'
import { Options, Vue } from 'vue-class-component'
import AuthorLink from '@/components/Blog/BlogAuthorLink.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'BlogPost',
  components: {
    AuthorLink,
    Breadcrumbs
  }
})

export default class BlogPost extends Vue {

  ImageTypeOptions: any = ImageTypeOptions
  ImageFitOptions: any = ImageFitOptions
  ImagePositionOptions: any = ImagePositionOptions

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postBySlug(): PostModel {
    return store.getters['blog/getPostBySlug']
  }

  async created(): Promise<void> {
    await store.dispatch('blog/fetchPostBySlugFromRemote')
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }
    return ImageUrlModel.buildMediaStreamImageUrl(mediaStreamImageData)
  }

  public displayableDate(date: Date): string {
    const options: any = { dateStyle: 'full', timeStyle: 'medium' }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }

}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogPost"

</style>