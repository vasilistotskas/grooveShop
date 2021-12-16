<template>
  <div class="preheadcust" style="">
    <p>Groove <a href="http://localhost:5000/">
      <span style="text-decoration: underline;">Here</span>!</a>
    </p>
  </div>

    <nav class="main-navbar">
        <div class="grid-header container">
          <div class="logo-header">
            <router-link to="/" class="navbar-brand" aria-label="Home">
              <img src="http://localhost:8000/static/media/uploads/logos/websiteLogo.png" width="175" height="85" alt="Website Logo" class="main-logo img-fluid">
            </router-link>
          </div>
          <div class="products-header" >
            <a class="products-a btn" href="#">
              <span class="burgermain"></span>
              <span class="title">PRODUCTS</span>
            </a>
          </div>
<!--          <NavbarCategories v-if="categoriesTreeData && Object.keys(categoriesTreeData).length > 0" :categoriesTree="categoriesTreeData"/>-->
          <div class="blog-header">
            <router-link to="/blog" class="btn-w-effect" aria-label="Blog">
              <font-awesome-icon v-if="isMobile" icon="blog"></font-awesome-icon>
              <font-awesome-icon v-else size="2x" icon="blog"></font-awesome-icon>
              <span>BLOG</span>
              <span class="line-1"></span>
              <span class="line-2"></span>
              <span class="line-3"></span>
              <span class="line-4"></span>
            </router-link>
          </div>
          <div class="search-header">
              <input v-model="searchQuery" @keyup.enter='searchPerform' class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="query">
              <button class="btn btn-outline-primary" @click="searchPerform">Search</button>
          </div>
          <div class="navigation-header">
            <div class="navigation-header-part">
              <router-link v-if="this.isAuthenticated" :to="{ name: 'Favourites' }" aria-label="Favourites">
                <font-awesome-icon v-if="isMobile" icon="heart" :style="{ color: '#F80000' }"></font-awesome-icon>
                <font-awesome-icon v-else size="2x" icon="heart" :style="{ color: '#F80000' }"></font-awesome-icon>
              </router-link>
              <router-link v-else to="/log-in" aria-label="Favourites">
                <font-awesome-icon v-if="isMobile" icon="heart" :style="{ color: 'white' }"></font-awesome-icon>
                <font-awesome-icon v-else size="2x" icon="heart" :style="{ color: 'white' }"></font-awesome-icon>
              </router-link>
            </div>
            <div class="navigation-header-part">
              <router-link v-if="this.isAuthenticated" to="/my-account" aria-label="Account">
                <font-awesome-icon v-if="isMobile" icon="user" :style="{ color: '#F80000' }"></font-awesome-icon>
                <font-awesome-icon v-else size="2x" icon="user" :style="{ color: '#F80000' }"></font-awesome-icon>
              </router-link>
              <router-link v-else to="/log-in" aria-label="Account">
                <font-awesome-icon v-if="isMobile" icon="user" :style="{ color: 'white' }"></font-awesome-icon>
                <font-awesome-icon v-else size="2x" icon="user" :style="{ color: 'white' }"></font-awesome-icon>
              </router-link>
            </div>
            <div class="navigation-header-part">
              <router-link to="/cart" aria-label="Cart">
                <font-awesome-icon v-if="isMobile" icon="shopping-cart" :style="{ color: 'white' }"></font-awesome-icon>
                <font-awesome-icon v-else size="2x" icon="shopping-cart" :style="{ color: 'white' }"></font-awesome-icon>
                <span class="cart-total-length">{{ cartTotalLength }}</span>
              </router-link>
            </div>
          </div>

        </div>

    </nav>


</template>

<script lang="ts">
import store from "@/store"
import router from '@/routes'
import { Options, Vue } from "vue-class-component"
import NavbarCategories from '@/components/Navbar/NavbarCategories.vue'
import CategoryModel from "@/state/category/CategoryModel";

@Options({
  name: "Navbar",
  components: {
    NavbarCategories
  },
  props: {
    showMobileMenu: {
      type: Boolean,
      default: false
    },
    cartTotalLength: Number
  }
})
export default class Navbar extends Vue {
  searchQuery: string = ''
  public showMobileMenu = false

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
    return store.getters['user/data/getIsAuthenticated']
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
    background-color: #080808;
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
    background-color: red;
    left: 0;
    bottom: 0;
  }
  .line-2 {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    background-color: red;
    left: 0;
    top: 0;
  }
  .line-3 {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    background-color: red;
    right: 0;
    top: 0;
  }
  .line-4 {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    background-color: red;
    right: 0;
    bottom: 0;
  }
  .preheadcust {
    background-color: #191919;
    text-align: center;
    font-size: 14px;
    color: $primary-color-4!important;
    p {
      color: $primary-color-4;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0;
    }
    a {
      color: $primary-color-4;
      font-weight: 700;
      span {
        color: $primary-color-4;
      }
    }
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
    a {
      &.products-a {
        width: 100%;
        height: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        span.title {
          color: white;
        }
      }
    }
    span.title {
      position: relative;
      left: 15px;
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
    span.burgermain {
      position: absolute;
      width: 30px;
      height: 23px;
      left: 15px;
      background-repeat: no-repeat;
      background-position: center center;
      cursor: pointer;
      border-bottom: 2px solid $primary-color-4;
      transform-origin: center;
      transition: all 0.3s ease-in-out;
      @media screen and (max-width: 1420px) {
        width: 30px;
        height: 20px;
      }
      @media screen and (max-width: 1200px) {
        width: 24px;
        height: 15px;
      }
      @media screen and (max-width: 990px) {
        width: 16px;
        height: 13px;
      }
      @media screen and (max-width: 767px) {
        width: 12px;
        height: 9px;
      }
      &:before{
        content: "";
        height: 2px;
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        background: $primary-color-4;
        transition: all 0.3s ease-in-out;
      }
      &:after{
        content: "";
        height: 2px;
        left: 0;
        right: 0;
        top: 50%;
        position: absolute;
        transition: all 0.3s ease-in-out;
        background: $primary-color-4;
      }
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
    grid-template-columns: 50% 25%;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
      color: #000;
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

</style>

