<template>
  <div class="page-search mt-3 mb-5">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">Search term: "{{ currentPageQuery }}"</h2>
        </div>

        <div class="col-12 mb-3 mt-3 product-listing-grid-header">
          <div class="pagination-buttons">
            <button class="btn btn-outline-primary" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
            <button class="btn btn-outline-primary"
                    v-if="Object.keys(this.searchResults).length !== 0"
                    v-for="(n,index) in this.searchResultsTotalPages"
                    :key="index" :class="{'active': this.currentPageNumber === n }"
                    @click="goToThisPage(n)">
              {{ n }}
            </button>
            <button class="btn btn-outline-primary" @click="goToNextPage()" v-if="showNextButton">Next</button>
          </div>
        </div>

        <div class="product-listing-grid">
            <ProductCard
                class="grid-item"
                v-for="product in searchResults"
                v-bind:key="product.id"
                v-bind:product="product"/>
        </div>

        <div class="col-12 mb-3 mt-3 product-listing-grid-header">
          <div class="pagination-buttons">
            <button class="btn btn-outline-primary" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
            <button class="btn btn-outline-primary"
                    v-if="Object.keys(this.searchResults).length !== 0"
                    v-for="(n,index) in this.searchResultsTotalPages"
                    :key="index" :class="{'active': this.currentPageNumber === n }"
                    @click="goToThisPage(n)">
              {{ n }}
            </button>
            <button class="btn btn-outline-primary" @click="goToNextPage()" v-if="showNextButton">Next</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">

import store from '@/store'
import router from '@/routes'
import { Options, Vue } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"
import ProductCard from "@/components/Product/ProductCard.vue"

@Options({
  name: "SearchVue",
  components: {
    ProductCard
  }
})

export default class SearchVue extends Vue {

  query: string | null = ''
  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)

  async mounted(): Promise<void> {
    document.title = 'Search'

    if (this.params.get('query')) {
      store.commit('search/setCurrentQuery', this.params.get('query'))
    }
    if (this.params.get('page')) {
      store.commit('search/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.performSearch()

  }

  async unmounted(): Promise<void>{
    store.commit('search/unsetSearchResults')
  }

  get searchResults(): ProductModel {
    return store.getters['search/getResultData']
  }

  get searchResultsCount(): number {
    return store.getters['search/getResultCountData']
  }

  get searchResultsNextPageUrl(): string {
    return store.getters['search/getResultNextPageUrl']
  }

  get searchResultsPreviousPageUrl(): string {
    return store.getters['search/getResultPreviousPageUrl']
  }

  get searchResultsTotalPages(): number {
    return store.getters['search/getResultTotalPages']
  }

  get currentPageNumber(): number {
    return store.getters['search/getCurrentPageNumber']
  }

  get currentPageQuery(): string {
    return store.getters['search/getCurrentQuery']
  }

  get showNextButton(): boolean {
    return store.getters['search/getShowNextButton']
  }

  get showPreviousButton(): boolean {
    return store.getters['search/getShowPreviousButton']
  }

  async performSearch(): Promise<void> {

    await store.dispatch('search/getSearchResults', {'page_number': this.currentPageNumber, 'query': this.currentPageQuery })
  }

  async goToNextPage(): Promise<void> {
    await store.commit('search/setCurrentPageNumber', this.currentPageNumber + 1)
    await store.dispatch('search/getSearchResults', {'page_number': this.currentPageNumber, 'query': this.currentPageQuery })
    await router.replace({name: "Search", query: {...this.$route.query, 'query': this.params.get('query'), 'page': this.currentPageNumber }})
  }

  async goToPreviousPage(): Promise<void> {
    await store.commit('search/setCurrentPageNumber', this.currentPageNumber - 1)
    await store.dispatch('search/getSearchResults', {'page_number': this.currentPageNumber, 'query': this.currentPageQuery })
    await router.replace({name: "Search", query: {...this.$route.query, 'query': this.params.get('query'), 'page': this.currentPageNumber }})
  }

  async goToThisPage(n: number) {
    await store.commit('search/setCurrentPageNumber', n)
    await store.dispatch('search/getSearchResults', {'page_number': n, 'query': this.currentPageQuery })
    await router.replace({name: "Search", query: {...this.$route.query, 'query': this.params.get('query'), 'page': n }})
  }

}
</script>
