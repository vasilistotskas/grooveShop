<script lang="ts" setup>
import { useServerHead } from '@unhead/vue'
import { useProductStore } from '~/stores/product/product'
import {
	ProductOrdering,
	ProductOrderingField,
	ProductQuery
} from '~/zod/product/product'
import { OrderingOption } from '~/zod/ordering/ordering'

const route = useRoute()
const { t } = useI18n()
const config = useRuntimeConfig()
const store = useProductStore()

const routePaginationParams = ref<ProductQuery>({
	limit: Number(route.query.limit),
	offset: Number(route.query.offset),
	ordering: String(route.query.ordering)
})

const { pending, refresh } = useAsyncData('products', () =>
	store.fetchProducts(routePaginationParams.value)
)

const { products, loading, error } = storeToRefs(store)
const paginationUrls = computed(() => products.value.links)
const resultsCount = computed(() => products.value.count)
const totalPages = computed(() => products.value.totalPages)
const pageSize = computed(() => products.value.pageSize)
const currentPage = computed(() => products.value.page)

const offset = computed(() => {
	return (currentPage.value - 1) * pageSize.value
})
const limit = computed(() => {
	return pageSize.value
})

const ordering = ref<ProductOrdering>([
	{ value: 'name', label: 'Name', options: ['ascending', 'descending'] },
	{ value: 'price', label: 'Price', options: ['ascending', 'descending'] },
	{ value: 'created_at', label: 'Created At', options: ['ascending', 'descending'] }
])

const orderingOptions = computed(() => {
	const options: Record<ProductOrderingField, OrderingOption[]> = {
		name: [],
		price: [],
		created_at: []
	}
	ordering.value.forEach((items) => {
		options[items.value] = items.options.map((option) => {
			const value = option === 'ascending' ? items.value : `-${items.value}`
			return {
				value,
				label: `${items.label} ${option}`
			}
		})
	})
	return options
})

const orderingOptionsArray = computed(() => {
	const options: OrderingOption[] = []
	Object.entries(orderingOptions.value).forEach(([key, value]) => {
		value.forEach((option) => {
			options.push({
				value: String(option.value),
				label: option.label
			})
		})
	})
	return options
})

const bus = useEventBus<string>('products')
bus.on((event, payload: ProductQuery) => {
	routePaginationParams.value = payload
	refresh()
})

definePageMeta({
	layout: 'page'
})
useServerHead({
	title: t('pages.products.title'),
	meta: [
		{
			name: 'description',
			content: t('pages.products.description')
		},
		{
			name: 'keywords',
			content: t('pages.products.keywords')
		}
	]
})
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle
				:text="`${$t('pages.products.title')} - ${resultsCount}`"
				class="capitalize"
			/>
		</PageHeader>
		<PageBody>
			<ClientOnly>
				<div v-if="loading || pending" class="grid gap-2">
					<LoadingSkeletonBar
						:replicas="1"
						:card-width="'320px'"
						:card-height="'32px'"
						:border-radius="'0.5rem'"
					></LoadingSkeletonBar>
					<LoadingSkeleton :replicas="30" :card-height="'528px'"></LoadingSkeleton>
				</div>
			</ClientOnly>
			<template v-if="error">
				<div>Error</div>
			</template>
			<template v-if="products.results.length">
				<div class="flex items-center">
					<Pagination
						:total-pages="totalPages"
						:current-page="currentPage"
						:offset="offset"
						:limit="limit"
						:pagination-urls="paginationUrls"
						:event-bus-id="'products'"
						:event-name="'products-pagination'"
					/>
					<Ordering
						:event-bus-id="'products'"
						:event-name="'products-ordering'"
						:ordering="String(routePaginationParams.ordering)"
						:ordering-options="orderingOptionsArray"
					></Ordering>
				</div>
			</template>
			<template v-if="products.results.length">
				<ol
					class="grid items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
				>
					<template v-for="(product, index) in products.results" :key="index">
						<ProductCard :product="product" />
					</template>
				</ol>
			</template>
		</PageBody>
	</PageWrapper>
</template>
