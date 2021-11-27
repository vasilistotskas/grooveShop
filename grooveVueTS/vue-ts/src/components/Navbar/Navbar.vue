<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"><strong class="p-1">grooveShop</strong></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <NavbarCategories :categoriesTree="this.categoriesTree"/>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item" v-if="this.isAuthenticated">
            <router-link to="/my-account" class="nav-link">My account</router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/log-in" class="nav-link">Log in</router-link>
          </li>
        </ul>
        <form method="get" action="/search" class="d-flex navbar-search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="query">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">
              <span class="icon"><i class="fas fa-shopping-cart"></i></span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import store from "@/store"
import { Options, Vue } from "vue-class-component"
import NavbarCategories from '@/components/Navbar/NavbarCategories.vue'

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
    cartTotalLength: Number,
    categoriesTree: Array
  }
})
export default class Navbar extends Vue {

  public showMobileMenu = false

  get isAuthenticated(): boolean {
    return store.getters['user/data/getIsAuthenticated']
  }
}
</script>

<style lang="scss">

</style>

