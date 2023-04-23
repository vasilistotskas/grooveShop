<script lang="ts" setup>
import { useProductStore } from '~/stores/product/product'
import { Product, ProductOrderingField, ProductQuery } from '~/zod/product/product'
import { EntityOrdering, OrderingOption } from '~/zod/ordering/ordering'

const route = useRoute()
const { t } = useLang()
const store = useProductStore()

const routePaginationParams = ref<ProductQuery>({
	limit: Number(route.query.limit) || undefined,
	offset: Number(route.query.offset) || undefined,
	ordering: route.query.ordering || undefined
})

const entityOrdering: EntityOrdering<ProductOrderingField> = [
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
		value: 'createdAt',
		label: t('pages.product.ordering.created_at'),
		options: ['ascending', 'descending']
	}
]

const orderingFields: Record<ProductOrderingField, OrderingOption[]> = {
	name: [],
	price: [],
	createdAt: []
}

await store.fetchProducts(routePaginationParams.value)
const refresh = async () => await store.fetchProducts(routePaginationParams.value)

const { products, pending, error } = storeToRefs(store)

const pagination = computed(() => {
	return usePagination<Product>(products.value)
})

const ordering = computed(() => {
	return useOrdering<ProductOrderingField>(entityOrdering, orderingFields)
})

const bus = useEventBus<string>('products')
bus.on((event, payload: ProductQuery) => {
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
</script>

<template>
	<LazyPageError v-if="error" :error="error"></LazyPageError>
	<LazyLoadingSkeleton
		v-if="pending"
		:card-height="'512px'"
		:class="pending ? 'block' : 'hidden'"
		:loading="pending"
		:replicas="products.results.length || 4"
	></LazyLoadingSkeleton>
	<template v-if="products.results.length">
		<div class="grid gap-2 md:flex md:items-center">
			<PaginationLimitOffset
				:current-page="pagination.currentPage"
				:limit="pagination.limit"
				:offset="pagination.offset"
				:total-pages="pagination.totalPages"
			/>
			<Ordering
				:ordering="String(routePaginationParams.ordering)"
				:ordering-options="ordering.orderingOptionsArray.value"
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
</template>