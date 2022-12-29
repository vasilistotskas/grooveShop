<template>
	<metainfo>
		<template #title="{ content }"
			>{{ content ? `${content} | DeepWeb` : `DeepWeb` }}
		</template>
	</metainfo>
	<Loader v-show="appModule.getLoading" id="mainLoader" />
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

<script lang="ts">
import { useMeta } from 'vue-meta'
import packageMeta from '@/../package.json'
import AppModule from '@/State/App/AppModule'
import Footer from '@/Components/Main/Footer.vue'
import Header from '@/Components/Main/Header.vue'
import Loader from '@/Components/Main/Loader.vue'
import { getModule } from 'vuex-module-decorators'
import SliderModule from '@/State/Slider/SliderModule'
import ProductModule from '@/State/Product/ProductModule'
import CategoryModule from '@/State/Category/CategoryModule'
import SocialSidebar from '@/Components/Main/SocialSidebar.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'

@Component({
	name: 'App',
	components: {
		Header,
		Footer,
		SocialSidebar,
		Loader
	}
})
export default class App extends Vue {
	appModule = getModule(AppModule)

	myContext = setup(() => {
		const categoryModule = getModule(CategoryModule)
		const productModule = getModule(ProductModule)
		const sliderModule = getModule(SliderModule)

		Promise.all([
			categoryModule.fetchCategoriesTreeFromRemote(),
			productModule.fetchLatestProductsFromRemote(),
			sliderModule.fetchSlidersFromRemote()
		])

		const meta = useMeta({
			title: '',
			htmlAttrs: { lang: 'en', amp: true }
		})
		return {
			meta
		}
	})

	get version(): string {
		return packageMeta.version
	}

	mounted(): void {
		window.addEventListener('resize', () => {
			this.appModule.setWindowWidth(window.innerWidth)
		})
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Base/commons';
@import '@/Assets/Styles/Base/form_colors';
@import '@/Assets/Styles/Base/helpers';
@import '@/Assets/Styles/Base/mixins';
@import '@/Assets/Styles/Base/typography';
</style>
