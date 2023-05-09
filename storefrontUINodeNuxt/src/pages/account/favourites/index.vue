<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import { useFavouriteStore } from '~/stores/favourite'
import {
	Favourite,
	FavouriteOrderingField,
	FavouriteQuery
} from '~/zod/product/favourite'
import { EntityOrdering, OrderingOption } from '~/zod/ordering/ordering'
import emptyIcon from '~icons/mdi/package-variant-remove'

const { t } = useLang()
const route = useRoute()

const userStore = useUserStore()
const { account } = storeToRefs(userStore)

const favouriteStore = useFavouriteStore()
const { favourites, pending, error } = storeToRefs(favouriteStore)

const entityOrdering: EntityOrdering<FavouriteOrderingField> = [
	{
		value: 'createdAt',
		label: t('pages.account.favourites.ordering.created_at'),
		options: ['ascending', 'descending']
	}
]

const orderingFields: Partial<Record<FavouriteOrderingField, OrderingOption[]>> = {
	createdAt: []
}

const pagination = computed(() => {
	return usePagination<Favourite>(favourites.value)
})

const ordering = computed(() => {
	return useOrdering<FavouriteOrderingField>(entityOrdering, orderingFields)
})

const routePaginationParams = ref<FavouriteQuery>({
	page: Number(route.query.page) || undefined,
	ordering: route.query.ordering || undefined,
	userId: String(account.value?.id),
	expand: 'true'
})

try {
	await favouriteStore.fetchFavourites(routePaginationParams.value)
} catch (error) {
	//
}

const refresh = async () =>
	await favouriteStore.fetchFavourites(routePaginationParams.value)

const bus = useEventBus<string>('userFavourites')
bus.on((event, payload: FavouriteQuery) => {
	routePaginationParams.value = payload
	refresh()
})

watch(
	() => route.query,
	() => {
		bus.emit('userFavourites', {
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
			<PageTitle :text="$t('pages.account.favourites.title')" />
		</PageHeader>
		<PageBody>
			<Error v-if="error" :code="error.statusCode" />
			<LoadingSkeleton
				v-if="pending && !error"
				:card-height="'422px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:replicas="favourites.results.length || 4"
			></LoadingSkeleton>
			<template v-if="!pending && favourites.results.length">
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
			<template v-if="!pending && favourites.results.length">
				<FavouriteList :favourites="favourites.results" />
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
