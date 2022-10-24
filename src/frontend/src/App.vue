<template>
	<Loader v-show="isLoading" id="mainLoader" />
	<div id="wrapper">
		<Header />

		<section class="main-section">
			<RouterView />
		</section>

		<Footer />

		<SocialSidebar />
	</div>
</template>

<script lang="ts">
import packageMeta from '@/../package.json'
import AppModule from '@/State/App/AppModule'
import CartModule from '@/State/Cart/CartModule'
import Footer from '@/Components/Main/Footer.vue'
import Header from '@/Components/Main/Header.vue'
import Loader from '@/Components/Main/Loader.vue'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import CategoryModule from '@/State/Category/CategoryModule'
import { Options as Component, Vue } from 'vue-class-component'
import SocialSidebar from '@/Components/Main/SocialSidebar.vue'
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
	productFavouriteModule = getModule(ProductFavouriteModule)

	get version(): string {
		return packageMeta.version
	}

	get isLoading(): boolean {
		return this.appModule.getLoading
	}

	get isAuthenticated(): boolean {
		return this.authModule.isAuthenticated
	}

	initializeUserData(): void {
		this.userModule.fetchUserDataFromRemote().then((response) => {
			if (response) {
				this.countryModule.findRegionsBasedOnAlphaForLoggedCustomer(
					this.userModule.getUserData
				)
				this.productFavouriteModule.fetchUserFavouritesFromRemote(response.data[0].user)
			}
		})
	}

	created(): void {
		Promise.all([
			this.authModule.initialize(),
			this.cartModule.initializeCart(),
			this.cartModule.cartTotalPriceForPayWayAction(),
			this.categoryModule.fetchCategoriesTreeFromRemote(),
			this.countryModule.fetchCountriesFromRemote()
		])

		if (this.isAuthenticated) {
			this.initializeUserData()
		}
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
