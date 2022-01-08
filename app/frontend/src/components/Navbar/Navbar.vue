<template>
  <nav class="main-navbar">
    <div class="grid-header container">
      <div class="logo-header">
        <router-link to="/" class="navbar-brand" aria-label="Home">
          <img src="http://localhost:8000/static/files/images/websiteLogo.png" width="175" height="85" alt="Website Logo" class="main-logo img-fluid">
        </router-link>
      </div>

      <div class="navbar-categories-loading" v-bind:class="{'wrapper': Object.keys(categoriesTreeData).length === 0 }">
        <div @click="menuToggle" class="products-header" v-bind:class="{'content wrapper-cell': Object.keys(categoriesTreeData).length === 0 }">
          <div class="products-a btn" ref="navbarProductsButton">
            <button id="burgerButton" ref="mainToggleButton" class="menu" aria-label="Main Menu">
              <svg width="65" height="65" viewBox="0 0 100 100">
                <path class="line line-one" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path class="line line-two" d="M 20,50 H 80" />
                <path class="line line-three" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
              </svg>
            </button>
            <span class="title">PRODUCTS</span>
          </div>
        </div>
      </div>

      <div class="blog-header">
        <router-link to="/blog" class="btn-w-effect" aria-label="Blog">
          <font-awesome-icon v-if="isMobile" :icon="blogIcon"></font-awesome-icon>
          <font-awesome-icon v-else size="2x" :icon="blogIcon"></font-awesome-icon>
          <span>BLOG</span>
          <span class="line-1"></span>
          <span class="line-2"></span>
          <span class="line-3"></span>
          <span class="line-4"></span>
        </router-link>
      </div>
      <div class="search-header">
        <div class="search-buttons-container">
          <input v-model="searchQuery" @keyup.enter='searchPerform' class="form-control search-form-control me-2" type="search" placeholder="Search" aria-label="Search" name="query">
          <button class="btn-outline-primary-main" type="submit" aria-label="search" @click="searchPerform">
            <font-awesome-icon :icon="searchIcon" size="lg" :style="{ color: '#3b3b3b' }"></font-awesome-icon>
          </button>
        </div>
      </div>
      <div class="navigation-header">
        <div class="navigation-header-part">
          <router-link v-if="this.isAuthenticated" :to="{ name: 'Favourites' }" aria-label="Favourites">
            <font-awesome-icon v-if="isMobile" :icon="heartIcon" :style="{ color: '#f80000e0' }"></font-awesome-icon>
            <font-awesome-icon v-else size="2x" :icon="heartIcon" :style="{ color: '#f80000e0' }"></font-awesome-icon>
          </router-link>
          <router-link v-else to="/log-in" aria-label="Favourites">
            <font-awesome-icon v-if="isMobile" :icon="heartIcon" :style="{ color: 'white' }"></font-awesome-icon>
            <font-awesome-icon v-else size="2x" :icon="heartIcon" :style="{ color: 'white' }"></font-awesome-icon>
          </router-link>
        </div>
        <div class="navigation-header-part">
          <router-link v-if="this.isAuthenticated" to="/my-account" aria-label="Account">
            <font-awesome-icon v-if="isMobile" :icon="userIcon" :style="{ color: '#f80000e0' }"></font-awesome-icon>
            <font-awesome-icon v-else size="2x" :icon="userIcon" :style="{ color: '#f80000e0' }"></font-awesome-icon>
          </router-link>
          <router-link v-else to="/log-in" aria-label="Account">
            <font-awesome-icon v-if="isMobile" :icon="userIcon" :style="{ color: 'white' }"></font-awesome-icon>
            <font-awesome-icon v-else size="2x" :icon="userIcon" :style="{ color: 'white' }"></font-awesome-icon>
          </router-link>
        </div>
        <div class="navigation-header-part">
          <router-link to="/cart" aria-label="Cart">
            <font-awesome-icon v-if="isMobile" :icon="shoppingCartIcon" :style="{ color: 'white' }"></font-awesome-icon>
            <font-awesome-icon v-else size="2x" :icon="shoppingCartIcon" :style="{ color: 'white' }"></font-awesome-icon>
            <span class="cart-total-length">{{ cartTotalLength }}</span>
          </router-link>
        </div>
      </div>
    </div>

<!--    <transition name="fade">-->
      <NavbarCategories v-if="categoriesTreeData && Object.keys(categoriesTreeData).length > 0 && !this.navbarMenuHidden"
                        :categoriesTree="categoriesTreeData"
                        :mainToggleButton="this.$refs.mainToggleButton"
                        :navbarProductsButton="this.$refs.navbarProductsButton"
      />
<!--    </transition>-->
  </nav>
</template>

