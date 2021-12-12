<template>
  <div class="preheadcust" style="">
    <p>Groove <a href="http://localhost:5000/">
      <span style="text-decoration: underline;">Here</span>!</a>
    </p>
  </div>

    <nav class="main-navbar">
        <div class="grid-header">
          <div class="logo-header">
            <router-link to="/" class="navbar-brand">
              <img src="http://localhost:8000/static/media/uploads/logos/websiteLogo.png" alt="Website Logo" class="main-logo" loading="lazy" width="175">
            </router-link>
          </div>
          <div class="products-header" >
            <a class="products-a btn-w-effect" href="#">
              <span class="burgermain"></span>
              <span class="title">ΠΡΟΪΟΝΤΑ</span>
              <span class="line-1"></span>
              <span class="line-2"></span>
              <span class="line-3"></span>
              <span class="line-4"></span>
            </a>
          </div>
<!--          <NavbarCategories v-if="categoriesTreeData && Object.keys(categoriesTreeData).length > 0" :categoriesTree="categoriesTreeData"/>-->
          <div class="blog-header">
            <router-link to="/blog" class="btn-w-effect">
              <font-awesome-icon size="2x" icon="blog"></font-awesome-icon>
              <span>BLOG</span>
              <span class="line-1"></span>
              <span class="line-2"></span>
              <span class="line-3"></span>
              <span class="line-4"></span>
            </router-link>
          </div>
          <div class="search-header">
            <form method="get" action="/search" class="d-flex navbar-search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="query">
              <button class="btn btn-outline-danger" type="submit">Search</button>
            </form>
          </div>
          <div class="navigation-header">
            <div class="navigation-header-part">
              <router-link v-if="this.isAuthenticated" :to="{ name: 'Favourites' }">
                <font-awesome-icon size="2x" icon="heart" :style="{ color: 'red' }"></font-awesome-icon>
              </router-link>
              <router-link v-else to="/log-in">
                <font-awesome-icon size="2x" icon="heart" :style="{ color: 'white' }"></font-awesome-icon>
              </router-link>
            </div>
            <div class="navigation-header-part">
              <router-link v-if="this.isAuthenticated" to="/my-account">
                <font-awesome-icon size="2x" icon="user" :style="{ color: 'red' }"></font-awesome-icon>
              </router-link>
              <router-link v-else to="/log-in">
                <font-awesome-icon size="2x" icon="user" :style="{ color: 'white' }"></font-awesome-icon>
              </router-link>
            </div>
            <div class="navigation-header-part">
              <router-link to="/cart">
                <font-awesome-icon size="2x" icon="shopping-cart" :style="{ color: 'white' }"></font-awesome-icon>
                <span class="cart-total-length">{{ cartTotalLength }}</span>
              </router-link>
            </div>
          </div>

        </div>

    </nav>


</template>

<script lang="ts">
import store from "@/store"
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

  public showMobileMenu = false

  get categoriesTreeData(): Array<CategoryModel> {
    return store.getters['category/getCategoriesTree']
  }

  get isAuthenticated(): boolean {
    return store.getters['user/data/getIsAuthenticated']
  }
}
</script>

<style lang="scss">
  .main-navbar{
    padding: 0!important;
    background-color: #080808;
  }
  .btn-w-effect {
    position: relative;
    padding: 20px 15px;
    color: white;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-items: center;

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
    color: white!important;
    p{
      color: white;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0;
    }
    a{
      color: white;
      font-weight: 700;
    }
  }
  .grid-header{
    display: grid;
    grid-template-columns: 18% 11% 11% 40% 20%;
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
  .logo-header{
    position: relative;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .products-header{
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(112,112,112,.43);
    border-left: 1px solid rgba(112,112,112,.43);
    width: 100%;
    height: 100%;
    text-align: center;
    &:hover{
      cursor: pointer;
    }
    a{
      &.products-a{
        width: 100%;
        height: 100%;
      }
    }
    span.title{
      position: relative;
      left: 15px;
      font-weight: 700;
    }
    span.burgermain{
      position: absolute;
      width: 30px;
      height: 23px;
      left: 15px;
      background-repeat: no-repeat;
      background-position: center center;
      cursor: pointer;
      border-bottom: 2px solid #fff;
      transform-origin: center;
      transition: all 0.3s ease-in-out;
      &:before{
        content: "";
        height: 2px;
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        background: #fff;
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
        background: #fff;
      }
    }
  }
  .blog-header{
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(112,112,112,.43);
    border-left: 1px solid rgba(112,112,112,.43);
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
        color: white;
      }
      span{
        font-weight: 700;
      }
    }
  }
  .search-header {
    position: relative;
    color: white;
    padding: 25px;
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .navigation-header{
    position: relative;
    color: white;
    padding: 25px;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .navigation-header-part{
      position: relative;
    }
    .cart-total-length{
      position: absolute;
      bottom: 30px;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 100%;
      text-align: center;
      color: #000;
      line-height: 20px;
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

