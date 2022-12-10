<template>
	<div class="blog-post-list-container">
		<div v-if="posts && Object.keys(posts).length > 0" class="blog-post-list-wrapper">
			<BlogPostCard
				v-for="post in posts"
				:key="post.title"
				:post="post"
				:author="post.author"
			/>
		</div>
		<div v-else>
			<span class="blog-post-list-no_posts">No Posts Found</span>
		</div>
		<TipSidebar :tips="tips" />
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import TipModel from '@/State/Tip/TipModel'
import BlogTagModel from '@/State/Blog/BlogTagModel'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import TipSidebar from '@/Components/Tip/TipSidebar.vue'
import BlogAuthorModel from '@/State/Blog/BlogAuthorModel'
import BlogPostCard from '@/Components/Blog/BlogPostCard.vue'
import { Options as Component, Vue } from 'vue-class-component'
import BlogTagsSidebar from '@/Components/Blog/BlogTagsSidebar.vue'

@Component({
	name: 'BlogPostList',
	components: {
		BlogTagsSidebar,
		TipSidebar,
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
		tips: {
			type: Array as PropType<Array<TipModel>>,
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
		}
	}
})
export default class BlogPostList extends Vue {
	showAuthor = false
	tags!: Array<BlogTagModel>
	authors!: Array<BlogAuthorModel>
	tips!: Array<TipModel>
	posts!: Array<BlogPostModel>
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Blog/BlogPostList.scss';
</style>
