<template>
	<div class="container mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<h2>Posts in #{{ $route.params.tag }}</h2>
		<BlogPostList
			v-if="blogModule.getPostsByTag && blogModule.getPostsByTag.length > 0"
			:tags="blogModule.getTags"
			:authors="blogModule.getAuthors"
			:tips="tipModule.getTips"
			:posts="blogModule.getPostsByTag"
		/>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import TipModule from '@/State/Tip/TipModule'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import BlogPostList from '@/Components/Blog/BlogPostList.vue'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'

@Component({
	name: 'BlogPostsByTag',
	components: {
		BlogPostList,
		Breadcrumbs
	}
})
export default class BlogPostsByTag extends Vue {
	blogModule = getModule(BlogModule)
	tipModule = getModule(TipModule)

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `Posts in #${router.currentRoute.value.params.tag}`,
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
		Promise.all([
			this.blogModule.fetchPostsFromRemote(),
			this.blogModule.fetchTagsFromRemote(),
			this.blogModule.fetchAuthorsFromRemote(),
			this.blogModule.fetchCategoriesFromRemote(),
			this.tipModule.fetchTipsFromRemote()
		])
	}

	updated(): void {
		this.blogModule.fetchPostsByTagFromRemote()
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Blog/BlogPostsByTag';
</style>
