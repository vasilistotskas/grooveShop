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

import ProductCard from '@/components/Product/ProductCard'
import {mapGetters} from "vuex";

export default {
  name: 'Category',
  components: {
    ProductCard
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
  computed: {
    ...mapGetters({'category': 'getStateCategory'})
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug

      this.$store.dispatch('fetchCategory', categorySlug)
          .then(success => {
            document.title = this.category.name + ' | grooveShop'
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>