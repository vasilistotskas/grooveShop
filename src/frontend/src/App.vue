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
import AppModule from '@/state/app/AppModule'
import CartModule from '@/state/cart/CartModule'
import BlogModule from '@/state/blog/BlogModule'
import Footer from '@/components/Main/Footer.vue'
import Header from '@/components/Main/Header.vue'
import Loader from '@/components/Main/Loader.vue'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/state/auth/auth/AuthModule'
import UserModule from '@/state/user/data/UserModule'
import CountryModule from '@/state/country/CountryModule'
import CategoryModule from '@/state/category/CategoryModule'
import { Options as Component, Vue } from 'vue-class-component'
import SocialSidebar from '@/components/Main/SocialSidebar.vue'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'

@Component({
  name: 'App',
  components: {
    Header,
    Footer,
    SocialSidebar,
    Loader,
  },
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

  get version(): string {
    return packageMeta.version
  }

  get isLoading(): boolean {
    return this.appModule.getLoading
  }

  get isAuthenticated(): boolean {
    return this.authModule.isAuthenticated
  }

  async initializeUserData(): Promise<void> {
    this.userModule.fetchUserDataFromRemote().then((response) => {
      if (response) {
        this.countryModule.findRegionsBasedOnAlphaForLoggedCustomer(this.userModule.getUserData)
        this.productFavouriteModule.fetchUserFavouritesFromRemote(response.data[0].user)
      }
    })
    await this.blogModule.fetchCommentsByUser(this.userModule.getUserData.email)
  }

  async created(): Promise<void> {
    await Promise.all([
      this.authModule.initialize(),
      this.cartModule.initializeCart(),
      this.cartModule.cartTotalPriceForPayWayAction(),
      this.categoryModule.fetchCategoriesTreeFromRemote(),
      this.countryModule.fetchCountriesFromRemote(),
    ])

    if (this.isAuthenticated) {
      await this.initializeUserData()
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
@import '@/assets/styles/base/commons';
@import '@/assets/styles/base/form_colors';
@import '@/assets/styles/base/helpers';
@import '@/assets/styles/base/mixins';
@import '@/assets/styles/base/typography';
</style>
