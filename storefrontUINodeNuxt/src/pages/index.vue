<script lang="ts" setup>
// composable
const { t } = useLang()
// meta
definePageMeta({
	layout: 'page'
})
useHead(() => ({
	title: t('pages.index.title'),
	meta: [
		{
			name: 'description',
			content: t('pages.index.description')
		},
		{
			name: 'keywords',
			content: t('pages.index.keywords')
		}
	]
}))
useServerSeoMeta({
	title: t('pages.index.title'),
	description: t('pages.index.description')
})
</script>

<template>
	<PageWrapper>
		<PageBody>
			<PageSection>
				<NativeSlider
					:drag-speed="1"
					:left-button-scroll-left-by="-1"
					:right-button-scroll-left-by="1"
				>
					<a href="/">
						<NuxtImg
							src="/assets/images/dummy/1920x640.png"
							alt="Main Banner"
							class="w-full h-full object-cover"
						/>
					</a>
					<a href="/">
						<NuxtImg
							src="/assets/images/dummy/1920x640.png"
							alt="Main Banner"
							class="w-full h-full object-cover"
						/>
					</a>
					<a href="/">
						<NuxtImg
							src="/assets/images/dummy/1920x640.png"
							alt="Main Banner"
							class="w-full h-full object-cover"
						/>
					</a>
				</NativeSlider>

				<div
					class="usps container-small flex flex-wrap items-center justify-center gap-8 my-16 text-center brand lg:justify-between"
				>
					<NuxtImg
						v-for="i in 6"
						:key="i"
						src="/assets/images/dummy/80x40.png"
						alt="Usp"
						class="w-auto h-auto object-cover"
					/>
				</div>
			</PageSection>
		</PageBody>
	</PageWrapper>
</template>

<style lang="scss"></style>
