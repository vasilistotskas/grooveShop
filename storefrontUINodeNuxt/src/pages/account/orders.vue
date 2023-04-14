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
const { orders } = storeToRefs(orderStore)

const entityOrdering: EntityOrdering<OrderOrderingField> = [
	{
		value: 'created_at',
		label: t('pages.account.orders.ordering.created_at'),
		options: ['ascending', 'descending']
	}
]

const orderingFields: Record<OrderOrderingField, OrderingOption[]> = {
	created_at: []
}

const pagination = computed(() => {
	return usePagination<Order>(orders.value)
})

const ordering = computed(() => {
	return useOrdering<OrderOrderingField>(entityOrdering, orderingFields)
})

const routePaginationParams = ref<OrderQuery>({
	page: Number(route.query.page) || undefined,
	ordering: route.query.ordering || undefined
})

const {
	pending,
	refresh,
	error: ordersError
} = await useAsyncData('orders', () =>
	orderStore.fetchOrders(routePaginationParams.value)
)

// @TODO: Event bus like this should have an Enum for key and event name
const bus = useEventBus<string>('orders')
bus.on((event, payload: OrderQuery) => {
	routePaginationParams.value = payload
	refresh()
})

watch(
	() => route.query,
	() => {
		bus.emit('orders', {
			page: Number(route.query.page) || undefined,
			ordering: route.query.ordering || undefined
		})
	}
)

definePageMeta({
	layout: 'user',
	middleware: ['breadcrumbs']
})
useHead(() => ({
	title: t('pages.account.orders.title')
}))
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="t('pages.account.orders.title')" />
		</PageHeader>
		<PageBody>
			<PageError v-if="ordersError" :error="ordersError"></PageError>
			<LoadingSkeleton
				:card-height="'606px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:replicas="orders.results.length || 3"
			></LoadingSkeleton>
			<template v-if="orders.results.length">
				<div class="grid gap-2 md:flex md:items-center">
					<PaginationPageNumber
						:results-count="pagination.resultsCount"
						:total-pages="pagination.totalPages"
						:page-size="pagination.pageSize"
						:current-page="pagination.currentPage"
						:links="pagination.links"
					/>
					<Ordering
						:ordering="String(routePaginationParams.ordering)"
						:ordering-options="ordering.orderingOptionsArray.value"
					></Ordering>
				</div>
			</template>
			<template v-if="orders.results.length">
				<OrderList :orders="orders.results"></OrderList>
			</template>
			<template v-else>
				<EmptyState
					:title="t('pages.account.orders.empty.title')"
					:description="t('pages.account.orders.empty.description')"
					:icon="emptyIcon"
				>
					<template #actions>
						<Button
							:text="t('pages.account.orders.empty.button')"
							:to="{ name: 'home' }"
						></Button>
					</template>
				</EmptyState>
			</template>
		</PageBody>
	</PageWrapper>
</template>
