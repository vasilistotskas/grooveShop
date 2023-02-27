<script lang="ts" setup>
import { useProductStore } from '~/stores/product/product'
import { capitalize } from '~/utils/str'

const route = useRoute()
const productId = route.params.id
const store = useProductStore()
const { product } = storeToRefs(store)
const { pending, error } = useLazyAsyncData('product', () =>
	store.fetchProduct(productId)
)

definePageMeta({
	layout: 'page'
})
useHead(() => ({
	title: capitalize(product.value?.seoTitle || ''),
	meta: [
		{
			name: 'description',
			content: product.value?.seoDescription || ''
		},
		{
			name: 'keywords',
			content: product.value?.seoKeywords || ''
		}
	]
}))
</script>

<template>
	<PageWrapper class="flex flex-col">
		<PageHeader>
			<PageTitle :text="product?.name" class="capitalize" />
		</PageHeader>
		<PageBody>
			<LoadingSkeleton v-if="pending"></LoadingSkeleton>
			<template v-else-if="error">
				<div>Error</div>
			</template>
			<template v-else>
				<div>{{ product }}</div>
			</template>
		</PageBody>
	</PageWrapper>
</template>
