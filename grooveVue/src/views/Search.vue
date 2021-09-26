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
            <ProductBox
                class="col-sm-3"
                v-for="product in products"
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
import ProductBox from '@/components/ProductBox.vue'

export default {
  name: 'Search',
  components: {
    ProductBox
  },
  data() {
    return {
      products: [],
      query: ''
    }
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
      this.$store.commit('setIsLoading', true)

      await axios
          .post('/api/v1/products/search/', {'query': this.query})
          .then(response => {
            this.products = response.data
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>