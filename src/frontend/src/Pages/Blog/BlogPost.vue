<template>
	<div
		v-if="blogModule.getPostBySlug && Object.keys(blogModule.getPostBySlug).length > 0"
		class="container mt-7 mb-5"
	>
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div class="card mb-3">
			<GrooveImage
				:alt="blogModule.getPostBySlug.title"
				:file-name="blogModule.getPostBySlug.mainImageFilename"
				:use-media-stream="true"
				:img-type="ImageTypeOptions.BLOG"
				:img-width="300"
				:img-height="550"
			/>
			<div class="card-body">
				<span class="card-title"
					>{{ blogModule.getPostBySlug.title }}:
					{{ blogModule.getPostBySlug.subtitle }}</span
				>
				By
				<BlogAuthorLink :author="blogModule.getPostBySlug.author" />
				<p class="card-text">
					{{ blogModule.getPostBySlug.metaDescription }}
				</p>
				<p class="card-text" v-html="blogModule.getPostBySlug.body" />
				<p class="card-text">
					<small class="text-muted">{{
						displayableDate(blogModule.getPostBySlug.publishedAt)
					}}</small>
				</p>
				<ul>
					<li
						v-for="tag in blogModule.getPostBySlug.tags"
						:key="tag.name"
						class="post__tags"
					>
						<RouterLink :title="tag.name" :to="`/tag/${tag.name}`" aria-label="Blog Tag">
							#{{ tag.name }}
						</RouterLink>
					</li>
				</ul>
			</div>
			<div class="favourite-button-content">
				<FavouriteButton
					:model="blogModule.getPostBySlug"
					:module="blogModule"
					:getter-type="'getIsCurrentPostInUserFavourites'"
					:getter-params="{ userEmail: userModule.getUserData.email }"
					:dispatch-type="'toggleFavourite'"
					:dispatch-params="{
						postId: blogModule.getPostBySlug.id,
						userId: userModule.getUserData.id
					}"
					:use-store="true"
				/>
			</div>
		</div>
		<BlogComment
			:is-authenticated="authModule.isAuthenticated"
			:user-comment-to-post-empty="blogModule.getUserCommentToPostEmpty"
			:comment-by-user-to-post="blogModule.getCommentByUserToPost"
		/>
	</div>
	<BlogComments
		v-if="blogModule.getPostBySlug && Object.keys(blogModule.getPostBySlug).length > 0"
		:post="blogModule.getPostBySlug"
		:user-id="userModule.getUserData.id"
		:blog-post-comments="blogModule.getCommentsByPost"
		:comment-by-user-to-post="blogModule.getCommentByUserToPost"
		:is-authenticated="authModule.isAuthenticated"
	/>
</template>

<script lang="ts">
import { inject } from 'vue'
import router from '@/Routes'
import { Emitter } from 'mitt'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import UserModule from '@/State/User/Profile/UserModule'
import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import { BlogPostEvents } from '@/Emitter/Type/Blog/Events'
import BlogComment from '@/Components/Blog/BlogComment.vue'
import FavouriteButton from '@/Utilities/FavouriteButton.vue'
import BlogComments from '@/Components/Blog/BlogComments.vue'
import BlogAuthorLink from '@/Components/Blog/BlogAuthorLink.vue'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { ImageTypeOptions } from '@/Helpers/MediaStream/ImageUrlEnum'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'

@Component({
	name: 'BlogPost',
	components: {
		BlogAuthorLink,
		Breadcrumbs,
		BlogComment,
		BlogComments,
		GrooveImage,
		FavouriteButton
	},
	props: {
		slug: {
			type: String,
			required: true
		}
	}
})
export default class BlogPost extends Vue {
	blogModule = getModule(BlogModule)
	authModule = getModule(AuthModule)
	userModule = getModule(UserModule)
	ImageTypeOptions = ImageTypeOptions
	emitter: Emitter<BlogPostEvents> | undefined = inject('emitter')

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: this.blogModule.getPostBySlug?.title,
				description: 'Blog Post'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		const currentRouteMetaBreadcrumb = router.currentRoute.value.meta
			.breadcrumb as RouteMetaBreadcrumbFunction
		return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
	}

	created(): void {
		this.blogModule.fetchPostBySlugFromRemote()
		this.blogModule.fetchCommentsByPost()
		if (this.authModule.isAuthenticated) {
			this.blogModule.fetchCommentByUserToPost(this.userModule.getUserData.email)
		}

		this.emitter?.on('updateCommentToPost', (e) => this.blogModule.updateCommentToPost(e))
		this.emitter?.on('createCommentToPost', (e) => {
			const payload = {
				content: e.content,
				userEmail: this.userModule.getUserData.email
			}
			return this.blogModule.createCommentToPost(payload)
		})
		this.emitter?.on('fetchCommentByUserToPost', () =>
			this.blogModule.fetchCommentByUserToPost(this.userModule.getUserData.email)
		)
		this.emitter?.on('deleteCommentFromPost', () =>
			this.blogModule.deleteCommentFromPost()
		)
	}

	unmounted(): void {
		this.blogModule.clearPostData()
	}

	public displayableDate(date: string): string {
		const options: DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'medium' }
		return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
	}
}
</script>
<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Blog/BlogPost';
</style>
