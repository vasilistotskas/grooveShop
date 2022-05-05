<template>
  <RouterLink
    v-if="post && Object.keys(post).length > 0"
    :title="post.slug"
    :to="`/post/${post.slug}`"
    aria-label="Blog Post"
  >
    <div class="card blog-card">
      <img
        :alt="post.title"
        class="img-fluid"
        :src="mediaStreamImage(ImageTypeOptions.BLOG, post.mainImageFilename, '462', '268', ImageFitOptions.cover, ImagePositionOptions.entropy)"
        loading="lazy"
      >
      <div class="card-body">
        <span class="card-title">{{ post.title }}: {{ post.subtitle }}</span>
        <span v-if="showAuthor">
          by <BlogAuthorLink :author="author" />
        </span>
        <p class="card-text">
          {{ post.metaDescription }}
        </p>
        <ul class="grid-post-list-tags">
          <li
            v-for="tag in post.tags"
            :key="tag.name"
            class="post__tags"
          >
            <RouterLink
              :title="tag.name"
              :to="`/tag/${tag.name}`"
              aria-label="Blog Tag"
            >
              #{{
                tag.name
              }}
            </RouterLink>
          </li>
        </ul>
        <small class="text-muted">{{ displayableDate(post.publishDate) }}</small>
      </div>
      <span class="line-1" />
      <span class="line-2" />
      <span class="line-3" />
      <span class="line-4" />
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogSidebar from '@/components/Blog/BlogSidebar.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import BlogAuthorLink from '@/components/Blog/BlogAuthorLink.vue'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { ImageTypeOptions, ImageFitOptions, ImagePositionOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'BlogPostCard',
  components: {
    BlogAuthorLink,
    BlogSidebar
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true
    },
    author: {
      type: Object,
      required: false
    }
  }
})

export default class BlogPostCard extends Vue {
  post = new BlogPostModel()
  showAuthor: boolean = false
  author!: object
  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  imageUrl: string = ''

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl()
        .then((finalUrl: string) => {
          this.imageUrl = finalUrl
        })

    return this.imageUrl

  }

  public displayableDate(date: string): string {
    const options: any = { dateStyle: 'full', timeStyle: 'medium' }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogPostList"

</style>
