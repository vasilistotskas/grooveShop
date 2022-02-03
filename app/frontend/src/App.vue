<template>
  <Loader v-show="isLoading" id="mainLoader"/>
  <div id="wrapper">

<!--    <Header/>-->

    <section class="main-section">
      <RouterView/>
    </section>

<!--    <Footer/>-->

<!--    <SocialSidebar/>-->

  </div>
</template>


<script lang="ts">
import _, { LoDashStatic } from 'lodash'
import packageMeta from '@/../package.json'
import Footer from '@/components/Main/Footer.vue'
import { Options, Vue } from 'vue-class-component'
import Header from '@/components/Main/Header.vue'
import Loader from '@/components/Main/Loader.vue'
import CountryModel from '@/store/country/CountryModel'
import RegionsModel from '@/store/country/RegionsModel'
import SocialSidebar from '@/components/Main/SocialSidebar.vue'
import UserDetailsModel from '@/store/user/data/UserDetailsModel'
import AppModule from '@/store/app/AppModule'
import AuthModule from '@/store/auth/auth/AuthModule'
import CartModule from '@/store/cart/CartModule'
import UserDataModule from '@/store/user/data/UserDataModule'
import UserOrderModule from '@/store/user/order/UserOrderModule'
import CountryModule from '@/store/country/CountryModule'
import CategoryModule from '@/store/category/CategoryModule'
import { getModule } from 'vuex-module-decorators'

@Options({
  name: 'App',
  components: {
    Header,
    Footer,
    SocialSidebar,
    Loader
  }
})
export default class App extends Vue {

  appMD: AppModule
  authMD: AuthModule
  cartMD: CartModule
  userDataMD: UserDataModule
  userOrderMD: UserOrderModule
  countryMD: CountryModule
  categoryMD: CategoryModule

  get lodash(): LoDashStatic {
    return _
  }

  get version(): string {
    return packageMeta.version
  }

  get isLoading(): boolean {
    return this.appMD.getLoading
  }

  get isAuthenticated(): boolean {
    return this.authMD.isAuthenticated
  }

  get cartTotalLength(): number {
    return this.cartMD.getCartTotalLength
  }

  get userData(): UserDetailsModel {
    if (this.isAuthenticated) {
      return this.userDataMD.getUserData
    }
    return new UserDetailsModel
  }

  get availableCountries(): CountryModel {
    return this.countryMD.getCountries
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return this.countryMD.getRegionsBasedOnAlpha
  }

  get cartData(): {} {
    return this.cartMD.getCart
  }

  created(): void {
    console.log(this)
    this.appMD = getModule(AppModule, this.$store)
    this.authMD = getModule(AuthModule, this.$store)
    this.cartMD = getModule(CartModule, this.$store)
    this.userDataMD = getModule(UserDataModule, this.$store)
    this.userOrderMD = getModule(UserOrderModule, this.$store)
    this.countryMD = getModule(CountryModule, this.$store)
    this.categoryMD = getModule(CategoryModule, this.$store)


    this.initializeAuth()
    this.initializeCart()
    this.categoryMD.categoriesTreeFromRemote()


    if (this.isAuthenticated) {
      this.userDataMD.userDataFromRemote()
      this.userOrderMD.userOrdersFromRemote()
      this.countryMD.getCountriesFromRemote()
    }
  }

  mounted(): void {
    window.addEventListener('resize', () => {
      this.appMD.setWindowWidth(window.innerWidth)
    })
  }

  public initializeAuth(): void {
    console.log(this.authMD.initialize())
    this.authMD.initialize()
  }

  public initializeCart(): void {
    this.cartMD.initializeCart()
  }


}
</script>

<style lang="scss">
@import "@/assets/styles/base/_commons"

</style>
