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

const orderingFields: Record<FavouriteOrderingField, OrderingOption[]> = {
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

await favouriteStore.fetchFavourites(routePaginationParams.value)
const refresh = async () =>
	await favouriteStore.fetchFavourites(routePaginationParams.value)

const bus = useEventBus<string>('favourites')
bus.on((event, payload: FavouriteQuery) => {
	routePaginationParams.value = payload
	refresh()
})

watch(
	() => route.query,
	() => {
		bus.emit('favourites', {
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
			<PageTitle :text="$t('pages.account.favourites.title')" />
		</PageHeader>
		<PageBody>
			<LazyPageError v-if="error" :error="error"></LazyPageError>
			<LazyLoadingSkeleton
				v-if="pending"
				:card-height="'422px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:replicas="favourites.results.length || 3"
			></LazyLoadingSkeleton>
			<template v-if="favourites.results.length">
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
			<template v-if="favourites.results.length">
				<LazyFavouriteList :favourites="favourites.results"></LazyFavouriteList>
			</template>
			<template v-else>
				<LazyEmptyState
					:title="$t('pages.account.favourites.empty.title')"
					:description="$t('pages.account.favourites.empty.description')"
					:icon="emptyIcon"
				>
					<template #actions>
						<Button
							:text="$t('pages.account.favourites.empty.button')"
							:to="{ name: 'home' }"
						></Button>
					</template>
				</LazyEmptyState>
			</template>
		</PageBody>
	</PageWrapper>
</template>
