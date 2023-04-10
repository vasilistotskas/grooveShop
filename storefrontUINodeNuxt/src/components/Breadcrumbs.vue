<script lang="ts" setup>
import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'

const { t } = useLang()
const store = useBreadcrumbsStore()
const { breadcrumbs } = storeToRefs(store)

const hasChildren = computed(() => breadcrumbs.value.children.length > 0)
const resolveHeadingElement = (idx: number) => {
	const totalBreadcrumbs = breadcrumbs.value.children.length
	if (totalBreadcrumbs === 1) {
		return 'h2'
	} else if (totalBreadcrumbs === 2) {
		if (idx === 0) {
			return 'h3'
		} else {
			return 'h2'
		}
	} else if (totalBreadcrumbs === 3) {
		if (idx === 0) {
			return 'h4'
		} else if (idx === 1) {
			return 'h3'
		} else {
			return 'h2'
		}
	} else if (idx === 0) {
		return 'h5'
	} else if (idx === 1) {
		return 'h4'
	} else if (idx === 2) {
		return 'h3'
	} else {
		return 'h2'
	}
}
const resolveParentHeadingElement = computed(() => {
	const totalBreadcrumbs = breadcrumbs.value.children.length
	if (totalBreadcrumbs === 1) {
		return 'h3'
	} else if (totalBreadcrumbs === 2) {
		return 'h4'
	} else if (totalBreadcrumbs === 3) {
		return 'h5'
	} else {
		return 'h6'
	}
})
</script>

<template>
	<section v-if="hasChildren" class="cp-breadcrumbs-breadcrumbs">
		<nav class="cp-breadcrumbs-breadcrumbs-itm_li">
			<component
				:is="resolveParentHeadingElement"
				v-if="breadcrumbs.parent"
				class="cp-breadcrumbs-breadcrumbs-itm"
			>
				<Anchor
					:to="breadcrumbs.parent.link"
					:title="breadcrumbs.parent.text"
					css-class="cp-breadcrumbs-breadcrumbs-itm-lnk text-gray-700 dark:text-gray-200"
					><span class="cp-breadcrumbs-breadcrumbs-itm-lnk-text">{{
						breadcrumbs.parent.text || t('components.breadcrumbs.title')
					}}</span></Anchor
				>
			</component>
			<template v-for="(breadcrumb, idx) in breadcrumbs.children" :key="idx">
				<component
					:is="resolveHeadingElement(idx)"
					class="cp-breadcrumbs-breadcrumbs-itm"
				>
					<Anchor
						:to="breadcrumb.link"
						:title="breadcrumb.text"
						css-class="cp-breadcrumbs-breadcrumbs-itm-lnk text-gray-700 dark:text-gray-200"
					>
						<span class="cp-breadcrumbs-breadcrumbs-itm-lnk-delimiter">{{
							breadcrumbs.delimiter.replaceAll('>', '&gt;')
						}}</span>
						<span class="cp-breadcrumbs-breadcrumbs-itm-lnk-text">{{
							breadcrumb.text
						}}</span>
					</Anchor>
				</component>
			</template>
		</nav>
	</section>
	<div v-else class="cp-breadcrumbs-breadcrumbs-empty"></div>
</template>

<style lang="scss" scoped>
.cp-breadcrumbs-breadcrumbs {
	padding: 0.5rem;
	&-itm_li {
		margin: 0;
		padding-left: 2rem;
		padding-right: 2rem;
		display: flex;
		overflow-x: auto;
		flex-wrap: nowrap;
		flex-direction: row;
		align-items: center;
		list-style-type: none;
		align-content: center;
		justify-content: flex-start;
	}

	&-itm {
		padding-left: 3px;
		flex-shrink: 0;
		display: flex;
		&-lnk {
			display: grid;
			grid-template-columns: auto 1fr;
			align-items: center;
			gap: 3px;
			font-size: 12px;
			text-decoration: none;
			&:hover {
				color: white;
			}
		}
	}
	&-empty {
		height: 34px;
	}
}
</style>
