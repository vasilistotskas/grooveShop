<template>
  <div
    v-if="comment && Object.keys(comment).length > 0"
    :style="{ backgroundImage: commentBackgroundImage(comment) }"
    class="blog-comments-card-wrapper"
  />
  <div class="blog-comments-card-head">
    <div class="blog-comments-card-name">
      <RouterLink
        :title="comment.post.slug"
        :to="`/post/${comment.post.slug}`"
        aria-label="Blog Post"
        class="blog-comments-card-link"
      >
        <span class="blog-comments-card-name-title"> {{ comment.post.title }}</span>
      </RouterLink>
    </div>
    <div class="blog-comments-card-date">
      <span class="blog-comments-card-date-created">At : {{ comment.created_at }} </span>
      <span class="blog-comments-card-date-title">
        <font-awesome-icon
          :icon="checkCircleIcon"
          :style="{ color: '#53e24aeb' }"
          size="sm"
        />
        Verified Comment
      </span>
    </div>
  </div>
  <div class="blog-comments-card-body">
    <div class="blog-comments-card-comment">
      <span> {{ comment.content }} </span>
    </div>
  </div>
  <div
    v-if="comment.user.id == userId"
    class="blog-comments-card-actions"
  >
    <a
      :title="`Comment Settings of ${comment.post.title}`"
      class="blog-comments-card-actions-settings"
      @click="openCommentActions"
    />
    <div
      v-if="commentActionsOpen"
      ref="userCommentActionTarget"
      class="blog-comments-card-actions-menu"
    >
      <div class="blog-comments-card-actions-controls">
        <div class="blog-comments-card-actions-edit">
          <RouterLink
            :title="comment.post.slug"
            :to="`/post/${comment.post.slug}`"
            aria-label="Blog Post"
          >
            <span>Update</span>
          </RouterLink>
        </div>
        <div class="blog-comments-card-actions-delete">
          <a
            :title="`Delete Comment of ${comment.post.title}`"
            data-method="delete"
            rel="nofollow"
            @click="deleteComment(comment.user.id, comment.post.id)"
          >Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { constant, times } from 'lodash'
import { onClickOutside } from '@vueuse/core'
import { Options, Vue } from 'vue-class-component'
import BlogCommentModel from '@/state/blog/BlogCommentModel'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Options({
  name: 'BlogCommentCard',
  props: {
    comment: {
      type: BlogCommentModel,
      required: false
    },
    userId: {
      type: Number,
      required: false
    }
  }
})

export default class BlogCommentCard extends Vue {

  $refs!: {
    userCommentActionTarget: HTMLElement;
  }
  comment = new BlogCommentModel()
  userId: number = 0
  commentActionsOpen = false

  checkCircleIcon = faCheckCircle

  updated(): void {
    onClickOutside(this.$refs.userCommentActionTarget, () => {
      this.commentActionsOpen = false
    })
  }

  public openCommentActions() {
    this.commentActionsOpen = true
  }

  public commentBackgroundImage(comment: BlogCommentModel): string {

    const imageNameFileTypeRemove = comment.post.mainImageFilename.substring(0, comment.post.mainImageFilename.lastIndexOf('.')) || comment.post.mainImageFilename

    if (router.currentRoute.value.name === 'Post') {
      return 'url(' + comment.user.main_image_absolute_url + ')'
    }

    if (router.currentRoute.value.name === 'Comments') {
      return 'url(' + 'http://localhost:8010' + '/mediastream/media/uploads/' + 'products' + '/' + imageNameFileTypeRemove + '/' + '100' + '/' + '100' + ')'
    }

    return ''
  }

  public async deleteReview(comment_id: BlogCommentModel['id']): Promise<void> {
    if (confirm('Are you sure you want to delete your rating?')) {
      await store.dispatch('blog/deleteCommentToPost', comment_id)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/components/Blog/BlogCommentCard"

</style>