<template>
	<div v-if="post && Object.keys(post).length > 0" class="blog-post-card-container">
		<div class="blog-post-card-wrapper">
			<RouterLink
				:title="post.slug"
				:to="`/post/${post.slug}`"
				class="blog-post-card-link"
				aria-label="Blog Post"
			>
				<GrooveImage
					:alt="post.title"
					:file-name="post.mainImageFilename"
					:use-media-stream="true"
					:img-class="'Blog-post-card-image'"
					:img-type="ImageTypeOptions.BLOG"
					:img-height="500"
					:img-width="900"
					:img-fit="ImageFitOptions.fill"
					:img-position="ImagePositionOptions.center"
				/>
				<div class="blog-post-card-body">
					<span v-if="showAuthor" class="blog-post-card-body-author">
						by <BlogAuthorLink :author="author" />
					</span>
					<span class="blog-post-card-body-title">{{ post.title }}</span>
					<p
						class="blog-post-card-body-description"
						v-html="myContext.contentShorten(post.body)"
					></p>
					<ul class="blog-post-card-body-tags" v-if="post.tags.length > 0">
						<li v-for="tag in post.tags" :key="tag.name" class="blog-post-card-body-tag">
							<RouterLink
								:title="tag.name"
								:to="`/tag/${tag.name}`"
								class="blog-post-card-body-tag-link"
								aria-label="Blog Tag"
							>
								<span class="blog-post-card-body-tag-name"> #{{ tag.name }} </span>
							</RouterLink>
						</li>
					</ul>
				</div>
			</RouterLink>
			<div class="blog-post-card-body-actions">
				<div class="blog-post-card-body-actions-like">
					<FavouriteButton
						btn-class="blog-post-card-body-actions-like-btn"
						:model="post"
						:module="blogModule"
						:dispatch-type="'toggleFavourite'"
					/>
					<span class="blog-post-card-body-actions-like-count">609</span>
				</div>

				<div class="blog-post-card-body-actions-comment">
					<FontAwesomeIcon
						:style="{ color: 'rgba(200,60,60,0.79)' }"
						:icon="commentIcon"
					/>
					<span class="blog-post-card-body-actions-comment-count">120</span>
				</div>
				<div class="blog-post-card-body-actions-share">
					<span class="blog-post-card-body-actions-share-text" @click="openShareModal()">
						SHARE
					</span>
					<GenericModal
						:unique-id="`postActionModal${post.id}`"
						:ref="`postActionModal${post.id}`"
					>
						<BlogShareActions :post="post" />
					</GenericModal>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	ImageFitOptions,
	ImagePositionOptions,
	ImageTypeOptions
} from '@/Helpers/MediaStream/ImageUrlEnum'
import { PropType } from 'vue'
import { helpers } from '@/Helpers/main'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import GenericModal from '@/Utilities/GenericModal.vue'
import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import BlogAuthorModel from '@/State/Blog/BlogAuthorModel'
import FavouriteButton from '@/Utilities/FavouriteButton.vue'
import BlogAuthorLink from '@/Components/Blog/BlogAuthorLink.vue'
import BlogTagsSidebar from '@/Components/Blog/BlogTagsSidebar.vue'
import BlogShareActions from '@/Components/Blog/BlogShareActions.vue'
import { Vue, setup, Options as Component } from 'vue-class-component'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots'

@Component({
	name: 'BlogPostCard',
	components: {
		BlogAuthorLink,
		BlogTagsSidebar,
		GrooveImage,
		FavouriteButton,
		BlogShareActions,
		GenericModal
	},
	props: {
		post: {
			type: Object as PropType<BlogPostModel>,
			required: true
		},
		showAuthor: {
			type: Boolean,
			required: false,
			default: true
		},
		author: {
			type: Object as PropType<BlogAuthorModel>,
			required: false
		}
	}
})
export default class BlogPostCard extends Vue {
	declare $refs
	blogModule = getModule(BlogModule, this.$store)
	ImageFitOptions = ImageFitOptions
	ImagePositionOptions = ImagePositionOptions
	post!: BlogPostModel
	showAuthor = false
	author!: BlogAuthorModel
	ImageTypeOptions = ImageTypeOptions
	commentIcon = faCommentDots

	myContext = setup(() => {
		const displayableDate = (date: string) => {
			const options: DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'medium' }
			return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
		}

		const contentShorten = (productName: string) => {
			return helpers.contentShorten(productName, 0, 120)
		}

		return {
			displayableDate,
			contentShorten
		}
	})

	public openShareModal(): void {
		this.$refs[`postActionModal${this.post.id}`].openModal()
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Blog/BlogPostCard.scss';
</style>
