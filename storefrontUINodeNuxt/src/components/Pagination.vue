<script lang="ts" setup>
const route = useRoute()

const props = defineProps({
	totalPages: {
		type: Number,
		required: true
	},
	currentPage: {
		type: Number,
		required: true
	},
	offset: {
		type: Number,
		required: true
	},
	limit: {
		type: Number,
		required: true
	},
	paginationUrls: {
		type: Object,
		required: true
	},
	maxVisibleButtons: {
		type: Number,
		required: false,
		default: 3
	},
	eventBusId: {
		type: String,
		required: true
	},
	eventName: {
		type: String,
		required: true
	},
	applyPaginationQuery: {
		type: Boolean,
		required: false,
		default: true
	}
})

const {
	totalPages,
	currentPage,
	offset,
	limit,
	paginationUrls,
	eventBusId,
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
		range.push(i)
	}
	return range
})

const link = computed(() => {
	return route.path
})

const bus = useEventBus<string>(eventBusId.value)
</script>

<template>
	<div class="pagination relative">
		<ol
			v-if="totalPages > 1 && totalPages > maxVisibleButtons"
			class="pagination-ordered-list w-full grid items-center gap-4"
		>
			<li>
				<Anchor
					:to="{
						path: link,
						query: { limit, offset: isInFirstPage ? offset : offset - limit }
					}"
					:class="{
						disabled: isInFirstPage
					}"
					:href="`${link}?limit=${limit}&offset=${offset - limit}`"
					:text="'Previous Page'"
					:title="'Previous Page'"
					:disabled="isInFirstPage"
					@click="
						applyPaginationQuery &&
							bus.emit(eventName, { limit: limit, offset: offset - limit })
					"
				>
					<span class="text-gray-700 dark:text-gray-200"
						><icon-fa-solid:angle-left
					/></span>
				</Anchor>
			</li>

			<li v-if="shouldDisplayFirstPage">
				<Anchor
					:to="{ path: link, query: { limit, offset: 0 } }"
					:class="{
						'grid grid-cols-2 gap-1': shouldDisplayPreviousTripleDots,
						disabled: isInFirstPage
					}"
					:href="`${link}?limit=${limit}&offset=0`"
					:text="'First Page'"
					:title="'First Page'"
					:disabled="isInFirstPage"
					@click="
						applyPaginationQuery && bus.emit(eventName, { limit: limit, offset: 0 })
					"
				>
					<span
						:class="{
							'grid items-center justify-center w-full rounded bg-gray-800 dark:bg-gray-800 py-1 px-2 text-gray-700 dark:text-gray-200': true,
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
					:to="{ path: link, query: { limit, offset: (page - 1) * limit } }"
					:class="{
						'grid items-center justify-center w-full rounded bg-gray-800 dark:bg-gray-800 py-1 px-2': true,
						'bg-primary-400 dark:bg-primary-400': page === currentPage
					}"
					:href="`${link}?limit=${limit}&offset=${(page - 1) * limit}`"
					:text="String(index)"
					:title="`Go to page ${page}`"
					@click="
						applyPaginationQuery &&
							bus.emit(eventName, { limit: limit, offset: (page - 1) * limit })
					"
				>
					<span class="text-gray-700 dark:text-gray-200">{{ page }}</span>
				</Anchor>
			</li>

			<li v-if="shouldDisplayLastPage">
				<Anchor
					:to="{ path: link, query: { limit, offset: (totalPages - 1) * limit } }"
					:class="{
						'grid grid-cols-2 gap-1': shouldDisplayNextTripleDots,
						disabled: isInLastPage
					}"
					:href="`${link}?limit=${limit}&offset=${(totalPages - 1) * limit}`"
					:text="'Last Page'"
					:title="`Go to last page (${lastPageNumber})`"
					@click="
						applyPaginationQuery &&
							bus.emit(eventName, { limit: limit, offset: (totalPages - 1) * limit })
					"
				>
					<span
						v-if="shouldDisplayNextTripleDots"
						class="grid self-end justify-self-end text-sm text-gray-700 dark:text-gray-200"
						>...</span
					>
					<span
						:class="{
							'grid items-center justify-center w-full rounded bg-gray-800 dark:bg-gray-800 py-1 px-2 text-gray-700 dark:text-gray-200': true,
							'bg-primary-400 dark:bg-primary-400': isInLastPage
						}"
						>{{ lastPageNumber }}</span
					>
				</Anchor>
			</li>

			<li>
				<Anchor
					:to="{ path: link, query: { limit, offset: offset + limit } }"
					:class="{
						disabled: isInLastPage
					}"
					:href="`${link}?limit=${limit}&offset=${offset + limit}`"
					:text="'Next Page'"
					:title="isInLastPage ? 'You are on the last page' : 'Next Page'"
					@click="
						applyPaginationQuery &&
							bus.emit(eventName, { limit: limit, offset: offset + limit })
					"
				>
					<span class="text-gray-700 dark:text-gray-200"
						><icon-fa-solid:angle-right
					/></span>
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
