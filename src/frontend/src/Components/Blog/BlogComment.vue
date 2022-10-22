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
import { cloneDeep } from 'lodash'
import { useToast } from 'vue-toastification'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import BlogCommentModel from '@/State/Blog/BlogCommentModel'
import { Options as Component, Vue } from 'vue-class-component'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons/faPenSquare'

const toast = useToast()

@Component({
	name: 'BlogComment'
})
export default class BlogComment extends Vue {
	blogModule = getModule(BlogModule)
	authModule = getModule(AuthModule)
	userModule = getModule(UserModule)
	writeReviewIcon = faPenSquare
	comment = ''

	get isAuthenticated(): boolean {
		return this.authModule.isAuthenticated
	}

	get reviewButtonText(): string {
		return this.userCommentToPostEmpty ? 'Post' : 'Update'
	}

	get userCommentToPostEmpty(): boolean {
		return this.blogModule.getUserCommentToPostEmpty
	}

	get commentByUserToPost(): BlogCommentModel {
		return this.blogModule.getCommentByUserToPost
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
			this.blogModule.updateCommentToPost(this.comment)
			return toast.success('Your comment has been updated')
		} else {
			this.blogModule.createCommentToPost({
				content: this.comment,
				userEmail: this.userModule.getUserData.email
			})
			return toast.success('Your comment has been created')
		}
	}

	public commentModuleInitialize(): void {
		if (this.isAuthenticated) {
			return
		}
		this.blogModule.fetchCommentByUserToPost(this.userModule.getUserData.email)
		this.comment = cloneDeep(this.commentByUserToPost.content)
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Components/Blog/BlogComment';
</style>
