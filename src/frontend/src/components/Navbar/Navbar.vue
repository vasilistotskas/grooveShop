<template>
  <section>
    <nav class="main-navbar">
      <div class="grid-header container">
        <div class="logo-header">
          <h1>
            <RouterLink
              aria-label="DeepWeb.gr - Home Page"
              class="navbar-brand"
              title="DeepWeb.gr - Home Page"
              to="/"
            >
              <img
                alt="Website Logo"
                class="main-logo img-fluid"
                src="http://localhost:8010/backend/static/images/websiteLogo.png"
                height="85"
                width="175"
                loading="lazy"
              >
            </RouterLink>
          </h1>
        </div>

        <div
          :class="{'wrapper': Object.keys(categoriesTreeData).length === 0 }"
          class="navbar-categories-loading"
        >
          <div
            :class="{'content wrapper-cell': Object.keys(categoriesTreeData).length === 0 }"
            class="products-header"
            @click="menuToggle"
          >
            <div
              ref="navbarProductsButton"
              class="products-a btn"
            >
              <button
                id="burgerButton"
                ref="mainToggleButton"
                aria-label="Main Menu"
                class="menu"
                title="Toggle Menu"
              >
                <svg
                  height="65"
                  viewBox="0 0 100 100"
                  width="65"
                >
                  <path
                    class="line line-one"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path
                    class="line line-two"
                    d="M 20,50 H 80"
                  />
                  <path
                    class="line line-three"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
              <h2 class="title">
                PRODUCTS
              </h2>
            </div>
          </div>
        </div>

        <div class="blog-header">
          <RouterLink
            aria-label="Blog"
            class="btn-w-effect"
            title="Blog"
            to="/blog"
          >
            <font-awesome-icon
              v-if="isMobile"
              :icon="blogIcon"
            />
            <font-awesome-icon
              v-else
              :icon="blogIcon"
              size="2x"
            />
            <h4>BLOG</h4>
            <span class="line-1" />
            <span class="line-2" />
            <span class="line-3" />
            <span class="line-4" />
          </RouterLink>
        </div>
        <div class="search-header">
          <div class="search-buttons-container">
            <input
              v-model="searchQuery"
              aria-label="Search"
              class="form-control search-form-control me-2"
              name="query"
              placeholder="Search"
              type="search"
              @keyup.enter="searchPerform"
            >
            <button
              aria-label="search"
              class="btn-outline-primary-main"
              title="Search"
              type="submit"
              @click="searchPerform"
            >
              <font-awesome-icon
                :icon="searchIcon"
                :style="{ color: '#3b3b3b' }"
                size="lg"
              />
            </button>
          </div>
        </div>
        <ul class="navigation-header">
          <li class="navigation-header-part">
            <RouterLink
              v-if="isAuthenticated"
              :to="{ name: 'Favourites' }"
              aria-label="Favourites"
              title="Favourites"
            >
              <font-awesome-icon
                v-if="isMobile"
                :icon="heartIcon"
                :style="{ color: '#981d1dc9' }"
              />
              <font-awesome-icon
                v-else
                :icon="heartIcon"
                :style="{ color: '#981d1dc9' }"
                size="2x"
              />
            </RouterLink>
            <RouterLink
              v-else
              aria-label="Log In"
              title="Log In"
              to="/log-in"
            >
              <font-awesome-icon
                v-if="isMobile"
                :icon="heartIcon"
              />
              <font-awesome-icon
                v-else
                :icon="heartIcon"
                size="2x"
              />
            </RouterLink>
          </li>
          <li class="navigation-header-part">
            <RouterLink
              v-if="isAuthenticated"
              aria-label="My Account"
              title="My Account"
              to="/user-account"
            >
              <font-awesome-icon
                v-if="isMobile"
                :icon="userIcon"
                :style="{ color: '#981d1dc9' }"
              />
              <font-awesome-icon
                v-else
                :icon="userIcon"
                :style="{ color: '#981d1dc9' }"
                size="2x"
              />
            </RouterLink>
            <RouterLink
              v-else
              aria-label="Log In"
              title="Log In"
              to="/log-in"
            >
              <font-awesome-icon
                v-if="isMobile"
                :icon="userIcon"
              />
              <font-awesome-icon
                v-else
                :icon="userIcon"
                size="2x"
              />
            </RouterLink>
          </li>
          <li class="navigation-header-part">
            <RouterLink
              aria-label="Cart"
              title="Cart"
              to="/cart"
            >
              <font-awesome-icon
                v-if="isMobile"
                :icon="shoppingCartIcon"
              />
              <font-awesome-icon
                v-else
                :icon="shoppingCartIcon"
                size="2x"
              />
              <span class="cart-total-length">{{ cartTotalLength }}</span>
            </RouterLink>
          </li>
          <li class="navigation-header-part toggle-dark-mode-part">
            <a
              :aria-label="'Toggle Dark Mode'"
              :title="'Toggle Dark Mode'"
              class="toggle-dark-mode-button"
              href="javascript:void(0);"
              @click="toggleThemeMode()"
            >
              <font-awesome-icon
                :icon="themeIconClass"
                size="lg"
              />
            </a>
          </li>
        </ul>
      </div>
      <!--    <transition name="fade">-->
      <NavbarCategories
        v-if="categoriesTreeData && Object.keys(categoriesTreeData).length > 0 && !navbarMenuHidden"
        :categories-tree="categoriesTreeData"
        :main-toggle-button="$refs.mainToggleButton"
        :navbar-products-button="$refs.navbarProductsButton"
      />
      <!--    </transition>-->
    </nav>
  </section>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import CategoryModel from '@/state/category/CategoryModel'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun'
