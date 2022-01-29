<template>
  <nav class="main-navbar">
    <div class="grid-header container">
      <div class="logo-header">
        <RouterLink aria-label="Home" class="navbar-brand" title="Home" to="/">
          <img
              alt="Website Logo"
              class="main-logo img-fluid"
              src="http://localhost:8000/static/files/images/websiteLogo.png"
              height="85"
              width="175"
              loading="lazy"
          />
        </RouterLink>
      </div>

      <div :class="{'wrapper': Object.keys(categoriesTreeData).length === 0 }" class="navbar-categories-loading">
        <div :class="{'content wrapper-cell': Object.keys(categoriesTreeData).length === 0 }" class="products-header"
             @click="menuToggle"
        >
          <div ref="navbarProductsButton" class="products-a btn">
            <button id="burgerButton" ref="mainToggleButton" aria-label="Main Menu" class="menu" title="Toggle Menu">
              <svg height="65" viewBox="0 0 100 100" width="65">
                <path class="line line-one"
                      d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path class="line line-two" d="M 20,50 H 80"/>
                <path class="line line-three"
                      d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
              </svg>
            </button>
            <span class="title">PRODUCTS</span>
          </div>
        </div>
      </div>

      <div class="blog-header">
        <RouterLink aria-label="Blog" class="btn-w-effect" title="Blog" to="/blog">
          <font-awesome-icon v-if="isMobile" :icon="blogIcon"/>
          <font-awesome-icon v-else :icon="blogIcon" size="2x"/>
          <span>BLOG</span>
          <span class="line-1"></span>
          <span class="line-2"></span>
          <span class="line-3"></span>
          <span class="line-4"></span>
        </RouterLink>
      </div>
      <div class="search-header">
        <div class="search-buttons-container">
          <input v-model="searchQuery" aria-label="Search" class="form-control search-form-control me-2" name="query"
                 placeholder="Search" type="search" @keyup.enter="searchPerform"
          />
          <button aria-label="search" class="btn-outline-primary-main" title="Search" type="submit"
                  @click="searchPerform">
            <font-awesome-icon :icon="searchIcon" :style="{ color: '#3b3b3b' }" size="lg"/>
          </button>
        </div>
      </div>
      <div class="navigation-header">
        <div class="navigation-header-part">
          <RouterLink v-if="isAuthenticated" :to="{ name: 'Favourites' }" aria-label="Favourites" title="Favourites">
            <font-awesome-icon v-if="isMobile" :icon="heartIcon" :style="{ color: '#981d1dc9' }"/>
            <font-awesome-icon v-else :icon="heartIcon" :style="{ color: '#981d1dc9' }" size="2x"/>
          </RouterLink>
          <RouterLink v-else aria-label="Log In" title="Log In" to="/log-in">
            <font-awesome-icon v-if="isMobile" :icon="heartIcon"/>
            <font-awesome-icon v-else :icon="heartIcon" size="2x"/>
          </RouterLink>
        </div>
        <div class="navigation-header-part">
          <RouterLink v-if="isAuthenticated" aria-label="My Account" title="My Account" to="/my-account">
            <font-awesome-icon v-if="isMobile" :icon="userIcon" :style="{ color: '#981d1dc9' }"/>
            <font-awesome-icon v-else :icon="userIcon" :style="{ color: '#981d1dc9' }" size="2x"/>
          </RouterLink>
          <RouterLink v-else aria-label="Log In" title="Log In" to="/log-in">
            <font-awesome-icon v-if="isMobile" :icon="userIcon"/>
            <font-awesome-icon v-else :icon="userIcon" size="2x"/>
          </RouterLink>
        </div>
        <div class="navigation-header-part">
          <RouterLink aria-label="Cart" title="Cart" to="/cart">
            <font-awesome-icon v-if="isMobile" :icon="shoppingCartIcon"/>
            <font-awesome-icon v-else :icon="shoppingCartIcon" size="2x"/>
            <span class="cart-total-length">{{ cartTotalLength }}</span>
          </RouterLink>
        </div>
        <div class="navigation-header-part toggle-dark-mode-part">
          <a :aria-label="'Toggle Dark Mode'"
             :title="'Toggle Dark Mode'"
             class="toggle-dark-mode-button"
             href="javascript:void(0);"
             @click="toggleThemeMode()"
          >
            <font-awesome-icon :icon="themeIconClass" size="lg"/>
          </a>
        </div>
      </div>
    </div>
    <!--    <transition name="fade">-->
    <NavbarCategories v-if="categoriesTreeData && Object.keys(categoriesTreeData).length > 0 && !navbarMenuHidden"
                      :categories-tree="categoriesTreeData"
                      :main-toggle-button="$refs.mainToggleButton"
                      :navbar-products-button="$refs.navbarProductsButton"
    />
    <!--    </transition>-->
  </nav>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import CategoryModel from '@/state/category/CategoryModel'
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun'
import { faBlog } from '@fortawesome/free-solid-svg-icons/faBlog'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import NavbarCategories from '@/components/Navbar/NavbarCategories.vue'
import AppSettingsThemeModeOption from '@/state/app/AppSettingsThemeModeOption'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'

