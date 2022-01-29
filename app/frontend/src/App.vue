<template>
  <Loader v-show="isLoading" id="mainLoader"/>
  <div id="wrapper">

    <Header/>

    <section class="main-section">
      <RouterView/>
    </section>

    <Footer/>

    <SocialSidebar/>

  </div>
</template>


<script lang="ts">
import store from '@/store'
import _, { LoDashStatic } from 'lodash'
import packageMeta from '@/../package.json'
import Footer from '@/components/Main/Footer.vue'
import { Options, Vue } from 'vue-class-component'
import Header from '@/components/Main/Header.vue'
import Loader from '@/components/Main/Loader.vue'
import CountryModel from '@/state/country/CountryModel'
import RegionsModel from '@/state/country/RegionsModel'
import SocialSidebar from '@/components/Main/SocialSidebar.vue'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'

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

  public showMobileMenu = false

  get lodash(): LoDashStatic {
    return _
  }

  get version(): string {
    return packageMeta.version
  }

  get isLoading(): boolean {
    return store.getters['app/getLoading']
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength']
  }

  get userData(): UserDetailsModel {
    if (this.isAuthenticated) {
      return store.getters['user/data/getUserData']
    }
    return new UserDetailsModel
  }

  get availableCountries(): CountryModel {
    return store.getters['country/getCountries']
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return store.getters['country/getRegionsBasedOnAlpha']
  }

  get cartData(): {} {
    return store.getters['cart/getCart']
  }

  async created(): Promise<void> {
    await Promise.all([
      this.initializeAuth(),
      this.initializeCart(),
      store.dispatch('category/categoriesTreeFromRemote')
    ])

    if (this.isAuthenticated) {
      await Promise.all([
        store.dispatch('user/data/userDataFromRemote'),
        store.dispatch('user/order/userOrdersFromRemote'),
        store.dispatch('country/getCountriesFromRemote')
      ])
    }
  }

  mounted(): void {
    window.addEventListener('resize', () => {
      store.commit('app/setWindowWidth', window.innerWidth)
    })
  }

  public initializeAuth(): void {
    store.dispatch('auth/initialize')
  }

  public initializeCart(): void {
    store.commit('cart/initializeCart')
  }


}
</script>

<style lang="scss">
#wrapper {
  position: relative;
}

.main-section {
  @media screen and (min-width: 1200px) {
    min-height: 750px;
    display: grid;
  }
}

</style>