import { faBlog } from '@fortawesome/free-solid-svg-icons/faBlog'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import NavbarCategories from '@/components/Navbar/NavbarCategories.vue'
import AppSettingsThemeModeOption from '@/state/app/AppSettingsThemeModeOption'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

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

  sunIcon = faSun
  blogIcon = faBlog
  moonIcon = faMoon
  userIcon = faUser
  heartIcon = faHeart
  searchIcon = faSearch
  shoppingCartIcon = faShoppingCart

  $refs!: {
    mainToggleButton: HTMLElement
    navbarProductsButton: HTMLElement
  }

  themeModeFromPreference: AppSettingsThemeModeOption = AppSettingsThemeModeOption.Light

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

    this.$watch(
        () => this.themeModeFromPreference,
        () => {
          this.updateThemeModeFromPreference()
        }
    )

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.themeModeFromPreference = e.matches ? AppSettingsThemeModeOption.Dark : AppSettingsThemeModeOption.Light
    })

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.themeModeFromPreference = AppSettingsThemeModeOption.Dark
    }
  }

  mounted(): void {
    this.updateThemeModeFromPreference()
  }

  public menuToggle(): void {
    this.$refs.mainToggleButton.classList.toggle('opened')
    this.$refs.mainToggleButton.setAttribute('aria-expanded', this.$refs.mainToggleButton.classList.contains('opened') as unknown as string)

    store.commit('app/setNavbarMenuHidden', !this.navbarMenuHidden)
  }

  async searchPerform(): Promise<void> {
    await store.commit('pagination/unsetResults')
    await store.commit('pagination/setCurrentQuery', this.searchQuery)

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': `search`,
          'queryParams': this.searchQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', paginationQuery)

    await router.push({
      path: '/search',
      query: { ...this.$route.query, query: this.searchQuery, page: this.currentPageNumber }
    })
  }

  public updateThemeModeFromPreference(): void {

    store.dispatch('settings/toggleThemeModeFromPreference', this.themeModeFromPreference).then(
        (themeMode) => this.updateThemeMode(themeMode)
    )
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
@import "@/assets/styles/components/Navbar/Navbar"

</style>

