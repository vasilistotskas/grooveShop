<template>
  <div v-if="post && Object.keys(post).length > 0" class="blog-comments-container mt-5 mb-5">
    <div v-if="shouldCommentsAppear" class="blog-comments-wrapper container-small">
      <div class="blog-comments-content">
        <BlogCommentCard
          v-if="commentByUserToPost && Object.keys(commentByUserToPost).length > 0"
          :key="commentByUserToPost.id"
          :class="{ 'blog-comments-card-user': commentByUserToPost.user_id === userId }"
          :comment="commentByUserToPost"
          :user-id="userId"
          class="blog-comment-card"
        />

        <BlogCommentCard
          v-for="comment in allBlogPostComments"
          :key="comment.id"
          :comment="comment"
          :user-id="userId"
          class="blog-comment-card"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import BlogModule from '@/state/blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/state/user/data/UserModule'
import BlogPostModel from '@/state/blog/BlogPostModel'
import BlogCommentModel from '@/state/blog/BlogCommentModel'
import { Options as Component, Vue } from 'vue-class-component'
import BlogCommentCard from '@/components/Blog/BlogCommentCard.vue'

@Component({
  name: 'BlogComments',
  components: {
    BlogCommentCard,
  },
  props: {
    post: {
      type: Object as PropType<BlogPostModel>,
      required: true,
    },
  },
})
export default class BlogComments extends Vue {
  userModule = getModule(UserModule)
  blogModule = getModule(BlogModule)
  post!: BlogPostModel

  get userId(): number | undefined {
    return this.userModule.getUserId
  }

  get allBlogPostComments(): Array<BlogCommentModel> {
    return this.blogModule.getCommentsByPost
  }

  get commentByUserToPost(): BlogCommentModel {
    return this.blogModule.getCommentByUserToPost
  }

  get shouldCommentsAppear(): boolean {
    return (
      (this.allBlogPostComments && Object.keys(this.allBlogPostComments).length > 0) ||
      (this.commentByUserToPost && Object.keys(this.commentByUserToPost).length > 0)
    )
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/components/Blog/BlogComments';
</style>
