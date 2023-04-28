<script lang="ts" setup>
import { PropType } from 'vue'
import { Pagination } from '~/zod/pagination/pagination'

const props = defineProps({
	resultsCount: {
		type: Number,
		required: true,
		default: 0
	},
	totalPages: {
		type: Number,
		required: true,
		default: 1
	},
	pageTotalResults: {
		type: Number,
		required: true,
		default: 0
	},
	pageSize: {
		type: Number,
		required: true,
		default: 10
	},
	currentPage: {
		type: Number,
		required: true,
		default: 1
	},
	links: {
		type: Object as PropType<Pagination<unknown>['links']>,
		required: true
	},
	maxVisibleButtons: {
		type: Number,
		required: false,
		default: 3
	}
})

const route = useRoute()
const { t } = useLang()

const {
	resultsCount,
	totalPages,
	pageTotalResults,
	pageSize,
	currentPage,
	links,
	maxVisibleButtons
} = toRefs(props)

const firstPageNumber = computed(() => 1)
const lastPageNumber = computed(() => totalPages.value)
const startPage = computed(() => {
	if (currentPage.value === 1) {
		return 1
	}
	if (currentPage === totalPages) {
		if (totalPages.value - maxVisibleButtons.value + 1 === 0) {
			return 1
		}
		return totalPages.value - maxVisibleButtons.value + 1
	}
	return currentPage.value - 1
})

const isInFirstPage = computed(() => currentPage.value === 1)
const isInLastPage = computed(() => currentPage.value === totalPages.value)

const shouldDisplayFirstPage = computed(() => {
	return !isInFirstPage.value && currentPage.value > firstPageNumber.value + 1
})
const shouldDisplayLastPage = computed(() => {
	return !isInLastPage.value && currentPage.value < lastPageNumber.value - 1
})
const shouldDisplayPreviousTripleDots = computed(() => {
	return currentPage.value > maxVisibleButtons.value
})
const shouldDisplayNextTripleDots = computed(() => {
	return currentPage.value < totalPages.value - maxVisibleButtons.value + 1
})

const pages = computed(() => {
	const range = []
	let lastPageNumber: number
	if (totalPages < maxVisibleButtons) {
		lastPageNumber = totalPages.value
	} else {
		lastPageNumber = Math.min(
			startPage.value + maxVisibleButtons.value - 1,
			totalPages.value
		)
	}
	const startPageNumber = isInLastPage.value ? startPage.value - 1 : startPage.value
	for (let i = startPageNumber; i <= lastPageNumber; i += 1) {
		if (i === 0) continue
		range.push(i)
	}
	return range
})

const link = computed(() => {
	return route.path
})
</script>

<template>
	<div class="pagination relative">
		<ol
			v-if="totalPages > 1"
			class="pagination-ordered-list w-full flex md:grid items-center gap-4"
		>
			<li>
				<Anchor
					:to="{
						path: link,
						query: {
							page: currentPage - 1,
							ordering: route.query?.ordering
						}
					}"
					:class="{
						disabled: isInFirstPage
					}"
					:text="$t('components.pagination.previous_page')"
					:title="$t('components.pagination.previous_page')"
					:disabled="isInFirstPage"
				>
					<span class="text-gray-700 dark:text-gray-200"><IconFaSolid:angleLeft /></span>
				</Anchor>
			</li>

			<li v-if="shouldDisplayFirstPage">
				<Anchor
					:to="{
						path: link,
						query: {
							page: firstPageNumber,
							ordering: route.query?.ordering
						}
					}"
					:class="{
						'grid grid-cols-2 gap-1': shouldDisplayPreviousTripleDots,
						disabled: isInFirstPage
					}"
					:text="$t('components.pagination.first_page')"
					:title="$t('components.pagination.first_page')"
					:disabled="isInFirstPage"
				>
					<span
						:class="{
							'grid items-center justify-center w-full rounded bg-gray-200 dark:bg-gray-800 py-1 px-2 text-gray-700 dark:text-gray-200': true,
							'bg-primary-400 dark:bg-primary-400': isInFirstPage
						}"
						>{{ firstPageNumber }}</span
					>
					<span
						v-if="shouldDisplayPreviousTripleDots"
						class="grid self-end justify-self-start text-sm text-gray-700 dark:text-gray-200"
						>...</span
					>
				</Anchor>
			</li>

			<li v-for="(page, index) in pages" :key="page">
				<Anchor
					:to="{
						path: link,
						query: {
							page,
							ordering: route.query?.ordering
						}
					}"
					:class="{
						'grid items-center justify-center w-full rounded bg-gray-200 dark:bg-gray-800 py-1 px-2': true,
						'bg-primary-400 dark:bg-primary-400': page === currentPage
					}"
					:text="String(index)"
					:title="$t('components.pagination.go_to_page', { page: page })"
				>
					<span class="text-gray-700 dark:text-gray-200">{{ page }}</span>
				</Anchor>
			</li>

			<li v-if="shouldDisplayLastPage">
				<Anchor
					:to="{
						path: link,
						query: {
							page: lastPageNumber,
							ordering: route.query?.ordering
						}
					}"
					:class="{
						'grid grid-cols-2 gap-1': shouldDisplayNextTripleDots,
						disabled: isInLastPage
					}"
					:text="$t('components.pagination.last_page')"
					:title="$t('components.pagination.go_to_page', { page: lastPageNumber })"
				>
					<span
						v-if="shouldDisplayNextTripleDots"
						class="grid self-end justify-self-end text-sm text-gray-700 dark:text-gray-200"
						>...</span
					>
					<span
						:class="{
							'grid items-center justify-center w-full rounded bg-gray-200 dark:bg-gray-800 py-1 px-2 text-gray-700 dark:text-gray-200': true,
							'bg-primary-400 dark:bg-primary-400': isInLastPage
						}"
						>{{ lastPageNumber }}</span
					>
				</Anchor>
			</li>

			<li>
				<Anchor
					:to="{
						path: link,
						query: {
							page: currentPage + 1,
							ordering: route.query?.ordering
						}
					}"
					:class="{
						disabled: isInLastPage
					}"
					:text="$t('components.pagination.next_page')"
					:title="
						isInLastPage
							? $t('components.pagination.you_are_on_last_page')
							: $t('components.pagination.next_page')
					"
				>
					<span class="text-gray-700 dark:text-gray-200"><IconFaSolid:angleRight /></span>
				</Anchor>
			</li>
		</ol>
	</div>
</template>

<style lang="scss" scoped>
.pagination {
	.pagination-ordered-list {
		grid-template-columns: auto auto 1fr auto auto auto auto;
	}
}
</style>
