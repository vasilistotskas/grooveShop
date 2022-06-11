<template>
  <RouterLink
    v-if="post && Object.keys(post).length > 0"
    :title="post.slug"
    :to="`/post/${post.slug}`"
    class="cardSpecialEffect"
    aria-label="Blog Post"
  >
    <div class="card blog-card">
      <GrooveImage
        :alt="post.title"
        :file-name="post.mainImageFilename"
        :use-media-stream="true"
        :img-type="ImageTypeOptions.BLOG"
        :img-height="268"
        :img-width="462"
      />
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
        <small class="text-muted">{{ myContext.displayableDate(post.publishDate) }}</small>
      </div>
      <span class="line-1" />
      <span class="line-2" />
      <span class="line-3" />
      <span class="line-4" />
    </div>
  </RouterLink>
</template>

<script lang="ts">
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogSidebar from '@/components/Blog/BlogSidebar.vue'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import BlogAuthorLink from '@/components/Blog/BlogAuthorLink.vue'
import { Vue, setup, Options as Component} from 'vue-class-component'
import { ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Component({
  name: 'BlogPostCard',
  components: {
    BlogAuthorLink,
    BlogSidebar,
    GrooveImage
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

  myContext = setup(() => {
    const displayableDate = (date:string) => {
      const options: any = { dateStyle: 'full', timeStyle: 'medium' }
      return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
    }
    return {
      displayableDate
    }
  })

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogPostList"

</style>
