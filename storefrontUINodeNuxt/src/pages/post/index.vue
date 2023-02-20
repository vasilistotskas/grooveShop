<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
	layout: 'page'
})
useHead(() => ({
	title: capitalize(t('pages.post.title')),
	meta: [
		{
			name: 'description',
			content: t('pages.post.description')
		}
	]
}))
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="$t('pages.post.title')" class="capitalize" />
		</PageHeader>
		<PageBody>
			<div></div>
		</PageBody>
	</PageWrapper>
</template>