@Options({
  name: 'Navbar',
  components: {
    NavbarCategories
  },
  props: {
    cartTotalLength: Number,
    preHeadHidden: Boolean
  }
})
export default class Navbar extends Vue {
  searchQuery: string = ''
  preHeadHidden: boolean = true

  sunIcon: IconDefinition = faSun
  blogIcon: IconDefinition = faBlog
  moonIcon: IconDefinition = faMoon
  userIcon: IconDefinition = faUser
  heartIcon: IconDefinition = faHeart
  searchIcon: IconDefinition = faSearch
  shoppingCartIcon: IconDefinition = faShoppingCart

  $refs!: {
    mainToggleButton: HTMLElement;
    navbarProductsButton: HTMLElement;
  }

  get navbarMenuHidden(): boolean {
    return store.getters['app/getNavbarMenuHidden']
  }

  get isMobile(): boolean {
    return store.getters['app/isMobile']
  }

  get categoriesTreeData(): Array<CategoryModel> {
    return store.getters['category/getCategoriesTree']
  }

  get currentPageNumber(): number {
    return store.getters['pagination/getCurrentPageNumber']
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get getThemeMode(): AppSettingsThemeModeOption {
    return store.getters['settings/getSettings'].themeMode
  }

  get themeIconClass(): typeof faMoon | typeof faSun {
    switch (this.getThemeMode) {
      case AppSettingsThemeModeOption.Dark:
        return this.moonIcon
      case AppSettingsThemeModeOption.Light:
      default:
        return this.sunIcon
    }
  }

  async created(): Promise<void> {
    this.$watch(
        () => this.getThemeMode,
        (newThemeMode: AppSettingsThemeModeOption, oldThemeMode: AppSettingsThemeModeOption) => {
          this.switchThemeModeFromTo(oldThemeMode, newThemeMode)
        }
    )
  }

  mounted(): void {
    this.updateThemeMode()
  }

  public menuToggle(): void {
    this.$refs.mainToggleButton.classList.toggle('opened')
    this.$refs.mainToggleButton.setAttribute('aria-expanded', this.$refs.mainToggleButton.classList.contains('opened') as unknown as string)

    store.commit('app/setNavbarMenuHidden', !this.navbarMenuHidden)
  }

  async searchPerform(): Promise<void> {
    await store.commit('pagination/unsetResults')
    await store.commit('pagination/setCurrentQuery', this.searchQuery)
    await store.dispatch('pagination/getPaginatedResults', {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': `search`,
      'query': this.searchQuery,
      'method': 'POST'
    })
    await router.push({
      path: '/search',
      query: { ...this.$route.query, query: this.searchQuery, page: this.currentPageNumber }
    })
  }

  public toggleThemeMode(): void {
    store.dispatch('settings/toggleThemeMode').then(
        (themeMode) => this.updateThemeMode(themeMode)
    )
  }

  // @ts-ignore
  public updateThemeMode(themeMode: AppSettingsThemeModeOption = null): void {
    if (null === themeMode) {
      themeMode = this.getThemeMode
    }

    switch (themeMode) {
      case AppSettingsThemeModeOption.Dark:
        this.switchThemeModeFromTo(AppSettingsThemeModeOption.Light, AppSettingsThemeModeOption.Dark)
        break
      case AppSettingsThemeModeOption.Light:
      default:
        this.switchThemeModeFromTo(AppSettingsThemeModeOption.Dark, AppSettingsThemeModeOption.Light)
        break
    }
  }

  public switchThemeModeFromTo(from: AppSettingsThemeModeOption, to: AppSettingsThemeModeOption): void {
    const bodyElement = document.body
    bodyElement.classList.remove(from)
    bodyElement.classList.add(to)
    this.updateMetaTagElement('color-scheme', 'content', to)
  }

  public updateMetaTagElement(metaName: string, metaAttribute: string, newValue: string): void {
    const metaTagElement = <Element>document.querySelector(`meta[name=${ metaName }]`)
    metaTagElement.setAttribute(metaAttribute, newValue)
  }

}
</script>

<style lang="scss" scoped>
.main-navbar {
  padding: 0 !important;
  background-color: var(--cp-palette-main-secondary);
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid var(--cp-palette-main-third);
}

.btn-w-effect {
  position: relative;
  color: var(--cp-palette-main-fifth);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--cp-palette-main-fifth);
  }

  &:hover {
    border: none;

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

.grid-header {
  display: grid;
  grid-template-columns: 18% 15% 13% 34% 20%;
  grid-column-gap: 0;
  grid-row-gap: 0;
  @media screen and (min-width: 1400px) {
    max-width: 1330px;
  }

}

.logo-header {
  position: relative;
  display: grid;
  align-items: center;
}

.products-header {
  position: relative;
  color: var(--cp-palette-main-fifth);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  div {
    &.products-a {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      align-items: center;

      span.title {
        color: var(--cp-palette-main-fifth);
      }
    }
  }

  span.title {
    position: relative;
    font-weight: 500;
    @media screen and (max-width: 1420px) {
      font-size: 12px;
    }
    @media screen and (max-width: 767px) {
      font-size: 10px;
    }
    @media screen and (max-width: 576px) {
      font-size: 8px;
    }
  }

  button.menu {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    .line {
      fill: none;
      stroke: var(--cp-palette-main-fifth);
      stroke-width: 6;
      transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);

      &-one {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }

      &-two {
        stroke-dasharray: 60 60;
        stroke-width: 6;
      }

      &-three {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }
    }

    &.opened {
      .line {
        &-one {
          stroke-dasharray: 90 207;
          stroke-dashoffset: -134;
          stroke-width: 6;
        }

        &-two {
          stroke-dasharray: 1 60;
          stroke-dashoffset: -30;
          stroke-width: 6;
        }

        &-three {
          stroke-dasharray: 90 207;
          stroke-dashoffset: -134;
          stroke-width: 6;
        }
      }
    }
  }
}

