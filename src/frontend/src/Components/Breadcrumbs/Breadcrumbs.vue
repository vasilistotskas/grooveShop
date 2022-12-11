<template>
	<div class="container mt-2 mb-4 breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb__item">
				<RouterLink
					:to="{ name: 'Home' }"
					aria-label="Home"
					class="btn-w-effect"
					title="Home"
				>
					<span class="breadcrumb__inner">
						<span class="breadcrumb__title">Home</span>
					</span>
				</RouterLink>
				<span class="breadcrumb__seperator">/</span>
			</li>
			<li
				v-for="breadcrumb in breadCrumbPathResolve"
				:key="breadcrumb.id"
				class="breadcrumb__item"
			>
				<RouterLink
					:title="breadcrumb.name"
					:to="'/' + breadcrumb.to.full_path"
					aria-label="Blog"
					class="btn-w-effect"
				>
					<span class="breadcrumb__inner">
						<span class="breadcrumb__title">{{ breadcrumb.name }}</span>
					</span>
				</RouterLink>
				<span class="breadcrumb__seperator">/</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options as Component, Vue } from 'vue-class-component'
import {
	RouteMetaBreadcrumb,
	RouteMetaBreadcrumbFunction
} from '@/Routes/Type/BreadcrumbItemType'
import { useRouter } from 'vue-router'

@Component({
	name: 'Breadcrumbs',
	props: {
		breadCrumbPath: [Array, Function] as PropType<RouteMetaBreadcrumb>
	}
})
export default class Breadcrumbs extends Vue {
	breadCrumbPath!: RouteMetaBreadcrumb | RouteMetaBreadcrumbFunction
	router = useRouter()
	get breadCrumbPathResolve() {
		const currentRouteMetaBreadcrumb = this.router.currentRoute.value.meta.breadcrumb
		if (typeof currentRouteMetaBreadcrumb === 'function') {
			return currentRouteMetaBreadcrumb(this.router.currentRoute.value.params)
		}
		return this.breadCrumbPath
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Breadcrumbs/Breadcrumbs.scss';
</style>
