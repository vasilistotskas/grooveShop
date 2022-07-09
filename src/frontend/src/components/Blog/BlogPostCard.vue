<template>
  <div v-if="post && Object.keys(post).length > 0" class="blog-post-card-container">
    <div class="blog-post-card-wrapper">
      <RouterLink :title="post.slug" :to="`/post/${post.slug}`" class="blog-post-card-link" aria-label="Blog Post">
        <GrooveImage
          :alt="post.title"
          :file-name="post.mainImageFilename"
          :use-media-stream="true"
          :img-class="'blog-post-card-image'"
          :img-type="ImageTypeOptions.BLOG"
          :img-height="500"
          :img-width="900"
          :img-fit="ImageFitOptions.fill"
          :img-position="ImagePositionOptions.center"
        />
        <div class="blog-post-card-body">
          <span v-if="showAuthor" class="blog-post-card-body-author"> by <BlogAuthorLink :author="author" /> </span>
          <span class="blog-post-card-body-title">{{ post.title }}</span>
          <p class="blog-post-card-body-description" v-html="myContext.contentShorten(post.body)"></p>
          <!--          <ul class="blog-post-card-body-tags" v-if="post.tags.length > 0">-->
          <!--            <li v-for="tag in post.tags" :key="tag.name" class="blog-post-card-body-tag">-->
          <!--              <RouterLink :title="tag.name" :to="`/tag/${tag.name}`" class="blog-post-card-body-tag-link" aria-label="Blog Tag">-->
          <!--                <span class="blog-post-card-body-tag-name"> #{{ tag.name }} </span>-->
          <!--              </RouterLink>-->
          <!--            </li>-->
          <!--          </ul>-->
        </div>
      </RouterLink>
      <div class="blog-post-card-body-actions">
        <div class="blog-post-card-body-actions-like">
          <FavouriteButton btn-class="blog-post-card-body-actions-like-btn" :model="post" :dispatch-type="'blog/toggleFavourite'" />
          <span class="blog-post-card-body-actions-like-count">609</span>
        </div>

        <div class="blog-post-card-body-actions-comment">
          <font-awesome-icon :icon="commentIcon" />
          <span class="blog-post-card-body-actions-comment-count">120</span>
        </div>
        <div class="blog-post-card-body-actions-share">
          <span class="blog-post-card-body-actions-share-text" @click="$refs[`postActionModal${post.id}`].openModal()"> SHARE </span>
          <GenericModal :unique-id="`postActionModal${post.id}`" :ref="`postActionModal${post.id}`">
            <BlogShareActions :post="post" />
          </GenericModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import BlogPostModel from '@/state/blog/BlogPostModel'
import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import BlogAuthorLink from '@/components/Blog/BlogAuthorLink.vue'
import GenericModal from '@/components/Utilities/GenericModal.vue'
import BlogTagsSidebar from '@/components/Blog/BlogTagsSidebar.vue'
import BlogShareActions from '@/components/Blog/BlogShareActions.vue'
import { Vue, setup, Options as Component } from 'vue-class-component'
import FavouriteButton from '@/components/Utilities/FavouriteButton.vue'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots'
import { ImageFitOptions, ImageFormatOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'
import { helpers } from '@/helpers/main'

@Component({
  name: 'BlogPostCard',
  components: {
    BlogAuthorLink,
    BlogTagsSidebar,
    GrooveImage,
    FavouriteButton,
    BlogShareActions,
    GenericModal,
  },
  props: {
    post: {
      type: Object as PropType<BlogPostModel>,
      required: true,
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true,
    },
    author: {
      type: Object,
      required: false,
    },
  },
})
export default class BlogPostCard extends Vue {
  ImageFormatOptions = ImageFormatOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions
  post = new BlogPostModel()
  showAuthor = false
  author!: object
  ImageTypeOptions = ImageTypeOptions
  commentIcon = faCommentDots

  myContext = setup(() => {
    const displayableDate = (date: string) => {
      const options: DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'medium' }
      return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
    }

    const contentShorten = (productName: string) => {
      return helpers.contentShorten(productName, 0, 120)
    }

    return {
      displayableDate,
      contentShorten,
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Blog/BlogPostCard';
</style>
