<script lang="ts" setup>
import { useCategoryStore } from '~/stores/product/category'

const config = useRuntimeConfig()
const route = useRoute()
const categoryId = route.params.id
const { category, loading, error } = storeToRefs(useCategoryStore())
const { fetchCategory } = useCategoryStore()
fetchCategory(categoryId)

definePageMeta({
	layout: 'page'
})
useHead(() => ({
	title: capitalize(category.value?.seoTitle || ''),
	meta: [
		{
			name: 'description',
			content: category.value?.seoDescription || ''
		},
		{
			name: 'keywords',
			content: category.value?.seoKeywords || ''
		}
	]
}))
</script>

<template>
	<PageWrapper class="flex flex-col">
		<PageHeader>
			<PageTitle :text="$t('pages.category.title')" class="capitalize" />
		</PageHeader>
		<PageBody>
			<div></div>
		</PageBody>
	</PageWrapper>
</template>
