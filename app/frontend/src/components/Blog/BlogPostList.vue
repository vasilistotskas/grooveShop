<template>
  <div class="blog-main-content">
    <div v-if="posts && Object.keys(posts).length > 0" class="grid-post-list">
      <div v-for="post in posts" :key="post.title" class="cardSpecialEffect">
        <RouterLink :title="post.slug" :to="`/post/${post.slug}`" aria-label="Blog Post">
          <div class="card blog-card">
            <img
                :alt="post.title"
                class="img-fluid"
                v-bind:src="mediaStreamImage(ImageTypeOptions.SLIDES, post.mainImageFilename, '462', '268', ImageFitOptions.cover, ImagePositionOptions.entropy)"
                loading="lazy"
            >
            <div class="card-body">
              <span class="card-title">{{ post.title }}: {{ post.subtitle }}</span>
              <span v-if="showAuthor">
                by <AuthorLink :author="post.author"/>
              </span>
              <p class="card-text">{{ post.metaDescription }}</p>
              <ul class="grid-post-list-tags">
                <li v-for="tag in post.tags" :key="tag.name" class="post__tags">
                  <RouterLink :title="tag.name" :to="`/tag/${tag.name}`" aria-label="Blog Tag">#{{
                      tag.name
                    }}
                  </RouterLink>
                </li>
              </ul>
              <small class="text-muted">{{ displayableDate(post.publishDate) }}</small>
            </div>
            <span class="line-1"></span>
            <span class="line-2"></span>
            <span class="line-3"></span>
            <span class="line-4"></span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div v-else>
      <span>No Posts Found</span>
    </div>
    <BlogSidebar :authors="allAuthors" :tags="allTags"/>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import PostModel from '@/state/blog/PostModel'
import { Options, Vue } from 'vue-class-component'
import BlogSidebar from '@/components/Blog/BlogSidebar.vue'
import AuthorLink from '@/components/Blog/BlogAuthorLink.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { ImageTypeOptions, ImageFitOptions, ImagePositionOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'BlogPostList',
  components: {
    AuthorLink,
    BlogSidebar
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})

export default class BlogPostList extends Vue {
  showAuthor: boolean = false
  posts: PostModel[] = []
  ImageTypeOptions: any = ImageTypeOptions
  ImageFitOptions: any = ImageFitOptions
  ImagePositionOptions: any = ImagePositionOptions

  get publishedPosts(): PostModel[] {
    return store.getters['blog/getPublishedPosts']
  }

  get allTags(): PostModel[] {
    return store.getters['blog/getAllTags']
  }

  get allAuthors(): PostModel[] {
    return store.getters['blog/getAllAuthors']
  }

  get postsByTag(): PostModel[] {
    return store.getters['blog/getPostsByTag']
  }

  async mounted(): Promise<void> {
    await Promise.all([
      store.dispatch('blog/allTagsFromRemote'),
      store.dispatch('blog/allAuthorsFromRemote')
    ])
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

  public displayableDate(date: string): string {
    const options: any = { dateStyle: 'full', timeStyle: 'medium' }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogPostList"

</style>
