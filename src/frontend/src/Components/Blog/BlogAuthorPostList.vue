<template>
	<div class="blog-main-content">
		<div v-if="posts && Object.keys(posts).length > 0" class="grid-post-list">
			<BlogPostCard
				v-for="post in posts"
				:key="post.title"
				:post="post"
				:author="author"
				class="cardSpecialEffect"
			/>
		</div>
		<div v-else>
			<span>No Posts Found</span>
		</div>
		<BlogTagsSidebar :authors="authors" :tags="tags" />
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import BlogTagModel from '@/State/Blog/BlogTagModel'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import BlogAuthorModel from '@/State/Blog/BlogAuthorModel'
import BlogPostCard from '@/Components/Blog/BlogPostCard.vue'
import { Options as Component, Vue } from 'vue-class-component'
import BlogTagsSidebar from '@/Components/Blog/BlogTagsSidebar.vue'

@Component({
	name: 'BlogAuthorPostList',
	components: {
		BlogTagsSidebar,
		BlogPostCard
	},
	props: {
		tags: {
			type: Array as PropType<Array<BlogTagModel>>,
			required: true
		},
		authors: {
			type: Array as PropType<Array<BlogAuthorModel>>,
			required: true
		},
		posts: {
			type: Array as PropType<Array<BlogPostModel>>,
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
export default class BlogAuthorPostList extends Vue {
	showAuthor = false
	tags!: Array<BlogTagModel>
	authors!: Array<BlogAuthorModel>
	posts!: Array<BlogPostModel>
	author!: BlogAuthorModel
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Blog/BlogPostList';
</style>
