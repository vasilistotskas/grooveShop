<template>
	<metainfo>
		<template #title="{ content }">{{
			content ? `${content} | DeepWeb` : `DeepWeb`
		}}</template>
	</metainfo>
	<Loader v-show="isLoading" id="mainLoader" />
	<div id="wrapper">
		<Header
			:cart-total-length="cartTotalLength"
			:backend-base-url="backendBaseUrl"
			:navbar-menu-hidden="navbarMenuHidden"
			:categories-tree-data="categoriesTreeData"
			:is-authenticated="isAuthenticated"
			:is-mobile="isMobile"
			:is-loading="isLoading"
		/>

		<section class="main-section">
			<RouterView />
		</section>

		<Footer />

		<SocialSidebar />
	</div>
</template>

<script lang="ts">
import { inject } from 'vue'
import { Emitter } from 'mitt'
import { useMeta } from 'vue-meta'
import packageMeta from '@/../package.json'
import AppModule from '@/State/App/AppModule'
import CartModule from '@/State/Cart/CartModule'
import BlogModule from '@/State/Blog/BlogModule'
import Footer from '@/Components/Main/Footer.vue'
import Header from '@/Components/Main/Header.vue'
import Loader from '@/Components/Main/Loader.vue'
import { getModule } from 'vuex-module-decorators'
import { AppEvents } from '@/Emitter/Type/App/Events'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import CategoryModel from '@/State/Category/CategoryModel'
import CategoryModule from '@/State/Category/CategoryModule'
import SocialSidebar from '@/Components/Main/SocialSidebar.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import ProductFavouriteModule from '@/State/Product/Favourite/ProductFavouriteModule'

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
	authModule = getModule(AuthModule)
	cartModule = getModule(CartModule)
	categoryModule = getModule(CategoryModule)
	countryModule = getModule(CountryModule)
	userModule = getModule(UserModule)
	blogModule = getModule(BlogModule)
	productFavouriteModule = getModule(ProductFavouriteModule)
	emitter: Emitter<AppEvents> | undefined = inject('emitter')

	meta = setup(() => {
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

	get isLoading(): boolean {
		return this.appModule.getLoading
	}

	get isAuthenticated(): boolean {
		return this.authModule.isAuthenticated
	}

	get cartTotalLength(): number {
		return this.cartModule.getCartTotalLength
	}

	get backendBaseUrl(): string | undefined {
		return this.appModule.backendBaseUrl
	}

	get navbarMenuHidden(): boolean {
		return this.appModule.getNavbarMenuHidden
	}

	get isMobile(): boolean {
		return this.appModule.isMobile
	}

	get categoriesTreeData(): Array<CategoryModel> {
		return this.categoryModule.getCategoriesTree
	}

	initializeUserData(): void {
		this.countryModule.findRegionsBasedOnAlphaForLoggedCustomer(
			this.userModule.getUserData
		)
		this.productFavouriteModule.fetchUserFavouritesFromRemote(
			this.userModule?.getUserData?.id
		)
		this.blogModule.fetchCommentsByUser(this.userModule?.getUserData?.email)
	}

	created(): void {
		Promise.all([
			this.authModule.initialize(),
			this.cartModule.cartTotalPriceForPayWayAction(),
			this.categoryModule.fetchCategoriesTreeFromRemote()
		])

		if (this.isAuthenticated) {
			this.initializeUserData()
		}

		this.emitter?.on('setNavbarMenuHidden', (e) => {
			this.appModule.setNavbarMenuHidden(e)
		})
		this.emitter?.on('addToCart', (e) => {
			this.cartModule.addToCart(e)
		})
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
