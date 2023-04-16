<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
	layout: 'user'
})
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="$t('pages.account.favourites.title')" />
		</PageHeader>
		<PageBody> </PageBody>
	</PageWrapper>
</template>
