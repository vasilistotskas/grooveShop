<template>
  <div class="page-search mt-5">
    <div class="row">
      <div class="container">
        <div class="col-12">
          <h1 class="title mb-5">Search</h1>
          <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
        </div>

        <div class="col-12">
          <div class="row">
            <ProductCard
                class="col-sm-3"
                v-for="product in searchProducts"
                v-bind:key="product.id"
                v-bind:product="product"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductCard from '@/components/ProductCard.vue'
import {mapGetters} from "vuex";

export default {
  name: 'Search',
  components: {
    ProductCard
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters({'searchProducts': 'getStateSearchProducts'})
  },
  mounted() {
    document.title = 'Search | grooveShop'

    let uri = window.location.search.substring(1)
    let params = new URLSearchParams(uri)

    if (params.get('query')) {
      this.query = params.get('query')

      this.performSearch()
    }
  },
  methods: {
    async performSearch() {
      this.$store.dispatch('getSearchResults', {'query': this.query})
    }
  }
}
</script>