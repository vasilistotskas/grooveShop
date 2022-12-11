<template>
	<Loader v-show="false" id="mainLoader" />
	<div id="wrapper">
		<Header />

		<section class="main-section">
			<Suspense>
				<template #default>
					<RouterView />
				</template>
				<template #fallback>
					<span>Loading...</span>
				</template>
			</Suspense>
		</section>

		<Footer />

		<SocialSidebar />
	</div>
</template>

<script setup lang="ts">
import Header from '@/Components/Main/Header.vue'
import Footer from '@/Components/Main/Footer.vue'
import SocialSidebar from '@/Components/Main/SocialSidebar.vue'
</script>

<style lang="scss">
@import '@/Assets/Styles/Base/commons';
@import '@/Assets/Styles/Base/form_colors';
@import '@/Assets/Styles/Base/helpers';
@import '@/Assets/Styles/Base/mixins';
@import '@/Assets/Styles/Base/typography';
</style>
