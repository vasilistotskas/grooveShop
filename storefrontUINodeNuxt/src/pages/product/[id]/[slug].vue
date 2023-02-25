<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '~/stores/product/product'
import { capitalize } from '~/utils/str'

const route = useRoute()
const productId = route.params.id
const { product, loading, error } = storeToRefs(useProductStore())
const { fetchProduct } = useProductStore()
fetchProduct(productId)

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
			<PageTitle :text="$t('pages.product.title')" class="capitalize" />
		</PageHeader>
		<PageBody>
			<div></div>
		</PageBody>
	</PageWrapper>
</template>
