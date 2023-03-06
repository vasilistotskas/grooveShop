<script lang="ts" setup>
import { useServerHead } from '@unhead/vue'
import { useProductStore } from '~/stores/product/product'
import { capitalize } from '~/utils/str'

const route = useRoute()
const config = useRuntimeConfig()
const store = useProductStore()

const fullPath = config.public.baseUrl + route.fullPath
const productId = route.params.id
await store.fetchProduct(productId)
const { product, loading, error } = storeToRefs(store)

definePageMeta({
	middleware: ['product'],
	layout: 'page'
})
useServerHead({
	title: capitalize(product.value?.seoTitle || product.value?.name || ''),
	meta: [
		{
			name: 'description',
			content: product.value?.seoDescription || ''
		},
		{
			name: 'keywords',
			content: product.value?.seoKeywords || ''
		},
		{
			property: 'og:title',
			content: product.value?.seoTitle || ''
		},
		{
			property: 'og:description',
			content: product.value?.seoDescription || ''
		},
		{
			property: 'og:image',
			content: ''
		},
		{
			property: 'og:url',
			content: fullPath
		},
		{
			property: 'og:type',
			content: 'website'
		},
		{
			property: 'og:site_name',
			content: 'Groove Shop'
		},
		{
			property: 'twitter:card',
			content: 'summary_large_image'
		},
		{
			property: 'twitter:title',
			content: product.value?.seoTitle || ''
		},
		{
			property: 'twitter:description',
			content: product.value?.seoDescription || ''
		},
		{
			property: 'twitter:image',
			content: ''
		},
		{
			property: 'twitter:url',
			content: fullPath
		}
	]
})
</script>

<template>
	<PageWrapper class="flex flex-col">
		<PageHeader>
			<PageTitle :text="product?.name" class="capitalize" />
		</PageHeader>
		<PageBody>
			<LoadingSkeleton v-if="loading"></LoadingSkeleton>
			<template v-else-if="error">
				<div>Error</div>
			</template>
			<template v-else>
				<p class="text-gray-700 dark:text-gray-200">{{ product }}</p>
			</template>
		</PageBody>
	</PageWrapper>
</template>
