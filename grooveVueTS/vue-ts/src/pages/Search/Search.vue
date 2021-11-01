<template>
  <div class="page-search mt-5 mb-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="title mb-5">Search</h1>
          <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
        </div>

        <div class="col-12">
          <div class="row">
            <ProductCard
                class="col-sm-3"
                v-for="product in searchResults"
                v-bind:key="product.id"
                v-bind:product="product"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Options} from "vue-class-component";
import AppBasePage from "@/pages/AppBasePage.vue";
import ProductCard from "@/components/Product/ProductCard.vue";
import ProductModel from "@/state/product/ProductModel";
import store from '@/store'

@Options({
  name: "SearchVue",
  components: {
    ProductCard
  }
})

export default class SearchVue extends AppBasePage {
  query: string | null = ''
  async mounted(): Promise<void> {
    document.title = 'Search | grooveShop'

    let uri = window.location.search.substring(1)
    let params = new URLSearchParams(uri)

    if (params.get('query')) {
      this.query = params.get('query')

      await this.performSearch()
    }
  }

  get searchResults(): ProductModel {
    return store.getters['search/getResultData']
  }

  async performSearch(): Promise<void> {
    store.dispatch('search/getSearchResults', {'query': this.query})
  }

}
</script>