.blog-header {
  position: relative;
  color: var(--cp-palette-main-fifth);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;

  svg {
    margin-right: 15px;
  }

  a {
    width: 100%;
    height: 100%;

    &:hover {
      color: var(--cp-palette-main-fifth);
    }

    span {
      font-weight: 500;
      @media screen and (max-width: 1420px) {
        font-size: 12px;
      }
      @media screen and (max-width: 767px) {
        font-size: 10px;
      }
    }
  }
}

.search-header {
  position: relative;
  color: var(--cp-palette-main-fifth);
  display: grid;

  .search-buttons-container {
    display: grid;
    grid-template-columns: auto 25%;
    background: var(--cp-palette-main-fourth);
    border-radius: 10px;
    justify-self: center;
    align-self: center;
    border: 1px solid var(--cp-palette-main-third);
    transition: all 0.3s ease-in-out;

    &:hover {
      border: 1px solid var(--cp-palette-main-primary);
      border-radius: 10px;
    }

    input:focus-visible {
      outline: unset !important;
    }

    .search-form-control {
      border: unset;
      border-radius: unset;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      transition: all 0.3s ease-in-out;
    }

    button {
      transition: all 0.3s ease-in-out;
    }

    .btn {
      border-radius: unset;
      padding: 0 12px;
      margin-top: 6px;
      margin-bottom: 6px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: var(--cp-palette-main-fifth);
      border-left: 2px solid var(--cp-palette-main-fifth);
    }
  }


}

.navigation-header {
  position: relative;
  text-align: center;
  color: var(--cp-palette-main-fifth);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .navigation-header-part {
    &:not(&.toggle-dark-mode-part) {
      position: relative;
    }
  }

  .toggle-dark-mode-part {
    position: absolute;
    right: -75px;
  }

  .cart-total-length {
    position: absolute;
    bottom: 30px;
    font-size: 12px;
    font-weight: 500;
    width: 20px;
    height: 20px;
    background: var(--cp-palette-main-fifth);
    border-radius: 100%;
    text-align: center;
    color: var(--cp-palette-main-secondary);
    line-height: 20px;
    @media screen and (max-width: 990px) {
      width: 14px;
      height: 14px;
      line-height: 15px;
      bottom: 16px;
    }
  }
}


@keyframes move1 {
  0% {
    height: 100%;
    bottom: 0;
  }
  54% {
    height: 0;
    bottom: 100%;
  }
  55% {
    height: 0;
    bottom: 0;
  }
  100% {
    height: 100%;
    bottom: 0;
  }
}

@keyframes move2 {
  0% {
    width: 0;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes move3 {
  0% {
    height: 100%;
    top: 0;
  }
  54% {
    height: 0;
    top: 100%;
  }
  55% {
    height: 0;
    top: 0;
  }
  100% {
    height: 100%;
    top: 0;
  }
}

@keyframes move4 {
  0% {
    width: 0;
    right: 0;
  }
  55% {
    width: 100%;
    right: 0;
  }
  100% {
    width: 0;
    right: 100%;
  }
}

.navbar-categories-loading {

}

.wrapper {
  z-index: 20;
  pointer-events: none;
  display: grid;
  flex-direction: column;
  height: 100%;
}

.wrapper-cell {
  display: flex;
}

// Animation
@keyframes placeHolderShimmer {
  0% {
    background-position: -450px 0
  }
  100% {
    background-position: 450px 0
  }
}

.animated-background {
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #c1c1c1 8%, #d6d6d6 18%, #d0d0d0 33%);
  background-size: 800px 104px;
  height: 96px;
  position: relative;
}

// Page Elements
.content {
  height: auto;
  @extend .animated-background;
}

.predeader--hidden-nav {
  transform: translate3d(0, -34%, 0);
}

</style>

