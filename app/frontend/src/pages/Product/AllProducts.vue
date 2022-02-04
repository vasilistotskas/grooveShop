<template>
  <div class="page-search mt-8 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div class="container">
      <div class="content-min-height">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">All Products</h2>
        </div>

        <Pagination
            v-if="Object.keys(allProductsResults).length !== 0"
            :endpoint-url="'products/all'"
            :max-visible-buttons="3"
            :route="'AllProducts'"
            :total-pages="allProductsResultsTotalPages"
            @pagechanged="onPageChange"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard
              v-for="product in allProductsResults"
              :key="product.id"
              :product="product"
              class="grid-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import ProductModel from '@/state/product/ProductModel'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'

@Options({
  name: 'AllProducts',
  components: {
    ProductCard,
    Pagination,
    Breadcrumbs
  }
})

export default class AllProducts extends Vue {

  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get allProductsResults(): ProductModel[] {
    return store.getters['pagination/getResultData']
  }

  get allProductsResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get allProductsResultsNextPageUrl(): string {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get allProductsResultsPreviousPageUrl(): string {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get allProductsResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
  }

  get currentPageNumber(): number {
    return store.getters['pagination/getCurrentPageNumber']
  }

  get currentPageQuery(): string {
    return store.getters['pagination/getCurrentQuery']
  }

  async created(): Promise<void> {
    document.title = 'All Products'

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    await store.commit('pagination/setCurrentPageNumber', 1)

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.fetchAllProducts()

  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults')
  }

  onPageChange(page: any) {
    this.currentPage = page
  }

  async fetchAllProducts(): Promise<void> {
    await store.dispatch('pagination/getPaginatedResults', {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': `products/all`,
      'query': this.currentPageQuery,
      'method': 'GET'
    })
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Product/AllProducts"

</style>