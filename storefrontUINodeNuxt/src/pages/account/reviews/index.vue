<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import { useReviewsStore } from '~/stores/product/reviews'
import { EntityOrdering, OrderingOption } from '~/zod/ordering/ordering'
import { Review, ReviewOrderingField, ReviewQuery } from '~/zod/product/review'
import emptyIcon from '~icons/mdi/package-variant-remove'

const { t } = useLang()
const route = useRoute()

const userStore = useUserStore()
const { account } = storeToRefs(userStore)

const reviewsStore = useReviewsStore()

const { reviews, pending, error } = storeToRefs(reviewsStore)

const entityOrdering: EntityOrdering<ReviewOrderingField> = [
	{
		value: 'createdAt',
		label: t('pages.account.reviews.ordering.created_at'),
		options: ['ascending', 'descending']
	}
]

const orderingFields: Partial<Record<ReviewOrderingField, OrderingOption[]>> = {
	createdAt: []
}

const pagination = computed(() => {
	return usePagination<Review>(reviews.value)
})

const ordering = computed(() => {
	return useOrdering<ReviewOrderingField>(entityOrdering, orderingFields)
})

const routePaginationParams = ref<ReviewQuery>({
	page: Number(route.query.page) || undefined,
	ordering: route.query.ordering || undefined,
	userId: String(account.value?.id),
	expand: 'true'
})

await reviewsStore.fetchReviews(routePaginationParams.value)
const refresh = () => reviewsStore.fetchReviews(routePaginationParams.value)

const bus = useEventBus<string>('userReviews')
bus.on((event, payload: ReviewQuery) => {
	routePaginationParams.value = payload
	refresh()
})

watch(
	() => route.query,
	() => {
		bus.emit('userReviews', {
			page: Number(route.query.page) || undefined,
			ordering: route.query.ordering || undefined,
			userId: String(account.value?.id),
			expand: 'true'
		})
	}
)

definePageMeta({
	layout: 'user'
})
</script>

<template>
	<PageWrapper class="container flex flex-col gap-4">
		<PageHeader>
			<PageTitle :text="$t('pages.account.reviews.title')" />
		</PageHeader>
		<PageBody>
			<LazyError v-if="error" :code="error.statusCode" />
			<LoadingSkeleton
				v-if="pending"
				:card-height="'195px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:direction="'row'"
				:columns-md="1"
				:columns-lg="1"
				:card-body-paragraphs="2"
				:replicas="reviews.results.length || 4"
			></LoadingSkeleton>
			<template v-if="!pending && reviews.results.length">
				<div class="grid gap-2 md:flex md:items-center">
					<LazyPaginationPageNumber
						:results-count="pagination.resultsCount"
						:total-pages="pagination.totalPages"
						:page-total-results="pagination.pageTotalResults"
						:page-size="pagination.pageSize"
						:current-page="pagination.currentPage"
						:links="pagination.links"
					/>
					<LazyOrdering
						:ordering="String(routePaginationParams.ordering)"
						:ordering-options="ordering.orderingOptionsArray.value"
					></LazyOrdering>
				</div>
				<LazyProductReviewsList
					:reviews="reviews.results"
					:reviews-count="reviews.count"
					display-image-of="product"
				/>
			</template>
			<template v-if="!pending && !reviews.results.length">
				<LazyEmptyState :icon="emptyIcon">
					<template #actions>
						<Button
							:text="$t('common.empty.button')"
							:type="'link'"
							:to="'index'"
						></Button>
					</template>
				</LazyEmptyState>
			</template>
		</PageBody>
	</PageWrapper>
</template>
