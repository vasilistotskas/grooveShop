<template>
  <div class="page-search mt-8 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div class="container">
      <div class="content-min-height">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">Search term: "{{ currentPageQuery }}"</h2>
        </div>

        <Pagination
            v-if="Object.keys(searchResults).length !== 0"
            :endpoint-url="'search'"
            :max-visible-buttons="3"
            :route="'Search'"
            :total-pages="searchResultsTotalPages"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard
              v-for="product in searchResults"
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
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Options({
  name: 'SearchVue',
  components: {
    ProductCard,
    Pagination,
    Breadcrumbs
  }
})

export default class SearchVue extends Vue {

  query: string | null = ''
  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get searchResults(): ProductModel[] {
    return store.getters['pagination/getResultData']
  }

  get searchResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get searchResultsNextPageUrl(): string {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get searchResultsPreviousPageUrl(): string {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get searchResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
  }

  get currentPageNumber(): number {
    return store.getters['pagination/getCurrentPageNumber']
  }

  get currentPageQuery(): string {
    return store.getters['pagination/getCurrentQuery']
  }

  async mounted(): Promise<void> {
    document.title = 'Search'

    if (this.params.get('query')) {
      store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    await store.commit('pagination/setCurrentPageNumber', 1)

    if (this.params.get('page')) {
      store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.performSearch()

  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults')
  }

  async performSearch(): Promise<void> {

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': `search`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/getPaginatedResults', paginationQuery)
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Search/Search"

</style>