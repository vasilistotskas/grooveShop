<script lang="ts" setup>
import { useServerHead } from '@unhead/vue'
import { useProductStore } from '~/stores/product/product'
import { PaginationQuery } from '~/zod/pagination/paginated'

const route = useRoute()
const { t } = useI18n()
const config = useRuntimeConfig()
const store = useProductStore()

const routePaginationParams = computed(() => {
	return {
		limit: Number(route.query.limit) || 20,
		offset: Number(route.query.offset) || 0
	}
})

const { pending } = useAsyncData('products', () =>
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

const bus = useEventBus<string>('products')
bus.on((event, payload: PaginationQuery) => {
	if (event === 'products-pagination') {
		store.fetchProducts(payload)
	}
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
			<PageTitle :text="$t('pages.products.title')" class="capitalize" />
		</PageHeader>
		<PageBody>
			<ClientOnly>
				<LoadingSkeleton v-if="loading && pending" :replicas="30"></LoadingSkeleton>
			</ClientOnly>
			<template v-if="error">
				<div>Error</div>
			</template>
			<template v-if="products.results.length">
				<div class="flex">
					<Pagination
						:total-pages="totalPages"
						:current-page="currentPage"
						:offset="offset"
						:limit="limit"
						:pagination-urls="paginationUrls"
						:event-bus-id="'products'"
						:event-name="'products-pagination'"
					/>
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
