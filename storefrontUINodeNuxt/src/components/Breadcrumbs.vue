<script lang="ts" setup>
import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'

const store = useBreadcrumbsStore()
const { breadcrumbs } = storeToRefs(store)

const isLast = computed(
	(position: number) => breadcrumbs.value.children.length === position + 1
)
const hasChildren = computed(() => breadcrumbs.value.children.length > 0)
const resolveHeadingElement = (idx: number) => {
	const totalBreadcrumbs = breadcrumbs.value.children.length
	if (totalBreadcrumbs === 1) {
		return 'h4'
	} else if (totalBreadcrumbs === 2) {
		if (idx === 0) {
			return 'h4'
		} else {
			return 'h3'
		}
	} else if (totalBreadcrumbs === 3) {
		if (idx === 0) {
			return 'h4'
		} else if (idx === 1) {
			return 'h3'
		} else {
			return 'h2'
		}
	} else {
		return 'h5'
	}
}
</script>

<template>
	<section class="cp-breadcrumbs-breadcrumbs">
		<nav class="cp-breadcrumbs-breadcrumbs-itm_li">
			<component
				:is="'h5'"
				v-if="breadcrumbs.parent"
				class="cp-breadcrumbs-breadcrumbs-itm"
			>
				<Anchor
					:to="breadcrumbs.parent.link"
					:title="breadcrumbs.parent.text"
					css-class="cp-breadcrumbs-breadcrumbs-itm-lnk"
					><span class="cp-breadcrumbs-breadcrumbs-itm-lnk-text">{{
						breadcrumbs.parent.text || $t('components.breadcrumbs.title')
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
						css-class="cp-breadcrumbs-breadcrumbs-itm-lnk"
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
</template>

<style lang="scss" scoped>
.cp-breadcrumbs-breadcrumbs {
	&-itm_li {
		margin: 0;
		padding: 0;
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
			font-size: 12px;
			text-decoration: none;
			color: gray;
			&:hover {
				color: black;
			}
		}
	}
}
</style>
