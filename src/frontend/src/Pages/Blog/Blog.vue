<template>
	<div class="container content-min-height mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<BlogPostList
			v-if="posts"
			:tags="tags"
			:authors="authors"
			:tips="tips"
			:posts="posts"
		/>
		<InstagramFeed :count="8" :pagination="false" :caption="false" :use-slider="true" />
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import TipModel from '@/State/Tip/TipModel'
import { computed } from '@vue/runtime-core'
import TipModule from '@/State/Tip/TipModule'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import BlogTagModel from '@/State/Blog/BlogTagModel'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import InstagramFeed from '@/Utilities/InstagramFeed.vue'
import BlogAuthorModel from '@/State/Blog/BlogAuthorModel'
import BlogPostList from '@/Components/Blog/BlogPostList.vue'
import BlogCategoryModel from '@/State/Blog/BlogCategoryModel'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'

@Component({
	name: 'Blog',
	components: {
		BlogPostList,
		Breadcrumbs,
		InstagramFeed
	}
})
export default class Blog extends Vue {
	blogModule = getModule(BlogModule)
	tipModule = getModule(TipModule)

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Blog',
				description: 'Blog'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}

	get posts(): Array<BlogPostModel> {
		return this.blogModule.getPosts
	}

	get tags(): Array<BlogTagModel> {
		return this.blogModule.getTags
	}

	get authors(): Array<BlogAuthorModel> {
		return this.blogModule.getAuthors
	}

	get tips(): Array<TipModel> {
		return this.tipModule.getTips
	}

	get categories(): Array<BlogCategoryModel> {
		return this.blogModule.getCategories
	}

	created(): void {
		Promise.all([
			this.blogModule.fetchPostsFromRemote(),
			this.blogModule.fetchTagsFromRemote(),
			this.blogModule.fetchAuthorsFromRemote(),
			this.blogModule.fetchCategoriesFromRemote(),
			this.tipModule.fetchTipsFromRemote()
		])
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Blog/Blog';
</style>
