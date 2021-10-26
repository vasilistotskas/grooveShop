<template>
  <div id="wrapper">
    <Navbar
        v-bind:showMobileMenu="showMobileMenu"
        v-bind:cartTotalLength="cartTotalLength"
        v-bind:categories="this.categoriesData"
    />
    Loading Spinner
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': this.isLoading }">
      <div v-if="this.isLoading" class="lds-dual-ring"></div>
    </div>

    <section class="mb-5">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>

<script lang="ts">
  import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
  import Navbar from '@/components/Navbar.vue'
  import { Options } from "vue-class-component";
  import axios from 'axios'

  @Options({
    name: "AppBase",
    components: {
      AppBaseLayout,
      Navbar
    }
  })
  export default class AppBase extends AppBaseLayout {

    get categoriesData(): Array<any> {
      return this.$store.getters['category/getCategories']
    }

    get userData(): string {
      return this.$store.getters['user/getUserData']
    }

    get userReviews(): string {
      return this.$store.getters['user/getUserReviews']
    }

    get userFavourites(): string {
      return this.$store.getters['user/getUserFavourites']
    }

    get cartData(): Array<unknown> {
      return this.$store.getters['cart/getCartData']
    }

    public initializeAuth(): void {
      this.$store.commit('user/initializeAuth')
    }

    public initializeCart(): void {
      this.$store.commit('cart/initializeCart')
    }

    public initializeToken(): void {
      const token = this.$store.getters['user/getToken']
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
      } else {
        axios.defaults.headers.common['Authorization'] = ""
      }
    }

    mounted(): void {
      if (this.isAuthenticated) {
        this.initializeAuth()
        this.initializeToken()
        this.$store.dispatch('user/userDataFromRemote')
      }

      this.initializeCart()
      this.$store.dispatch('category/categoriesFromRemote')
    }

  }
</script>

<style scoped>

</style>
