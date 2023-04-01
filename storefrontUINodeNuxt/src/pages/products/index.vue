<script lang="ts" setup>
import { useProductStore } from '~/stores/product/product'
import {
	ProductsOrdering,
	ProductsOrderingField,
	ProductsQuery
} from '~/zod/products/products'
import { OrderingOption } from '~/zod/ordering/ordering'

const route = useRoute()
const { t } = useLang()
const config = useRuntimeConfig()
const store = useProductStore()

const routePaginationParams = ref<ProductsQuery>({
	limit: Number(route.query.limit) || undefined,
	offset: Number(route.query.offset) || undefined,
	ordering: route.query.ordering || undefined
})

const { pending, refresh } = await useAsyncData('products', () =>
	store.fetchProducts(routePaginationParams.value)
)

const { products, error } = storeToRefs(store)
const resultsCount = computed(() => products.value.count)
const totalPages = computed(() => products.value.totalPages)
const pageSize = computed(() => products.value.pageSize)
const currentPage = computed(() => products.value.page)

const offset = computed(() => {
	if (!currentPage.value) return 0
	if (!pageSize.value) return 0
	return (currentPage.value - 1) * pageSize.value
})
const limit = computed(() => {
	return pageSize.value
})

const ordering = ref<ProductsOrdering>([
	{
		value: 'name',
		label: t('pages.product.ordering.name'),
		options: ['ascending', 'descending']
	},
	{
		value: 'price',
		label: t('pages.product.ordering.price'),
		options: ['ascending', 'descending']
	},
	{
		value: 'created_at',
		label: t('pages.product.ordering.created_at'),
		options: ['ascending', 'descending']
	}
])

const orderingOptions = computed(() => {
	const options: Record<ProductsOrderingField, OrderingOption[]> = {
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
bus.on((event, payload: ProductsQuery) => {
	routePaginationParams.value = payload
	refresh()
})

watch(
	() => route.query,
	() => {
		bus.emit('products', {
			limit: Number(route.query.limit) || undefined,
			offset: Number(route.query.offset) || undefined,
			ordering: route.query.ordering || undefined
		})
	}
)

definePageMeta({
	layout: 'page',
	middleware: ['breadcrumbs']
})
useHead(() => ({
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
}))
useServerSeoMeta({
	title: t('pages.products.title'),
	description: t('pages.products.description'),
	ogTitle: t('pages.products.title'),
	ogDescription: t('pages.products.description'),
	ogImage: '',
	ogUrl: config.public.baseUrl + route.path,
	twitterTitle: t('pages.products.title'),
	twitterDescription: t('pages.products.description'),
	twitterImage: ''
})
</script>

<template>
	<PageWrapper>
		<PageTitle
			:text="`${$t('pages.products.title')} - ${resultsCount}`"
			class="capitalize"
		/>
		<PageBody>
			<PageError v-if="error" :error="error"></PageError>
			<template v-if="products.results.length">
				<!--        <Filters-->
				<!--          :event-bus-id="'products'"-->
				<!--          :event-name="'products-filters'"-->
				<!--          :filters="filters"-->
				<!--        ></Filters>-->
				<div class="grid gap-2 md:flex md:items-center">
					<PaginationLimitOffset
						:current-page="currentPage"
						:limit="limit"
						:offset="offset"
						:total-pages="totalPages"
					/>
					<Ordering
						:ordering="String(routePaginationParams.ordering)"
						:ordering-options="orderingOptionsArray"
					></Ordering>
				</div>
			</template>
			<LoadingSkeleton
				:card-height="'528px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending"
				:replicas="products.results.length || 4"
			></LoadingSkeleton>
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
