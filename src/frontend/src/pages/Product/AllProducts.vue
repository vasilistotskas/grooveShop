<template>
  <div class="page-search mt-8 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">
            All Products
          </h2>
        </div>

        <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="'products/all'"
          :max-visible-buttons="3"
          :route="'AllProducts'"
          :total-pages="allPaginatedResultsTotalPages"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard
            v-for="product in allPaginatedResults"
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
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { PaginationCount } from '@/state/pagination/Type/PaginationTypes'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Options({
  name: 'AllProducts',
  components: {
    ProductCard,
    Pagination,
    Breadcrumbs
  }
})

export default class AllProducts extends Vue implements PaginatedInterface<ProductModel> {

  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get allPaginatedResults(): Array<ProductModel> {
    return store.getters['pagination/getResultData']
  }

  get allPaginatedResultsCount(): PaginationCount {
    return store.getters['pagination/getResultCountData']
  }

  get allPaginatedResultsNextPageUrl(): URL {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get allPaginatedResultsPreviousPageUrl(): URL {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get allPaginatedResultsTotalPages(): PaginationCount {
    return store.getters['pagination/getResultTotalPages']
  }

  get currentPageNumber(): number {
    let storedPageNumber = store.getters['pagination/getCurrentPageNumber']
    if (storedPageNumber) {
      return store.getters['pagination/getCurrentPageNumber']
    }
    return 1
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

  async fetchAllProducts(): Promise<void> {
    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
      .createPaginationQuery({
        'pageNumber': this.currentPageNumber,
        'endpointUrl': 'products/all',
        'method': ApiBaseMethods.GET
      } )

    await store.dispatch('pagination/fetchPaginatedResults', paginationQuery)
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Product/AllProducts"

</style>