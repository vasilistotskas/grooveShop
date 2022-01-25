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
import store from '@/store';
import _, { LoDashStatic } from "lodash";
import packageMeta from '@/../package.json';
import Footer from '@/components/Main/Footer.vue';
import { Options, Vue } from "vue-class-component";
import Header from '@/components/Main/Header.vue';
import Loader from '@/components/Main/Loader.vue';
import CountryModel from "@/state/country/CountryModel";
import RegionsModel from "@/state/country/RegionsModel";
import SocialSidebar from '@/components/Main/SocialSidebar.vue';
import UserDetailsModel from "@/state/user/data/UserDetailsModel";

@Options({
  name: "App",
  components: {
    Header,
    Footer,
    SocialSidebar,
    Loader
  }
})
export default class App extends Vue {

  public showMobileMenu = false;

  get lodash(): LoDashStatic {
    return _;
  }

  get version(): string {
    return packageMeta.version;
  }

  get isLoading(): boolean {
    return store.getters['app/getLoading'];
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated'];
  }

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength'];
  }

  get userData(): UserDetailsModel {
    if (this.isAuthenticated) {
      return store.getters['user/data/getUserData'];
    }
    return new UserDetailsModel;
  }

  get availableCountries(): CountryModel {
    return store.getters['country/getCountries'];
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return store.getters['country/getRegionsBasedOnAlpha'];
  }

  get cartData(): {} {
    return store.getters['cart/getCart'];
  }

  async created(): Promise<void> {
    await Promise.all([
      this.initializeAuth(),
      this.initializeCart(),
      store.dispatch('category/categoriesTreeFromRemote')
    ]);

    if (this.isAuthenticated) {
      await Promise.all([
        store.dispatch('user/data/userDataFromRemote'),
        store.dispatch('user/order/userOrdersFromRemote'),
        store.dispatch('country/getCountriesFromRemote'),
      ]);
    }
  }

  mounted(): void {
    window.addEventListener('resize', () => {
      store.commit('app/setWindowWidth', window.innerWidth)
    });
  }

  public initializeAuth(): void {
    store.dispatch('auth/initialize');
  }

  public initializeCart(): void {
    store.commit('cart/initializeCart');
  }


}
</script>

<style lang="scss">
#wrapper {
  position: relative;
}

.vld-overlay {
  pointer-events: none;
}

.btn-product-card {
  color: var(--cp-palette-main-fifth);
  background-color: var(--cp-palette-main-third);
  border-color: rgba(240, 246, 252, 0.1);
  box-shadow: 0 0 transparent, 0 0 transparent;
  transition: .2s cubic-bezier(0.3, 0, 0.5, 1);
  transition-property: color, background-color, border-color;
}

.form-check-input-main {
  &:checked {
    background-color: var(--cp-palette-main-primary) !important;
    border-color: var(--cp-palette-main-primary) !important;
  }
}

.router-link-active {
  color: var(--cp-palette-main-primary) !important;
}

.navbar-menu-grid-head {
  .router-link-active {
    background-color: var(--cp-palette-main-secondary);
  }
}

.cardSpecialEffect {
  position: relative;
  color: var(--cp-palette-main-fourth);
  padding: 5px;
  border-radius: 10px;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    background: var(--cp-palette-main-fifth);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
  }

  &:hover {
    border: none;
    transform: scale(1.02);

    .line-1 {
      animation: move1 1500ms infinite ease;
    }

    .line-2 {
      animation: move2 1500ms infinite ease;
    }

    .line-3 {
      animation: move3 1500ms infinite ease;
    }

    .line-4 {
      animation: move4 1500ms infinite ease;
    }
  }

  .line-1 {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    background-color: var(--cp-palette-main-primary);
    left: 0;
    bottom: 0;
  }

  .line-2 {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    background-color: var(--cp-palette-main-primary);
    left: 0;
    top: 0;
  }

  .line-3 {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    background-color: var(--cp-palette-main-primary);
    right: 0;
    top: 0;
  }

  .line-4 {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    background-color: var(--cp-palette-main-primary);
    right: 0;
    bottom: 0;
  }
}

.main-section {
  @media screen and (min-width: 1200px) {
    min-height: 750px;
    display: grid;
  }
}

.form-check-input:checked {
  background-color: $form-check-input;
  border-color: $form-check-input;
}

</style>
