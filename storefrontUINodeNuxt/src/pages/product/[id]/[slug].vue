<script lang="ts" setup>
import { useProductStore } from '~/stores/product/product'
import { capitalize } from '~/utils/str'

const route = useRoute()
const config = useRuntimeConfig()
const store = useProductStore()

const fullPath = config.public.baseUrl + route.fullPath
const productId = route.params.id

const { pending, refresh } = await useAsyncData(
	'product',
	async () => await store.fetchProduct(productId)
)
const { product, error } = storeToRefs(store)

const productTitle = computed(() => {
	return capitalize(product.value?.seoTitle || product.value?.name || '')
})

definePageMeta({
	middleware: ['product', 'product-breadcrumbs'],
	layout: 'page'
})
const i18nHead = useLocaleHead({
	addDirAttribute: true,
	addSeoAttributes: true,
	identifierAttribute: 'id'
})
useHead(() => ({
	title: productTitle.value,
	htmlAttrs: {
		lang: i18nHead.value.htmlAttrs!.lang
	},
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
}))
</script>

<template>
	<PageWrapper class="flex flex-col">
		<PageBody>
			<PageError v-if="error" :error="error"></PageError>
			<LoadingSkeleton
				:loading="pending"
				:class="pending ? 'block' : 'hidden'"
			></LoadingSkeleton>
			<div class="product">
				<p class="text-gray-700 dark:text-gray-200">{{ product }}</p>
			</div>
		</PageBody>
	</PageWrapper>
</template>
