<template>
  <nav class="navbar main-navbar navbar-dark bg-dark navbar-expand-lg w-100 position-fixed">
    <div class="container-fluid">
        <router-link to="/" class="navbar-brand"><strong class="p-1">grooveShop</strong></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu"
           @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
        <div class="navbar-start">
            <NavbarCategories :categories="categories"/>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <form method="get" action="/search" class="mr-1">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="What are you looking for?" name="query">
                </div>
                <div class="control">
                  <button class="button is-success">
                        <span class="icon">
                        <i class="fas fa-search"></i>
                        </span>
                  </button>
                </div>
              </div>
            </form>
            <div class="buttons">
              <template v-if="this.isAuthenticated">
                <router-link to="/my-account" class="button is-light">My account</router-link>
              </template>

              <template v-else>
                <router-link to="/log-in" class="button is-light">Log in</router-link>
              </template>

              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart ({{ cartTotalLength }})</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>

<script lang="ts">
import NavbarCategories from '@/components/NavbarCategories.vue'
import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
import { Options } from "vue-class-component";
import Product from "@/state/product/Product";

@Options({
  name: "Navbar",
  components: {
    NavbarCategories
  }
})
export default class Navbar extends AppBaseLayout {

  get cartTotalLength(): number {
    return this.$store.getters['cart/cartTotalLength']
  }

}
</script>
