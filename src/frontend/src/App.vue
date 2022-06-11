<template>
  <Loader
    v-show="isLoading"
    id="mainLoader"
  />
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
import store from '@/store'
import _, { LoDashStatic } from 'lodash'
import packageMeta from '@/../package.json'
import Footer from '@/components/Main/Footer.vue'
import { Options as Component, Vue } from 'vue-class-component'
import Header from '@/components/Main/Header.vue'
import Loader from '@/components/Main/Loader.vue'
import CountryModel from '@/state/country/CountryModel'
import RegionsModel from '@/state/country/RegionsModel'
import SocialSidebar from '@/components/Main/SocialSidebar.vue'
import UserProfileModel from '@/state/user/data/UserProfileModel'

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

  get userData(): UserProfileModel {
    if (this.isAuthenticated) {
      return store.getters['user/getUserData']
    }
    return new UserProfileModel
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
      store.dispatch('category/fetchCategoriesTreeFromRemote'),
      store.dispatch('country/fetchCountriesFromRemote')
    ])

    if (this.isAuthenticated) {
      await store.dispatch('user/fetchUserDataFromRemote')
      await store.dispatch('blog/fetchCommentsByUser')
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
    store.dispatch('cart/cartTotalPriceForPayWayAction')
  }


}
</script>

<style lang="scss">
@import "@/assets/styles/base/_commons"

</style>
