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
			v-if="authorById.postSet && authorById.postSet.length > 0"
			:posts="authorById.postSet"
			:show-author="false"
			:author="authorById"
			:tags="blogModule.getTags"
			:authors="blogModule.getAuthors"
		/>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
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

	myContext = setup(() => {
		const blogModule = getModule(BlogModule)

		Promise.all([
			blogModule.fetchAuthorByIdFromRemote(),
			blogModule.fetchTagsFromRemote(),
			blogModule.fetchAuthorsFromRemote(),
			blogModule.fetchCategoriesFromRemote()
		])

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

	get displayName(): string {
		return (
			(this.authorById.user?.firstName &&
				this.authorById.user?.lastName &&
				`${this.authorById.user?.firstName} ${this.authorById.user?.lastName}`) ||
			`${this.authorById.user?.email}`
		)
	}

	updated(): void {
		this.blogModule.fetchAuthorByIdFromRemote()
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Blog/BlogAuthor.scss';
</style>
