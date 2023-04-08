<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
	layout: 'user',
	middleware: ['breadcrumbs']
})
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="$t('pages.account.orders.title')" />
		</PageHeader>
		<PageBody> </PageBody>
	</PageWrapper>
</template>
