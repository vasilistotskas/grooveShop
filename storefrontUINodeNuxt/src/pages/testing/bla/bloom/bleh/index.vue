<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
	layout: 'testing'
})
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="$t('pages.testing.index.title')" class="capitalize" />
		</PageHeader>
		<PageBody>
			<PageSection>
				<p class="text-gray-700 dark:text-gray-200">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia autem debitis ab
					dolorum tempore placeat possimus perferendis porro sit aut nobis quasi hic
					consequuntur, atque impedit nihil totam illo odit?
				</p>
			</PageSection>
		</PageBody>
	</PageWrapper>
</template>
