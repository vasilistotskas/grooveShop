<template>
	<div v-if="authorById" class="container mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<h2>{{ displayName }}</h2>
		<a
			:href="authorById.website"
			:title="`Visit Website of ${displayName}`"
			rel="noopener noreferrer"
			target="_blank"
			>Website</a
		>
		<p>{{ authorById.bio }}</p>

		<h3>Posts by {{ displayName }}</h3>
		<BlogAuthorPostList
			v-if="authorPostSet"
			:posts="authorPostSet"
			:show-author="false"
			:author="authorById"
			:tags="tags"
			:authors="authors"
		/>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import BlogTagModel from '@/State/Blog/BlogTagModel'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import BlogAuthorModel from '@/State/Blog/BlogAuthorModel'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import BlogAuthorPostList from '@/Components/Blog/BlogAuthorPostList.vue'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'

@Component({
	name: 'BlogAuthor',
	components: {
		BlogAuthorPostList,
		Breadcrumbs
	}
})
export default class BlogAuthor extends Vue {
	blogModule = getModule(BlogModule)

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: this.displayName || 'Blog Author',
				description: 'Blog Author'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		const currentRouteMetaBreadcrumb = router.currentRoute.value.meta
			.breadcrumb as RouteMetaBreadcrumbFunction
		return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
	}

	get authorById(): BlogAuthorModel {
		return this.blogModule.getAuthorById
	}

	get authorPostSet(): Array<BlogPostModel> {
		return this.authorById.postSet
	}

	get tags(): Array<BlogTagModel> {
		return this.blogModule.getTags
	}

	get authors(): Array<BlogAuthorModel> {
		return this.blogModule.getAuthors
	}

	get displayName(): string {
		return (
			(this.authorById.user?.firstName &&
				this.authorById.user?.lastName &&
				`${this.authorById.user?.firstName} ${this.authorById.user?.lastName}`) ||
			`${this.authorById.user?.email}`
		)
	}

	created(): void {
		Promise.all([
			this.blogModule.fetchAuthorByIdFromRemote(),
			this.blogModule.fetchTagsFromRemote(),
			this.blogModule.fetchAuthorsFromRemote(),
			this.blogModule.fetchCategoriesFromRemote()
		])
	}

	updated(): void {
		this.blogModule.fetchAuthorByIdFromRemote()
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Blog/BlogAuthor';
</style>
