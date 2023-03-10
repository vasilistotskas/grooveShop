<script lang="ts" setup>
import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'

const store = useBreadcrumbsStore()
const { breadcrumbs } = storeToRefs(store)

const isLast = computed(
	(position: number) => breadcrumbs.value.children.length === position + 1
)
const hasChildren = computed(() => breadcrumbs.value.children.length === 0)
</script>

<template>
	<div class="cp-breadcrumbs-breadcrumbs">
		<ul v-if="!hasChildren" class="cp-breadcrumbs-breadcrumbs-itm_li">
			<li class="cp-breadcrumbs-breadcrumbs-itm">
				<Anchor
					:to="breadcrumbs.parent?.link"
					:title="breadcrumbs.parent?.text"
					css-class="cp-breadcrumbs-breadcrumbs-itm-lnk"
					><span class="cp-breadcrumbs-breadcrumbs-itm-lnk-text">{{
						breadcrumbs.parent?.text
					}}</span></Anchor
				>
			</li>
		</ul>
		<ul v-else class="cp-breadcrumbs-breadcrumbs-itm_li">
			<li
				v-for="(breadcrumb, idx) in breadcrumbs.children"
				:key="idx"
				class="cp-breadcrumbs-breadcrumbs-itm"
			>
				<Anchor
					:to="breadcrumb.link"
					:title="breadcrumb.text"
					css-class="cp-breadcrumbs-breadcrumbs-itm-lnk"
				>
					<span
						class="cp-breadcrumbs-breadcrumbs-itm-lnk-delimiter"
						v-html="breadcrumbs.delimiter"
					></span>
					<span class="cp-breadcrumbs-breadcrumbs-itm-lnk-text">{{
						breadcrumb.text
					}}</span>
				</Anchor>
			</li>
		</ul>
	</div>
</template>
