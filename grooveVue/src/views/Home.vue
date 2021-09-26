<template>
  <div class="home container-fluid">
    <section class="hero is-medium is-dark mb-6 mt-5">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Groove
        </p>
        <p class="subtitle">
          The best online store
        </p>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <div class="col-12 mb-5">
          <h2 class="is-size-2 has-text-centered">Latest products</h2>
        </div>
        <ProductBox
            class="col-sm-3"
            v-for="product in latestProducts"
            v-bind:key="product.id"
            v-bind:product="product"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import ProductBox from '@/components/ProductBox'

export default {
  name: 'Home',
  components: {
    ProductBox
  },
  beforeCreate() {
    this.$store.dispatch('getLatestProducts')
  },
  mounted() {
    document.title = 'Home | grooveShop'
  },
  computed: {
    latestProducts: {
      get() {
        return this.$store.getters['getStateLatestProducts']
      }
    }
  }
}
</script>