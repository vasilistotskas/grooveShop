<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import { useAddressStore } from '~/stores/address'
import { Address, AddressOrderingField, AddressQuery } from '~/zod/address/address'
import { EntityOrdering, OrderingOption } from '~/zod/ordering/ordering'
import emptyIcon from '~icons/mdi/package-variant-remove'

const { t } = useLang()
const route = useRoute()

const userStore = useUserStore()
const { account } = storeToRefs(userStore)

const addressStore = useAddressStore()
const { addresses, pending, error } = storeToRefs(addressStore)

const entityOrdering: EntityOrdering<AddressOrderingField> = [
	{
		value: 'createdAt',
		label: t('pages.account.addresses.ordering.created_at'),
		options: ['ascending', 'descending']
	}
]

const orderingFields: Partial<Record<AddressOrderingField, OrderingOption[]>> = {
	createdAt: []
}

const pagination = computed(() => {
	return usePagination<Address>(addresses.value)
})

const ordering = computed(() => {
	return useOrdering<AddressOrderingField>(entityOrdering, orderingFields)
})

const routePaginationParams = ref<AddressQuery>({
	page: Number(route.query.page) || undefined,
	ordering: route.query.ordering || undefined,
	userId: String(account.value?.id),
	expand: 'true'
})

try {
	await addressStore.fetchAddresses(routePaginationParams.value)
} catch (error) {
	//
}
const refresh = async () => await addressStore.fetchAddresses(routePaginationParams.value)

const bus = useEventBus<string>('userAddresses')
bus.on((event, payload: AddressQuery) => {
	routePaginationParams.value = payload
	refresh()
})

watch(
	() => route.query,
	() => {
		bus.emit('userAddresses', {
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
		<PageHeader class="mb-4">
			<PageTitle :text="$t('pages.account.addresses.title')" />
		</PageHeader>
		<PageBody>
			<Error v-if="error" :code="error.statusCode" />
			<LoadingSkeleton
				v-if="pending && !error"
				:card-height="'422px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:replicas="addresses.results.length || 4"
			></LoadingSkeleton>
			<template v-if="!pending && addresses.results.length">
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
			</template>
			<template v-if="!pending && addresses.results.length">
				<AddressesList :addresses="addresses.results" />
			</template>
			<template v-else>
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
