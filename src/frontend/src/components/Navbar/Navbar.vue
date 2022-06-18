<template>
  <section>
    <nav class="main-navbar">
      <div class="grid-header container">
        <div class="logo-header">
          <h1>
            <RouterLink aria-label="DeepWeb.gr - Home Page" class="navbar-brand" title="DeepWeb.gr - Home Page" to="/">
              <GrooveImage
                :alt="'Website Logo'"
                :file-name="'websiteLogo'"
                :path-type="ImagePathOptions.static"
                :img-class="'main-logo img-fluid'"
                :img-height="85"
                :img-width="175"
                :img-fit="ImageFitOptions.outside"
                :img-position="ImagePositionOptions.center"
                :img-format="ImageFormatOptions.png"
              />
            </RouterLink>
          </h1>
        </div>

        <div :class="{ wrapper: Object.keys(categoriesTreeData).length === 0 }" class="navbar-categories-loading">
          <div :class="{ 'content wrapper-cell': Object.keys(categoriesTreeData).length === 0 }" class="products-header" @click="menuToggle">
            <div ref="navbarProductsButton" class="products-a btn">
              <button id="burgerButton" ref="mainToggleButton" aria-label="Main Menu" class="menu" title="Toggle Menu">
                <svg height="65" viewBox="0 0 100 100" width="65">
                  <path
                    class="line line-one"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path class="line line-two" d="M 20,50 H 80" />
                  <path
                    class="line line-three"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
              <h2 class="title">PRODUCTS</h2>
            </div>
          </div>
        </div>

        <div class="blog-header">
          <RouterLink aria-label="Blog" class="btn-w-effect" title="Blog" to="/blog">
            <font-awesome-icon v-if="isMobile" :icon="blogIcon" />
            <font-awesome-icon v-else :icon="blogIcon" size="2x" />
            <h3 class="navbar-blog-title">BLOG</h3>
            <span class="line-1" />
            <span class="line-2" />
            <span class="line-3" />
            <span class="line-4" />
          </RouterLink>
        </div>
        <div class="search-header">
          <div class="search-buttons-container">
            <input v-model="searchQuery.query" aria-label="Search" class="form-control search-form-control me-2" name="query" placeholder="Search" type="search" @keyup.enter="fetchPaginationData" />
            <button aria-label="search" class="btn-outline-primary-main" title="Search" type="submit" @click="fetchPaginationData">
              <font-awesome-icon :icon="searchIcon" :style="{ color: '#3b3b3b' }" size="lg" />
            </button>
          </div>
        </div>
        <ul class="navigation-header">
          <li class="navigation-header-part">
            <RouterLink v-if="isAuthenticated" :to="{ name: 'Favourites' }" aria-label="Favourites" title="Favourites">
              <font-awesome-icon v-if="isMobile" :icon="heartIcon" :style="{ color: 'rgba(200,60,60,0.79)' }" />
              <font-awesome-icon v-else :icon="heartIcon" :style="{ color: 'rgba(200,60,60,0.79)' }" size="2x" />
            </RouterLink>
            <RouterLink v-else aria-label="Log In" title="Log In" to="/log-in">
              <font-awesome-icon v-if="isMobile" :icon="heartIcon" />
              <font-awesome-icon v-else :icon="heartIcon" size="2x" />
            </RouterLink>
          </li>
          <li class="navigation-header-part">
            <RouterLink v-if="isAuthenticated" aria-label="My Account" title="My Account" to="/user-account">
              <font-awesome-icon v-if="isMobile" :icon="userIcon" :style="{ color: 'rgba(200,60,60,0.79)' }" />
              <font-awesome-icon v-else :icon="userIcon" :style="{ color: 'rgba(200,60,60,0.79)' }" size="2x" />
            </RouterLink>
            <RouterLink v-else aria-label="Log In" title="Log In" to="/log-in">
              <font-awesome-icon v-if="isMobile" :icon="userIcon" />
              <font-awesome-icon v-else :icon="userIcon" size="2x" />
            </RouterLink>
          </li>
          <li class="navigation-header-part">
            <RouterLink aria-label="Cart" title="Cart" to="/cart">
              <font-awesome-icon v-if="isMobile" :icon="shoppingCartIcon" />
              <font-awesome-icon v-else :icon="shoppingCartIcon" size="2x" />
              <span class="cart-total-length">{{ cartTotalLength }}</span>
            </RouterLink>
          </li>
          <ThemeModeSwitcher />
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
import ProductModel from '@/state/product/ProductModel'
import { Options as Component } from 'vue-class-component'
import CategoryModel from '@/state/category/CategoryModel'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import { faBlog } from '@fortawesome/free-solid-svg-icons/faBlog'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import PaginationBase from '@/components/Pagination/PaginationBase'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import NavbarCategories from '@/components/Navbar/NavbarCategories.vue'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import ThemeModeSwitcher from '@/components/Utilities/ThemeModeSwitcher.vue'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'
import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'
import { ImagePathOptions, ImageFormatOptions, ImageFitOptions, ImagePositionOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Component({
  name: 'Navbar',
  components: {
    NavbarCategories,
    GrooveImage,
    ThemeModeSwitcher,
  },
  props: {
    cartTotalLength: Number,
    preHeadHidden: Boolean,
  },
})
export default class Navbar extends PaginationBase<ProductModel> implements PaginatedInterface<ProductModel> {
  paginationNamespace = PaginationNamespaceDataEnum.SEARCH_PRODUCTS

  searchQuery = {
    query: '',
  }

  preHeadHidden = true

  blogIcon = faBlog
  userIcon = faUser
  heartIcon = faHeart
  searchIcon = faSearch
  shoppingCartIcon = faShoppingCart

  ImagePathOptions = ImagePathOptions
  ImageFormatOptions = ImageFormatOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  $refs!: {
    mainToggleButton: HTMLElement
    navbarProductsButton: HTMLElement
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

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  public menuToggle(): void {
    this.$refs.mainToggleButton.classList.toggle('opened')
    this.$refs.mainToggleButton.setAttribute('aria-expanded', this.$refs.mainToggleButton.classList.contains('opened') as unknown as string)

    store.commit('app/setNavbarMenuHidden', !this.navbarMenuHidden)
  }

  async fetchPaginationData(): Promise<void> {
    await store.commit('pagination/unsetResults', this.paginationNamespace)
    await store.commit('pagination/setCurrentQuery', { currentQuery: this.searchQuery, namespace: this.paginationNamespace })

    const paginationQuery = PaginationModel.createPaginationQuery({
      pageNumber: this.currentPageNumber,
      endpointUrl: `search-product`,
      queryParams: this.searchQuery,
      method: ApiBaseMethods.GET,
    })

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.paginationNamespace })

    await router.push({
      path: '/search',
      query: { ...this.$route.query, query: this.searchQuery.query, page: this.currentPageNumber },
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Navbar/Navbar';
</style>
