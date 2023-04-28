<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
	layout: 'user'
})
</script>

<template>
	<PageWrapper class="container flex flex-col gap-4">
		<PageHeader>
			<PageTitle :text="$t('pages.account.help.title')" />
		</PageHeader>
		<PageBody> </PageBody>
	</PageWrapper>
</template>