<script lang="ts">
import store from "@/store"
import router from '@/routes'
import { Options, Vue } from "vue-class-component"
import CategoryModel from "@/state/category/CategoryModel"
import NavbarCategories from '@/components/Navbar/NavbarCategories.vue'
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart"
import { faBlog } from "@fortawesome/free-solid-svg-icons/faBlog"
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart"

@Options({
  name: "Navbar",
  components: {
    NavbarCategories
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    cartTotalLength: Number
  }
})
export default class Navbar extends Vue {
  searchQuery: string = ''
  public modal = false

  $refs!: {
    mainToggleButton: HTMLElement
    navbarProductsButton: HTMLElement
  }

  get blogIcon(): typeof faBlog {
    return faBlog
  }
  get searchIcon(): typeof faSearch {
    return faSearch
  }
  get userIcon(): typeof faUser {
    return faUser
  }
  get shoppingCartIcon(): typeof faShoppingCart {
    return faShoppingCart
  }
  get heartIcon(): typeof faHeart {
    return faHeart
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

  public menuToggle(): void {
    this.$refs.mainToggleButton.classList.toggle('opened');
    this.$refs.mainToggleButton.setAttribute('aria-expanded', this.$refs.mainToggleButton.classList.contains('opened') as unknown as string)

    store.commit('app/setNavbarMenuHidden', !this.navbarMenuHidden)
  }

  async searchPerform(): Promise<void> {
    await store.commit('pagination/unsetResults')
    await store.commit('pagination/setCurrentQuery', this.searchQuery)
    await store.dispatch('pagination/getPaginatedResults', {'pageNumber': this.currentPageNumber, 'endpointUrl': `search`, 'query': this.searchQuery })
    await router.push({ path: '/search', query: { ...this.$route.query, query: this.searchQuery, page: this.currentPageNumber }})
  }
}
</script>

<style lang="scss" scoped>
  .main-navbar{
    padding: 0!important;
    background-color: $primary-color-2;
  }
  .btn-w-effect {
    position: relative;
    color: $primary-color-4;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: $primary-color-4;
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
    background-color: $primary-color-1;
    left: 0;
    bottom: 0;
  }
  .line-2 {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    background-color: $primary-color-1;
    left: 0;
    top: 0;
  }
  .line-3 {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    background-color: $primary-color-1;
    right: 0;
    top: 0;
  }
  .line-4 {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    background-color: $primary-color-1;
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
    color: $primary-color-4;
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
          color: $primary-color-4;
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
    }
    .line {
      fill: none;
      stroke: white;
      stroke-width: 6;
      transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);

    }
    .line-one {
      stroke-dasharray: 60 207;
      stroke-width: 6;
    }
    .line-two {
      stroke-dasharray: 60 60;
      stroke-width: 6;
    }
    .line-three {
      stroke-dasharray: 60 207;
      stroke-width: 6;
    }
    .opened .line-one {
      stroke-dasharray: 90 207;
      stroke-dashoffset: -134;
      stroke-width: 6;
    }
    .opened .line-two {
      stroke-dasharray: 1 60;
      stroke-dashoffset: -30;
      stroke-width: 6;
    }
    .opened .line-three {
      stroke-dasharray: 90 207;
      stroke-dashoffset: -134;
      stroke-width: 6;
    }


  }
  .blog-header {
    position: relative;
    color: $primary-color-4;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    svg{
      margin-right: 15px;
    }
    a{
      width: 100%;
      height: 100%;
      &:hover{
        color: $primary-color-4;
      }
      span{
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
    color: $primary-color-4;
    display: grid;
    .search-buttons-container {
      display: grid;
      grid-template-columns: auto 25%;
      background: $primary-color-7;
      border-radius: 10px;
      justify-self: center;
      align-self: center;
      &:hover {
        border: 1px solid $primary-color-1;
        border-radius: 10px;
      }
      input:focus-visible {
        outline: unset!important;
      }
      .search-form-control {
        border: unset;
        border-radius: unset;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .btn {
        border-radius: unset;
        padding: 0 12px;
        margin-top: 6px;
        margin-bottom: 6px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: $primary-color-4;
        border-left: 2px solid $primary-color-4;
      }
    }


  }
  .navigation-header {
    position: relative;
    text-align: center;
    color: $primary-color-4;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .navigation-header-part {
      position: relative;
    }
    .cart-total-length {
      position: absolute;
      bottom: 30px;
      font-size: 12px;
      font-weight: 500;
      width: 20px;
      height: 20px;
      background: $primary-color-4;
      border-radius: 100%;
      text-align: center;
      color: $primary-color-2;
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
  @keyframes placeHolderShimmer{
    0%{
      background-position: -450px 0
    }
    100%{
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



</style>

