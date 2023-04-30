<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import { useOrderStore } from '~/stores/order'
import emptyIcon from '~icons/mdi/package-variant-remove'
import { Order, OrderOrderingField, OrderQuery } from '~/zod/order/order'
import { EntityOrdering, OrderingOption } from '~/zod/ordering/ordering'

const { t } = useLang()
const route = useRoute()

const userStore = useUserStore()
const { account } = storeToRefs(userStore)

const orderStore = useOrderStore()
const { orders, pending, error } = storeToRefs(orderStore)

const entityOrdering: EntityOrdering<OrderOrderingField> = [
	{
		value: 'createdAt',
		label: t('pages.account.orders.ordering.created_at'),
		options: ['ascending', 'descending']
	}
]

const orderingFields: Partial<Record<OrderOrderingField, OrderingOption[]>> = {
	createdAt: []
}

const pagination = computed(() => {
	return usePagination<Order>(orders.value)
})

const ordering = computed(() => {
	return useOrdering<OrderOrderingField>(entityOrdering, orderingFields)
})

const routePaginationParams = ref<OrderQuery>({
	page: Number(route.query.page) || undefined,
	ordering: route.query.ordering || undefined,
	userId: String(account.value?.id)
})

await orderStore.fetchOrders(routePaginationParams.value)
const refresh = async () => await orderStore.fetchOrders(routePaginationParams.value)

// @TODO: Event bus like this should have an Enum for key and event name
const bus = useEventBus<string>('userOrders')
bus.on((event, payload: OrderQuery) => {
	routePaginationParams.value = payload
	refresh()
})

watch(
	() => route.query,
	() => {
		bus.emit('userOrders', {
			page: Number(route.query.page) || undefined,
			ordering: route.query.ordering || undefined,
			userId: String(account.value?.id)
		})
	}
)

definePageMeta({
	layout: 'user'
})
useHead(() => ({
	title: t('pages.account.orders.title')
}))
</script>

<template>
	<PageWrapper class="container flex flex-col gap-4">
		<PageHeader>
			<PageTitle :text="$t('pages.account.orders.title')" />
		</PageHeader>
		<PageBody>
			<Error v-if="error" :code="error.statusCode" />
			<LoadingSkeleton
				v-if="pending"
				:card-height="'195px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:direction="'row'"
				:columns-md="1"
				:columns-lg="1"
				:card-body-paragraphs="2"
				:replicas="orders.results.length || 4"
			></LoadingSkeleton>
			<template v-if="!pending && orders.results.length">
				<div class="grid gap-2 md:flex md:items-center">
					<PaginationPageNumber
						:results-count="pagination.resultsCount"
						:total-pages="pagination.totalPages"
						:page-total-results="pagination.pageTotalResults"
						:page-size="pagination.pageSize"
						:current-page="pagination.currentPage"
						:links="pagination.links"
					/>
					<Ordering
						:ordering="String(routePaginationParams.ordering)"
						:ordering-options="ordering.orderingOptionsArray.value"
					/>
				</div>
				<OrderList :orders="orders.results" />
			</template>
			<template v-if="!pending && !orders.results.length">
				<EmptyState :icon="emptyIcon">
					<template #actions>
						<Button
							:text="$t('common.empty.button')"
							:type="'link'"
							:to="'index'"
						></Button>
					</template>
				</EmptyState>
			</template>
		</PageBody>
	</PageWrapper>
</template>
