<template>
  <div class="page-category mt-5">
    <div class="row">
      <div class="container">
        <div class="col-12">
          <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
        </div>

        <div class="col-12">
          <div class="row">
            <ProductCard
                class="col-sm-3"
                v-for="product in category.products"
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
import {toast} from 'bulma-toast'

import ProductCard from '@/components/ProductCard'

export default {
  name: 'Category',
  components: {
    ProductCard
  },
  data() {
    return {
      category: {
        products: []
      }
    }
  },
  mounted() {
    this.getCategory()
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Category') {
        this.getCategory()
      }
    }
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug

      this.$store.commit('setIsLoading', true)

      axios
          .get(`/api/v1/products/${categorySlug}/`)
          .then(response => {
            this.category = response.data

            document.title = this.category.name + ' | grooveShop'
          })
          .catch(error => {
            console.log(error)

            toast({
              message: 'Something went wrong. Please try again.',
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>