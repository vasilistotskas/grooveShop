<template>
  <div id="wrapper">
    <Navbar
        v-bind:showMobileMenu="showMobileMenu"
        v-bind:cartTotalLength="cartTotalLength"
        v-bind:categories="categories"
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
    },
    data() {
      return {
        cart: {
          items: []
        }
      }
    },
  })
  export default class AppBase extends AppBaseLayout {

    get cartTotalLength(): number {
      let totalLength = 0

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity
      }

      return totalLength
    }

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

  }
</script>

<style scoped>

</style>
