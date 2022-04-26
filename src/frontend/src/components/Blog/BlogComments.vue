<template>
  <div
    v-if="post && Object.keys(post).length > 0"
    class="blog-comments-wrapper"
  >
    <div
      id="comments-container"
      class="blog-comments-container container-small"
    >
      <div
        v-if="shouldCommentsAppear"
        class="blog-comments-wrapper-grid"
      >
        <div class="blog-comments-container-grid">
          <BlogCommentCard
            v-if="commentByUserToPost && Object.keys(commentByUserToPost).length > 0"
            :key="commentByUserToPost.id"
            :class="{'blog-comment-card-user': commentByUserToPost.user_id == userId }"
            :comment="commentByUserToPost"
            :user-id="userId"
            class="blog-comment-card"
          />

          <BlogCommentCard
            v-for="comment in allBlogPostComments"
            :key="comment.id"
            :comment="comment"
            :class="{'blog-comments-card-user': comment.user_id == userId }"
            :user-id="userId"
            class="blog-comment-card"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BlogPostModel from '@/state/blog/BlogPostModel'
import store from '@/store'


@Options({
  name: 'BlogComments',
  components: {
    BlogCommentCard
  },
  props: {
    post: {
      type: BlogPostModel,
      required: true
    }
  }
})

export default class BlogComments extends Vue {

  post!: BlogPostModel

  get userId(): number {
    return store.getters['user/data/getUserId']
  }

  get allBlogPostComments(): Array<BlogPostModel> {
    return store.getters['blog/fetchCommentsByPost']
  }

  get commentByUserToPost(): BlogPostModel {
    return store.getters['blog/getCommentByUserToPost']
  }

  get shouldCommentsAppear(): boolean {
    return (this.allBlogPostComments && Object.keys(this.allBlogPostComments).length > 0)
        || (this.commentByUserToPost && Object.keys(this.commentByUserToPost).length > 0)
  }

}
</script>

<style lang="scss">
@import "@/assets/styles/components/Blog/BlogComments"

</style>