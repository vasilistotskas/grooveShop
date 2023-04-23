<script lang="ts" setup>
import { PropType } from 'vue'
import { FetchError } from 'ofetch'
import { Pagination as PaginationType } from '~/zod/pagination/pagination'
import { Review, ReviewQuery, ReviewsOrderingField } from '~/zod/product/review'
import { EntityOrdering, OrderingOption } from '~/zod/ordering/ordering'

const props = defineProps({
	reviews: {
		type: Object as PropType<PaginationType<Review>>,
		required: true
	},
	reviewsAverage: {
		type: Number,
		required: false,
		default: 0
	},
	reviewsCount: {
		type: Number,
		required: false,
		default: 0
	},
	pending: {
		type: Boolean,
		required: true
	},
	error: {
		type: Object as PropType<FetchError | null>,
		required: false,
		default: null
	}
})

const { reviews, reviewsAverage, reviewsCount, pending, error } = toRefs(props)

const { t } = useLang()
const toast = useToast()
const route = useRoute()

const routePaginationParams = ref<ReviewQuery>({
	page: Number(route.query.page) || undefined,
	ordering: route.query.ordering || undefined,
	expand: 'true'
})

const entityOrdering: EntityOrdering<ReviewsOrderingField> = [
	{
		value: 'id',
		label: t('components.product.reviews.ordering.id'),
		options: ['ascending', 'descending']
	},
	{
		value: 'userId',
		label: t('components.product.reviews.ordering.user_id'),
		options: ['ascending', 'descending']
	},
	{
		value: 'productId',
		label: t('components.product.reviews.ordering.product_id'),
		options: ['ascending', 'descending']
	},
	{
		value: 'createdAt',
		label: t('components.product.reviews.ordering.created_at'),
		options: ['ascending', 'descending']
	}
]

const orderingFields: Record<ReviewsOrderingField, OrderingOption[]> = {
	id: [],
	userId: [],
	productId: [],
	createdAt: []
}

const pagination = computed(() => {
	return usePagination<Review>(reviews.value)
})

const ordering = computed(() => {
	return useOrdering<ReviewsOrderingField>(entityOrdering, orderingFields)
})
</script>

<template>
	<div
		class="reviews_list text-gray-700 dark:text-gray-200 p-6 border-t border-gray-900/10 dark:border-gray-50/[0.2]"
	>
		<div class="reviews_list__header">
			<h2 class="reviews_list__title">{{ $t('components.product.reviews.title') }}</h2>
			<div v-if="reviews?.results.length > 0" class="reviews_list__actions">
				<div class="reviews_list__pagination">
					<PaginationPageNumber
						:results-count="pagination.resultsCount"
						:total-pages="pagination.totalPages"
						:page-size="pagination.pageSize"
						:current-page="pagination.currentPage"
						:links="pagination.links"
					/>
				</div>
				<div class="reviews_list__ordering">
					<Ordering
						:ordering="String(routePaginationParams.ordering)"
						:ordering-options="ordering.orderingOptionsArray.value"
					></Ordering>
				</div>
			</div>
		</div>
		<div class="reviews_list__body">
			<div class="reviews_list__items">
				<div v-show="pending" class="reviews_list__item">
					<div class="reviews_list__item__loading">
						<LazyLoadingSkeleton
							v-if="pending"
							:card-height="'130px'"
							:class="
								pending ? 'grid grid-rows-repeat-auto-fill-mimax-100-130 gap-4' : 'hidden'
							"
							:loading="pending"
							:direction="'row'"
							:columns-md="1"
							:columns-lg="1"
							:cart-body-paragraphs="5"
							:replicas="reviews?.results.length || 4"
						></LazyLoadingSkeleton>
					</div>
				</div>
				<div v-if="error" class="reviews_list__item">
					<div class="reviews_list__item__error">
						<Error :code="error.statusCode" />
					</div>
				</div>
				<div v-else-if="reviews?.results.length === 0" class="reviews_list__item">
					<div class="reviews_list__item__empty">
						<Empty :text="$t('components.product.reviews.empty')" />
					</div>
				</div>
				<template v-if="reviews?.results.length > 0">
					<ProductReviewsSummary
						:reviews-average="reviewsAverage"
						:reviews-count="reviewsCount"
					></ProductReviewsSummary>
					<ProductReviewsCard
						v-for="review in reviews?.results"
						:key="review.id"
						:review="review"
						class="reviews_list__item bg-white dark:bg-slate-800 border border-gray-900/10 dark:border-gray-50/[0.2] rounded"
					>
					</ProductReviewsCard>
				</template>
			</div>
		</div>
		<div class="reviews_list__footer"></div>
	</div>
</template>

<style lang="scss" scoped>
.reviews_list {
	width: 100%;
	display: grid;
	@media screen and (min-width: 1200px) {
		max-width: 1070px;
		margin: 0 auto;
	}
	&__header {
		display: grid;
		gap: 1rem;
	}
	&__title {
		font-size: 1.5rem;
		font-weight: 600;
	}
	&__actions {
		display: grid;
		justify-items: start;
		gap: 1rem;
		@media screen and (min-width: 768px) {
			display: flex;
			align-items: center;
		}
	}
	&__pagination {
		display: grid;
	}
	&__ordering {
		display: grid;
	}
	&__body {
		display: grid;
	}
	&__items {
		display: grid;
		gap: 1rem;
	}
	&__item {
		padding: 1rem;
		&__content {
			display: grid;
			gap: 1rem;
			&__header {
				display: grid;
				gap: 0.5rem;
			}
		}
	}
	&__footer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
