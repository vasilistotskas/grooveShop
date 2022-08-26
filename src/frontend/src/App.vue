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
import _, { LoDashStatic } from 'lodash'
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
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
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
  productReviewModule = getModule(ProductReviewModule)

  get lodash(): LoDashStatic {
    return _
  }

  get version(): string {
    return packageMeta.version
  }

  get isLoading(): boolean {
    return this.appModule.getLoading
  }

  get isAuthenticated(): boolean {
    return this.authModule.isAuthenticated
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
      await this.userModule.fetchUserDataFromRemote()
      await this.blogModule.fetchCommentsByUser()
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
