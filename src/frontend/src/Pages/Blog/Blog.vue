<template>
	<div class="container content-min-height mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<BlogPostList
			v-if="blogModule.getPosts && blogModule.getPosts.length > 0"
			:tags="blogModule.getTags"
			:authors="blogModule.getAuthors"
			:tips="tipModule.getTips"
			:posts="blogModule.getPosts"
		/>
		<InstagramFeed :count="8" :pagination="false" :caption="false" :use-slider="true" />
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import TipModule from '@/State/Tip/TipModule'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import InstagramFeed from '@/Utilities/InstagramFeed.vue'
import BlogPostList from '@/Components/Blog/BlogPostList.vue'
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
