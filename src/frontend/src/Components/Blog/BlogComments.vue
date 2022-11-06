<template>
	<div
		v-if="post && Object.keys(post).length > 0"
		class="blog-comments-container mt-5 mb-5"
	>
		<div v-if="shouldCommentsAppear" class="blog-comments-wrapper container-small">
			<div class="blog-comments-content">
				<BlogCommentCard
					v-if="commentByUserToPost && Object.keys(commentByUserToPost).length > 0"
					:key="commentByUserToPost.id"
					:class="commentByUserToPost.user.id === userId ? 'blog-comments-card-user' : ''"
					:comment="commentByUserToPost"
					:user-id="userId"
					:is-authenticated="isAuthenticated"
					class="blog-comment-card"
				/>

				<BlogCommentCard
					v-for="comment in blogPostComments"
					:key="comment.id"
					:comment="comment"
					:user-id="userId"
					:is-authenticated="isAuthenticated"
					class="blog-comment-card"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import BlogCommentModel from '@/State/Blog/BlogCommentModel'
import { Options as Component, Vue } from 'vue-class-component'
import BlogCommentCard from '@/Components/Blog/BlogCommentCard.vue'

@Component({
	name: 'BlogComments',
	components: {
		BlogCommentCard
	},
	props: {
		post: {
			type: Object as PropType<BlogPostModel>,
			required: true
		},
		userId: {
			type: Number
		},
		blogPostComments: {
			type: Array as PropType<Array<BlogCommentModel>>,
			required: true
		},
		commentByUserToPost: {
			type: Object as PropType<BlogCommentModel>
		},
		isAuthenticated: {
			type: Boolean,
			default: false
		}
	}
})
export default class BlogComments extends Vue {
	post!: BlogPostModel
	userId!: number
	blogPostComments!: Array<BlogCommentModel>
	commentByUserToPost!: BlogCommentModel
	isAuthenticated = false

	get shouldCommentsAppear(): boolean {
		return (
			(this.blogPostComments && Object.keys(this.blogPostComments).length > 0) ||
			(this.commentByUserToPost && Object.keys(this.commentByUserToPost).length > 0)
		)
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Components/Blog/BlogComments';
</style>
