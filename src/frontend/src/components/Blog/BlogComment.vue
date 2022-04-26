<template>
  <div class="blog-comment-wrapper">
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
            <label for="commentTextArea">
              Your Comment
            </label>
          </h2>
          <div class="blog-comment-body-textarea">
            <textarea
              id="commentTextArea"
              v-model="comment"
              maxlength="10000"
              placeholder="Share your experience..."
              rows="6"
            />
          </div>
        </div>
        <div class="blog-comment-footer">
          <button
            class="btn-outline-primary-one"
            type="button"
            @click="reviewHandle()"
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
import { useToast } from 'vue-toastification'
import { Options, Vue } from 'vue-class-component'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons/faPenSquare'

const toast = useToast()

@Options({
  name: 'BlogComment'
})

export default class BlogComment extends Vue {

  writeReviewIcon = faPenSquare
  comment: string = ''

  public async reviewHandle(): Promise<void | string | number> {
    if (this.comment) {
      await store.dispatch('blog/createCommentToPost', this.comment)
    } else {
      return toast.error('You have to write a comment')
    }
  }

  get reviewButtonText(): string {
    return this.userHasAlreadyCommentedPost ? 'Update' : 'Post'
  }

  get userHasAlreadyCommentedPost(): boolean {
    return store.getters['blog/getUserHasAlreadyCommentedPost']
  }

}
</script>

<style lang="scss">
@import "@/assets/styles/components/Blog/BlogComment"

</style>