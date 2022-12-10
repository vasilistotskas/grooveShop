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
					<FontAwesomeIcon
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
		<div v-if="comment.user.id === userId" class="blog-comments-card-actions">
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
							@click="deleteComment()"
							>Delete</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { Emitter } from 'mitt'
import { inject, PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { BlogPostEvents } from '@/Emitter/Type/Blog/Events'
import BlogCommentModel from '@/State/Blog/BlogCommentModel'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import { Options as Component, Vue } from 'vue-class-component'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'

@Component({
	name: 'BlogCommentCard',
	props: {
		comment: {
			type: Object as PropType<BlogCommentModel>,
			required: false
		},
		userId: {
			type: Number,
			required: false
		},
		isAuthenticated: {
			type: Boolean,
			default: false
		}
	}
})
export default class BlogCommentCard extends Vue {
	declare $refs: {
		userCommentActionTarget: HTMLElement
	}
	MainRouteNames = MainRouteNames
	comment!: BlogCommentModel
	userId = 0
	commentActionsOpen = true
	checkCircleIcon = faCheckCircle
	isAuthenticated = false
	emitter: Emitter<BlogPostEvents> | undefined = inject('emitter')

	updated(): void {
		onClickOutside(this.$refs.userCommentActionTarget, () => {
			this.commentActionsOpen = false
		})
	}

	public openCommentActions() {
		this.commentActionsOpen = true
	}

	public deleteComment(): void {
		if (confirm('Are you sure you want to delete your rating?')) {
			this.emitter?.emit('deleteCommentFromPost')
		}
	}

	public commentBackgroundImage(comment: BlogCommentModel): string {
		const imageNameFileTypeRemove =
			comment.post.mainImageFilename.substring(
				0,
				comment.post.mainImageFilename.lastIndexOf('.')
			) || comment.post.mainImageFilename

		if (router.currentRoute.value.name === MainRouteNames.POST) {
			return 'url(' + comment.userProfile.mainImageAbsoluteUrl + ')'
		}

		if (router.currentRoute.value.name === MainRouteNames.USER_ACCOUNT_BLOG_COMMENTS) {
			return (
				'url(' +
				process.env.VITE_APP_BASE_URL +
				'/mediastream/media/uploads/' +
				'blog' +
				'/' +
				imageNameFileTypeRemove +
				'/' +
				'100' +
				'/' +
				'100' +
				')'
			)
		}

		return ''
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Components/Blog/BlogCommentCard.scss';
</style>
