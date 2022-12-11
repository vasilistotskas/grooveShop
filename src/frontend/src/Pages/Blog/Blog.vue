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
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import TipModule from '@/State/Tip/TipModule'
import BlogModule from '@/State/Blog/BlogModule'
import { getModule } from 'vuex-module-decorators'
import InstagramFeed from '@/Utilities/InstagramFeed.vue'
import BlogPostList from '@/Components/Blog/BlogPostList.vue'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

@Component({
	name: 'Blog',
	components: {
		BlogPostList,
		Breadcrumbs,
		InstagramFeed
	}
})
export default class Blog extends Vue {
	router = useRouter()
	blogModule = getModule(BlogModule, this.$store)
	tipModule = getModule(TipModule, this.$store)

	myContext = setup(() => {
		const store = useStore()
		const blogModule = getModule(BlogModule, store)
		const tipModule = getModule(TipModule, store)

		Promise.all([
			blogModule.fetchPostsFromRemote(),
			blogModule.fetchTagsFromRemote(),
			blogModule.fetchAuthorsFromRemote(),
			blogModule.fetchCategoriesFromRemote(),
			tipModule.fetchTipsFromRemote()
		])

		const meta = useMeta(
			computed(() => ({
				title: 'Blog',
				description: 'Blog'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		return this.router.currentRoute.value.meta.breadcrumb
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Blog/Blog.scss';
</style>
