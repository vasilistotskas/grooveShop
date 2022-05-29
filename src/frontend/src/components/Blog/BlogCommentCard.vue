<template>
  <div
    v-if="comment && Object.keys(comment).length > 0" 
    class="blog-comments-card-container"
  >
    <div
      class="blog-comments-card-wrapper"
      :style="{ backgroundImage: commentBackgroundImage(comment) }"
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
        <span class="blog-comments-card-date-created">At : {{ comment.createdAt }} </span>
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
      v-if="comment.user.id === userId"
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
              @click="deleteComment(comment.id)"
            >Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { onClickOutside } from '@vueuse/core'
import { Options, Vue } from 'vue-class-component'
import BlogCommentModel from '@/state/blog/BlogCommentModel'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import UserProfileModel from '@/state/user/data/UserProfileModel'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'

@Options({
  name: 'BlogCommentCard',
  props: {
    comment: {
      type: Object,
      required: false
    },
    userId: {
      type: Number,
      required: false
    },
    class: {
      type: String,
      required: false
    }
  }
})

export default class BlogCommentCard extends Vue {
  MainRouteNames = MainRouteNames
  $refs!: {
    userCommentActionTarget: HTMLElement;
  }
  comment = new BlogCommentModel()
  userId: number = 0
  commentActionsOpen = true

  checkCircleIcon = faCheckCircle

  updated(): void {
    onClickOutside(this.$refs.userCommentActionTarget, () => {
      this.commentActionsOpen = false
    })
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get userData(): UserProfileModel {
    if (this.isAuthenticated) {
      return store.getters['user/getUserData']
    }
    return new UserProfileModel
  }

  public openCommentActions() {
    this.commentActionsOpen = true
  }

  public async deleteComment(comment_id: BlogCommentModel['id']): Promise<void> {
    if (confirm('Are you sure you want to delete your rating?')) {
      await store.dispatch('blog/deleteCommentFromPost', comment_id)
    }
  }

  public commentBackgroundImage(comment: BlogCommentModel): string {

    const imageNameFileTypeRemove = comment.post.mainImageFilename.substring(0, comment.post.mainImageFilename.lastIndexOf('.')) || comment.post.mainImageFilename

    if (router.currentRoute.value.name === MainRouteNames.POST) {
      return 'url(' + comment.userProfile.mainImageAbsoluteUrl + ')'
    }

    if (router.currentRoute.value.name === MainRouteNames.USER_ACCOUNT_BLOG_COMMENTS) {
      return 'url(' + 'http://localhost:8010' + '/mediastream/media/uploads/' + 'blog' + '/' + imageNameFileTypeRemove + '/' + '100' + '/' + '100' + ')'
    }

    return ''
  }

}
</script>

<style lang="scss">
@import "@/assets/styles/components/Blog/BlogCommentCard"

</style>