<script lang="ts" setup>
import { PropType } from 'vue'
import { Review } from '~/zod/product/review'

const props = defineProps({
	reviewsAverage: {
		type: Number,
		required: true,
		default: 0
	},
	reviewsCount: {
		type: Number,
		required: true,
		default: 0
	},
	reviews: {
		type: Array as PropType<Review[]>,
		required: true
	}
})
</script>

<template>
	<LazyProductReviewsSummary
		:reviews-average="reviewsAverage"
		:reviews-count="reviewsCount"
	></LazyProductReviewsSummary>
	<LazyProductReviewsCard
		v-for="review in reviews"
		:key="review.id"
		:review="review"
		class="reviews_list__item bg-white dark:bg-slate-800 border border-gray-900/10 dark:border-gray-50/[0.2] rounded p-4"
	>
	</LazyProductReviewsCard>
</template>
