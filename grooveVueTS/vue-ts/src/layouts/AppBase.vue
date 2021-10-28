<template>
  <div id="wrapper">
    <Navbar v-if="categoriesData && Object.keys(categoriesData).length > 0"
        v-bind:showMobileMenu="showMobileMenu"
        v-bind:cartTotalLength="cartTotalLength"
        v-bind:categories="categoriesData"
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
  import Navbar from '@/components/Navbar/Navbar.vue'
  import { Options } from "vue-class-component";
  import axios from 'axios'
  import CategoryModel from "@/state/category/CategoryModel";

  @Options({
    name: "AppBase",
    components: {
      AppBaseLayout,
      Navbar
    }
  })
  export default class AppBase extends AppBaseLayout {

    public showMobileMenu = false

    get cartTotalLength(): number {
      return this.$store.getters['cart/cartTotalLength']
    }

    get categoriesData(): Array<CategoryModel> {
      return this.$store.getters['category/getCategories']
    }

    get userData(): Array<any> {
      return this.$store.getters['user/data/getUserData']
    }

    get userReviews(): Array<any> {
      return this.$store.getters['user/review/getUserReviews']
    }

    get userFavourites(): Array<any> {
      return this.$store.getters['user/favourite/getUserFavourites']
    }

    get cartData(): {} {
      return this.$store.getters['cart/getCart']
    }

    public initializeAuth(): void {
      this.$store.commit('user/data/initializeAuth')
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

    async created(): Promise<void> {
      this.initializeAuth()
      this.initializeToken()
      this.initializeCart()
      await this.$store.dispatch('category/categoriesFromRemote')

      if (this.isAuthenticated) {
        await this.$store.dispatch('user/data/userDataFromRemote')
      }

    }

  }
</script>

<style scoped>

</style>
