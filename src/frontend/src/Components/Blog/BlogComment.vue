<template>
	<div class="blog-comment-wrapper mt-5">
		<form id="blogPostComment">
			<div class="blog-comment-container">
				<div class="blog-comment-header">
					<h1 class="blog-comment-header-title">Make a comment</h1>
					<font-awesome-icon :icon="writeReviewIcon" size="lg" />
				</div>
				<div class="blog-comment-body">
					<h2 class="blog-comment-body-title">
						<label class="blog-comment-body-label" for="commentTextArea">
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
					<button class="blog-comment-footer-btn" type="button" @click="commentHandle()">
						{{ reviewButtonText }}
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { Emitter } from 'mitt'
import { cloneDeep } from 'lodash'
import { inject, PropType } from 'vue'
import { useToast } from 'vue-toastification'
import { BlogPostEvents } from '@/Emitter/Type/Blog/Events'
import BlogCommentModel from '@/State/Blog/BlogCommentModel'
import { Options as Component, Vue } from 'vue-class-component'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons/faPenSquare'

const toast = useToast()

@Component({
	name: 'BlogComment',
	props: {
		isAuthenticated: {
			type: Boolean,
			default: false
		},
		userCommentToPostEmpty: {
			type: Boolean,
			default: true
		},
		commentByUserToPost: {
			type: BlogCommentModel as PropType<BlogCommentModel>
		}
	}
})
export default class BlogComment extends Vue {
	isAuthenticated = false
	userCommentToPostEmpty = true
	commentByUserToPost!: BlogCommentModel
	writeReviewIcon = faPenSquare
	comment = ''
	emitter: Emitter<BlogPostEvents> | undefined = inject('emitter')

	get reviewButtonText(): string {
		return this.userCommentToPostEmpty ? 'Post' : 'Update'
	}

	mounted(): void {
		this.commentModuleInitialize()
	}

	public commentHandle(): string | number {
		if (!this.isAuthenticated) {
			return toast.error('You are not logged in')
		}

		if (!this.comment) {
			return toast.error('You have to write a comment')
		}

		if (!this.userCommentToPostEmpty) {
			this.emitter?.emit('updateCommentToPost', this.comment)
			return toast.success('Your comment has been updated')
		} else {
			this.emitter?.emit('createCommentToPost', {
				content: this.comment
			})
			return toast.success('Your comment has been created')
		}
	}

	public commentModuleInitialize(): void {
		if (this.isAuthenticated) {
			return
		}
		this.emitter?.emit('fetchCommentByUserToPost')
		this.comment = cloneDeep(this.commentByUserToPost.content)
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Components/Blog/BlogComment';
</style>
