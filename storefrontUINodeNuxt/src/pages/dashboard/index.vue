<script lang="ts" setup>
definePageMeta({
	layout: 'dashboard'
})
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="$t('pages.dashboard.index.title')" class="capitalize" />
		</PageHeader>
		<PageBody>
			<PageSection>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia autem debitis ab
					dolorum tempore placeat possimus perferendis porro sit aut nobis quasi hic
					consequuntur, atque impedit nihil totam illo odit?
				</p>
			</PageSection>
		</PageBody>
	</PageWrapper>
</template>
