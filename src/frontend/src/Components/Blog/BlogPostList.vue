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
		<TipSidebar :all-tips="allTips" />

		<!--    <BlogTagsSidebar-->
		<!--      :authors="allAuthors"-->
		<!--      :tags="allTags"-->
		<!--    />-->
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import TipModel from '@/State/Tip/TipModel'
import TipModule from '@/State/Tip/TipModule'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
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
	blogModule = getModule(BlogModule)
	tipModule = getModule(TipModule)
	showAuthor = false
	posts: Array<BlogPostModel> = []

	get allTags(): Array<BlogTagModel> {
		return this.blogModule.getAllTags
	}

	get allAuthors(): Array<BlogAuthorModel> {
		return this.blogModule.getAllAuthors
	}

	get allTips(): Array<TipModel> {
		return this.tipModule.getAllTips
	}

	mounted(): void {
		Promise.all([
			this.blogModule.fetchAllTagsFromRemote(),
			this.blogModule.fetchAllAuthorsFromRemote(),
			this.blogModule.fetchAllCategoriesFromRemote(),
			this.tipModule.fetchAllTipsFromRemote()
		])
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Blog/BlogPostList';
</style>
