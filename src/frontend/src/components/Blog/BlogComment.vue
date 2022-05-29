<template>
  <div class="blog-comment-wrapper mt-5">
    <form id="blogPostComment">
      <div class="blog-comment-container">
        <div class="blog-comment-header">
          <h1 class="blog-comment-header-title">
            Make a comment
          </h1>
          <font-awesome-icon
            :icon="writeReviewIcon"
            size="lg"
          />
        </div>
        <div class="blog-comment-body">
          <h2 class="blog-comment-body-title">
            <label
              class="blog-comment-body-label"
              for="commentTextArea"
            >
              Your Comment
            </label>
          </h2>
          <div class="blog-comment-body-textarea">
            <textarea
              id="commentTextArea"
              v-model="comment"
              class="blog-comment-body-textarea-content"
              maxlength="10000"
              placeholder="Share your experience..."
              rows="6"
            />
          </div>
        </div>
        <div class="blog-comment-footer">
          <button
            class="blog-comment-footer-btn"
            type="button"
            @click="commentHandle()"
          >
            {{ reviewButtonText }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { cloneDeep } from 'lodash'
import { useToast } from 'vue-toastification'
import { Options, Vue } from 'vue-class-component'
import BlogCommentModel from '@/state/blog/BlogCommentModel'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons/faPenSquare'

const toast = useToast()

@Options({
  name: 'BlogComment'
})

export default class BlogComment extends Vue {

  writeReviewIcon = faPenSquare
  comment: string = ''

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get reviewButtonText(): string {
    return this.userCommentToPostEmpty ? 'Post' : 'Update'
  }

  get userCommentToPostEmpty(): boolean {
    return store.getters['blog/getUserCommentToPostEmpty']
  }

  get commentByUserToPost(): BlogCommentModel {
    return store.getters['blog/getCommentByUserToPost']
  }

  async mounted(): Promise<void> {
    await this.commentModuleInitialize()
  }

  public async commentHandle(): Promise<void | string | number> {
    if (!this.isAuthenticated) {
      return toast.error('You are not logged in')
    }

    if (!this.comment) {
      return toast.error('You have to write a comment')
    }

    if (!this.userCommentToPostEmpty) {
      await store.dispatch('blog/updateCommentToPost', this.comment)
      return toast.success('Your comment has been updated')
    } else {
      await store.dispatch('blog/createCommentToPost', this.comment)
      return toast.success('Your comment has been created')
    }
  }

  public async commentModuleInitialize(): Promise<void> {
    let IsAuthenticated: boolean = store.getters['auth/isAuthenticated']

    if (!IsAuthenticated) {
      return
    }

    await store.dispatch('blog/fetchCommentByUserToPost')

    this.comment = cloneDeep(this.commentByUserToPost.content)

  }

}
</script>

<style lang="scss">
@import "@/assets/styles/components/Blog/BlogComment"

</style>