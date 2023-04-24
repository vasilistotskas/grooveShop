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

const orderingFields: Record<OrderOrderingField, OrderingOption[]> = {
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
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="$t('pages.account.orders.title')" />
		</PageHeader>
		<PageBody>
			<LazyPageError v-if="error" :error="error"></LazyPageError>
			<LazyLoadingSkeleton
				v-if="pending"
				:card-height="'606px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:replicas="orders.results.length || 3"
			></LazyLoadingSkeleton>
			<template v-if="orders.results.length">
				<div class="grid gap-2 md:flex md:items-center">
					<LazyPaginationPageNumber
						:results-count="pagination.resultsCount"
						:total-pages="pagination.totalPages"
						:page-size="pagination.pageSize"
						:current-page="pagination.currentPage"
						:links="pagination.links"
					/>
					<LazyOrdering
						:ordering="String(routePaginationParams.ordering)"
						:ordering-options="ordering.orderingOptionsArray.value"
					></LazyOrdering>
				</div>
			</template>
			<template v-if="orders.results.length">
				<LazyOrderList :orders="orders.results"></LazyOrderList>
			</template>
			<template v-else>
				<LazyEmptyState
					:title="$t('pages.account.orders.empty.title')"
					:description="$t('pages.account.orders.empty.description')"
					:icon="emptyIcon"
				>
					<template #actions>
						<Button
							:text="$t('pages.account.orders.empty.button')"
							:to="{ name: 'home' }"
						></Button>
					</template>
				</LazyEmptyState>
			</template>
		</PageBody>
	</PageWrapper>
</template>
